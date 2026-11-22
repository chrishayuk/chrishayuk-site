// A minimal WASI (preview 1) host: just enough for the ace program, which
// takes arguments, reads standard input and writes standard output and
// standard error.
// It works in a browser, a web worker and Node, and needs no other library.

const ERRNO_BADF = 8;
const ERRNO_NOENT = 44;
const FILETYPE_CHARACTER_DEVICE = 2;

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
 * @param {Uint8Array} stdin           everything the program will read
 * @param {(fd: number, bytes: Uint8Array) => void} write  called for output;
 *        fd is 1 for standard output and 2 for standard error
 * @param {string[]} argv              the arguments after the program name
 * @returns {number} the exit code
 */
export function run(module, stdin, write, argv = []) {
  let memory;
  let position = 0;
  const view = () => new DataView(memory.buffer);
  const bytes = () => new Uint8Array(memory.buffer);
  const args = ["ace", ...argv].map((arg) => new TextEncoder().encode(arg + "\0"));

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
      if (fd !== 0) return ERRNO_BADF;
      let total = 0;
      for (let i = 0; i < iovsLen; i++) {
        const ptr = view().getUint32(iovsPtr + i * 8, true);
        const len = view().getUint32(iovsPtr + i * 8 + 4, true);
        const chunk = stdin.subarray(position, position + len);
        bytes().set(chunk, ptr);
        position += chunk.length;
        total += chunk.length;
        if (chunk.length < len) break;
      }
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
      if (fd > 2) return ERRNO_BADF;
      bytes().fill(0, statPtr, statPtr + 24);
      view().setUint8(statPtr, FILETYPE_CHARACTER_DEVICE);
      return 0;
    },
    // Asked for when a file is read whole. Standard input has no size.
    fd_filestat_get(fd, statPtr) {
      if (fd > 2) return ERRNO_BADF;
      bytes().fill(0, statPtr, statPtr + 64);
      view().setUint8(statPtr + 16, FILETYPE_CHARACTER_DEVICE);
      return 0;
    },
    fd_close() {
      return 0;
    },
    // No files: there are no preopened directories and nothing can be opened.
    fd_prestat_get() {
      return ERRNO_BADF;
    },
    fd_prestat_dir_name() {
      return ERRNO_BADF;
    },
    path_open() {
      return ERRNO_NOENT;
    },
    // Rust's hash maps ask for a random seed. Nothing here depends on it.
    random_get(bufPtr, len) {
      const buf = bytes().subarray(bufPtr, bufPtr + len);
      if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(buf);
      else buf.fill(7);
      return 0;
    },
    proc_exit(code) {
      throw new Exit(code);
    },
  };

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

/** The bytes the program reads when its file is `-`: the instruction tables, a line
 * of four dashes, and the numbers for the card reader. */
export function stdinFor(program, input) {
  return new TextEncoder().encode(program + "\n----\n" + input + "\n");
}
