// A minimal WASI (preview 1) host: just enough for the george program and
// its language server. They take their arguments, read standard input and
// files, and write standard output and standard error. The files are held
// in memory and given by the caller, so that `george run /program.george
// --data /program.in` works with no file system at all.
// It works in a browser, a web worker and Node, and needs no other library.

const ERRNO_ACCES = 2;
const ERRNO_BADF = 8;
const ERRNO_INVAL = 28;
const ERRNO_ISDIR = 31;
const ERRNO_NOENT = 44;
const ERRNO_NOSYS = 52;
const ERRNO_NOTDIR = 54;
const FILETYPE_CHARACTER_DEVICE = 2;
const FILETYPE_DIRECTORY = 3;
const FILETYPE_REGULAR_FILE = 4;
const ALL_RIGHTS = 0xffffffffffffffffn;
const PREOPEN = 3; // the one directory, "/"

export class Exit extends Error {
  constructor(code) {
    super(`exit ${code}`);
    this.code = code;
  }
}

/**
 * Run a WASI command module to completion.
 *
 * @param {WebAssembly.Module} module  the compiled program
 * @param {string[]} argv              its arguments, without the program name
 * @param {Uint8Array} stdin           everything the program will read
 * @param {(fd: number, bytes: Uint8Array) => void} write  called for output;
 *        fd is 1 for standard output and 2 for standard error
 * @param {Record<string, string | Uint8Array>} [files]  files it may read,
 *        by absolute path, such as "/program.george"
 * @returns {number} the exit code
 */
export function run(module, argv, stdin, write, files = {}) {
  let memory;
  let position = 0;
  const view = () => new DataView(memory.buffer);
  const bytes = () => new Uint8Array(memory.buffer);
  const encoder = new TextEncoder();
  const args = ["george", ...argv].map((arg) => encoder.encode(arg + "\0"));
  const store = new Map(Object.entries(files).map(([path, body]) => [path, typeof body === "string" ? encoder.encode(body) : body]));
  /** @type {Map<number, {data: Uint8Array, at: number}>} */
  const open = new Map();
  let nextFd = PREOPEN + 1;

  const readInto = (iovsPtr, iovsLen, source, from) => {
    let total = 0;
    for (let i = 0; i < iovsLen; i++) {
      const ptr = view().getUint32(iovsPtr + i * 8, true);
      const len = view().getUint32(iovsPtr + i * 8 + 4, true);
      const chunk = source.subarray(from + total, from + total + len);
      bytes().set(chunk, ptr);
      total += chunk.length;
      if (chunk.length < len) break;
    }
    return total;
  };

  const wasi = {
    args_sizes_get(countPtr, sizePtr) {
      view().setUint32(countPtr, args.length, true);
      view().setUint32(sizePtr, args.reduce((n, a) => n + a.length, 0), true);
      return 0;
    },
    args_get(argvPtr, bufPtr) {
      for (const arg of args) {
        view().setUint32(argvPtr, bufPtr, true);
        bytes().set(arg, bufPtr);
        argvPtr += 4;
        bufPtr += arg.length;
      }
      return 0;
    },
    environ_sizes_get(countPtr, sizePtr) {
      view().setUint32(countPtr, 0, true);
      view().setUint32(sizePtr, 0, true);
      return 0;
    },
    environ_get() {
      return 0;
    },
    fd_read(fd, iovsPtr, iovsLen, nreadPtr) {
      let total;
      if (fd === 0) {
        total = readInto(iovsPtr, iovsLen, stdin, position);
        position += total;
      } else if (open.has(fd)) {
        const file = open.get(fd);
        total = readInto(iovsPtr, iovsLen, file.data, file.at);
        file.at += total;
      } else return ERRNO_BADF;
      view().setUint32(nreadPtr, total, true);
      return 0;
    },
    fd_write(fd, iovsPtr, iovsLen, nwrittenPtr) {
      if (fd !== 1 && fd !== 2) return ERRNO_BADF;
      let total = 0;
      for (let i = 0; i < iovsLen; i++) {
        const ptr = view().getUint32(iovsPtr + i * 8, true);
        const len = view().getUint32(iovsPtr + i * 8 + 4, true);
        if (len > 0) write(fd, bytes().slice(ptr, ptr + len));
        total += len;
      }
      view().setUint32(nwrittenPtr, total, true);
      return 0;
    },
    fd_fdstat_get(fd, statPtr) {
      const type = fd <= 2 ? FILETYPE_CHARACTER_DEVICE : fd === PREOPEN ? FILETYPE_DIRECTORY : open.has(fd) ? FILETYPE_REGULAR_FILE : 0;
      if (!type) return ERRNO_BADF;
      bytes().fill(0, statPtr, statPtr + 24);
      view().setUint8(statPtr, type);
      view().setBigUint64(statPtr + 8, ALL_RIGHTS, true);
      view().setBigUint64(statPtr + 16, ALL_RIGHTS, true);
      return 0;
    },
    fd_filestat_get(fd, statPtr) {
      const type = fd <= 2 ? FILETYPE_CHARACTER_DEVICE : fd === PREOPEN ? FILETYPE_DIRECTORY : open.has(fd) ? FILETYPE_REGULAR_FILE : 0;
      if (!type) return ERRNO_BADF;
      bytes().fill(0, statPtr, statPtr + 64);
      view().setUint8(statPtr + 16, type);
      view().setBigUint64(statPtr + 24, 1n, true);
      view().setBigUint64(statPtr + 32, BigInt(open.get(fd)?.data.length ?? 0), true);
      return 0;
    },
    fd_seek(fd, offset, whence, newOffsetPtr) {
      const file = open.get(fd);
      if (!file) return ERRNO_BADF;
      const base = [0, file.at, file.data.length][whence];
      const at = base + Number(offset);
      if (base === undefined || at < 0) return ERRNO_INVAL;
      file.at = at;
      view().setBigUint64(newOffsetPtr, BigInt(at), true);
      return 0;
    },
    fd_tell(fd, offsetPtr) {
      const file = open.get(fd);
      if (!file) return ERRNO_BADF;
      view().setBigUint64(offsetPtr, BigInt(file.at), true);
      return 0;
    },
    fd_close(fd) {
      open.delete(fd);
      return 0;
    },
    // One preopened directory, "/", holding the files given.
    fd_prestat_get(fd, ptr) {
      if (fd !== PREOPEN) return ERRNO_BADF;
      view().setUint8(ptr, 0);
      view().setUint32(ptr + 4, 1, true);
      return 0;
    },
    fd_prestat_dir_name(fd, ptr, len) {
      if (fd !== PREOPEN) return ERRNO_BADF;
      if (len >= 1) bytes()[ptr] = 47; // "/"
      return 0;
    },
    path_open(dirFd, dirFlags, pathPtr, pathLen, oflags, rightsBase, rightsInheriting, fdFlags, fdPtr) {
      if (dirFd !== PREOPEN) return ERRNO_NOTDIR;
      const path = "/" + new TextDecoder().decode(bytes().slice(pathPtr, pathPtr + pathLen)).replace(/^\.?\/+/, "");
      if (oflags & 0b1101) return ERRNO_ACCES; // create, exclusive or truncate: nothing may be written
      if (path === "/" || path === "/.") return ERRNO_ISDIR;
      const data = store.get(path);
      if (!data) return ERRNO_NOENT;
      const fd = nextFd++;
      open.set(fd, { data, at: 0 });
      view().setUint32(fdPtr, fd, true);
      return 0;
    },
    clock_time_get(id, precision, timePtr) {
      view().setBigUint64(timePtr, BigInt(Date.now()) * 1000000n, true);
      return 0;
    },
    random_get(ptr, len) {
      for (let i = 0; i < len; i++) bytes()[ptr + i] = Math.floor(Math.random() * 256);
      return 0;
    },
    proc_exit(code) {
      throw new Exit(code);
    },
  };

  // Which calls a build imports depends on the toolchain that made it. One
  // this host has no answer for is given a stub that says "not supported".
  for (const { module: from, name } of WebAssembly.Module.imports(module)) {
    if (from === "wasi_snapshot_preview1" && !(name in wasi)) wasi[name] = () => ERRNO_NOSYS;
  }
  const instance = new WebAssembly.Instance(module, { wasi_snapshot_preview1: wasi });
  memory = instance.exports.memory;
  try {
    instance.exports._start();
    return 0;
  } catch (error) {
    if (error instanceof Exit) return error.code;
    throw error;
  }
}
