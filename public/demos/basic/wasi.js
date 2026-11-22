// A small WASI preview 1 host, just big enough to run chuk-basic.wasm.
//
// No DOM and no node APIs: the same file is used by the page, by the worker
// and by test.mjs under node.
//
// What it provides:
//   - command-line arguments
//   - a read-only, in-memory file system under one preopened directory, "/"
//   - stdout and stderr captured in memory
//   - stdin fed from a list of lines; when the program reads past the end of
//     the list the run is abandoned and reported as "need-input"
//
// The transcript is returned as segments, in order: text the program printed
// and lines it read. Putting a read line back where it was consumed gives
// what a terminal would have shown.

const ERRNO = { SUCCESS: 0, BADF: 8, INVAL: 28, NOENT: 44, NOSYS: 52, NOTDIR: 54 };
const FILETYPE = { CHARACTER_DEVICE: 2, DIRECTORY: 3, REGULAR_FILE: 4 };
const PREOPEN_FD = 3;
const PREOPEN_NAME = "/";
const OFLAGS_DIRECTORY = 2;

/** Thrown out of fd_read to abandon a run that wants more input. */
class NeedInput extends Error {}
/** Thrown out of fd_write when the program has printed too much. */
class OutputLimit extends Error {}
/** Thrown out of proc_exit. */
class Exit extends Error {
  constructor(code) {
    super(`exit ${code}`);
    this.code = code;
  }
}

const encoder = new TextEncoder();

function concat(chunks) {
  let size = 0;
  for (const chunk of chunks) size += chunk.length;
  const all = new Uint8Array(size);
  let at = 0;
  for (const chunk of chunks) {
    all.set(chunk, at);
    at += chunk.length;
  }
  return all;
}

function decode(chunks) {
  return new TextDecoder("utf-8").decode(concat(chunks));
}

/**
 * Run a WASI command module once, from the start.
 *
 * @param {WebAssembly.Module} module  the compiled program
 * @param {object} options
 * @param {string[]} options.args      argv, including argv[0]
 * @param {Object<string, string|Uint8Array>} [options.files]
 *        files by path relative to "/", e.g. { "program.bas": "10 PRINT 1" }
 * @param {string[]} [options.stdin]   lines for standard input, without newlines
 * @param {number} [options.outputLimit]  stop after this many bytes of output
 * @returns {{
 *   exit: "exit" | "need-input" | "output-limit" | "trap",
 *   exitCode: number | null,
 *   segments: { type: "out" | "in", text: string }[],
 *   stderr: string,
 *   linesRead: number,
 *   trap: string | null,
 * }}
 */
export function runWasi(module, { args, files = {}, stdin = [], outputLimit = Infinity }) {
  const argv = args.map((arg) => encoder.encode(arg + "\0"));
  const fileData = new Map();
  for (const [path, content] of Object.entries(files)) {
    fileData.set(normalise(path), typeof content === "string" ? encoder.encode(content) : content);
  }

  const openFiles = new Map(); // fd -> { data, pos }
  let nextFd = PREOPEN_FD + 1;

  const segments = [];
  let outChunks = [];
  const errChunks = [];
  let written = 0;

  let linesRead = 0;
  let pending = null; // the rest of a line too long for one read
  let memory = null;

  const view = () => new DataView(memory.buffer);
  const bytes = (ptr, len) => new Uint8Array(memory.buffer, ptr, len);

  function flushOut() {
    if (outChunks.length > 0) {
      segments.push({ type: "out", text: decode(outChunks) });
      outChunks = [];
    }
  }

  /** The next piece of stdin, at most `max` bytes. */
  function readStdin(max) {
    if (pending === null) {
      if (linesRead >= stdin.length) throw new NeedInput();
      const line = stdin[linesRead++];
      flushOut();
      segments.push({ type: "in", text: line + "\n" });
      pending = encoder.encode(line + "\n");
    }
    const piece = pending.subarray(0, max);
    pending = piece.length < pending.length ? pending.subarray(piece.length) : null;
    return piece;
  }

  const wasi = {
    args_sizes_get(countPtr, sizePtr) {
      const v = view();
      v.setUint32(countPtr, argv.length, true);
      v.setUint32(sizePtr, argv.reduce((n, arg) => n + arg.length, 0), true);
      return ERRNO.SUCCESS;
    },
    args_get(argvPtr, bufPtr) {
      for (const arg of argv) {
        view().setUint32(argvPtr, bufPtr, true);
        bytes(bufPtr, arg.length).set(arg);
        argvPtr += 4;
        bufPtr += arg.length;
      }
      return ERRNO.SUCCESS;
    },
    environ_sizes_get(countPtr, sizePtr) {
      const v = view();
      v.setUint32(countPtr, 0, true);
      v.setUint32(sizePtr, 0, true);
      return ERRNO.SUCCESS;
    },
    environ_get() {
      return ERRNO.SUCCESS;
    },
    clock_time_get(_id, _precision, timePtr) {
      view().setBigUint64(timePtr, BigInt(Date.now()) * 1000000n, true);
      return ERRNO.SUCCESS;
    },
    random_get(ptr, len) {
      const target = bytes(ptr, len);
      for (let at = 0; at < len; at += 65536) {
        // getRandomValues refuses views of shared memory and more than 64 KB
        const chunk = new Uint8Array(Math.min(65536, len - at));
        globalThis.crypto.getRandomValues(chunk);
        target.set(chunk, at);
      }
      return ERRNO.SUCCESS;
    },
    fd_prestat_get(fd, ptr) {
      if (fd !== PREOPEN_FD) return ERRNO.BADF;
      const v = view();
      v.setUint8(ptr, 0); // tag: a directory
      v.setUint32(ptr + 4, PREOPEN_NAME.length, true);
      return ERRNO.SUCCESS;
    },
    fd_prestat_dir_name(fd, ptr, len) {
      if (fd !== PREOPEN_FD) return ERRNO.BADF;
      if (len < PREOPEN_NAME.length) return ERRNO.INVAL;
      bytes(ptr, PREOPEN_NAME.length).set(encoder.encode(PREOPEN_NAME));
      return ERRNO.SUCCESS;
    },
    fd_fdstat_get(fd, ptr) {
      let type;
      if (fd >= 0 && fd <= 2) type = FILETYPE.CHARACTER_DEVICE;
      else if (fd === PREOPEN_FD) type = FILETYPE.DIRECTORY;
      else if (openFiles.has(fd)) type = FILETYPE.REGULAR_FILE;
      else return ERRNO.BADF;
      const v = view();
      v.setUint8(ptr, type);
      v.setUint8(ptr + 1, 0);
      v.setUint16(ptr + 2, 0, true); // flags
      v.setUint32(ptr + 4, 0, true);
      v.setBigUint64(ptr + 8, 0xffffffffffffffffn, true); // rights
      v.setBigUint64(ptr + 16, 0xffffffffffffffffn, true); // inheriting rights
      return ERRNO.SUCCESS;
    },
    fd_filestat_get(fd, ptr) {
      let type;
      let size = 0;
      if (fd >= 0 && fd <= 2) type = FILETYPE.CHARACTER_DEVICE;
      else if (fd === PREOPEN_FD) type = FILETYPE.DIRECTORY;
      else if (openFiles.has(fd)) {
        type = FILETYPE.REGULAR_FILE;
        size = openFiles.get(fd).data.length;
      } else return ERRNO.BADF;
      bytes(ptr, 64).fill(0);
      const v = view();
      v.setUint8(ptr + 16, type);
      v.setBigUint64(ptr + 24, 1n, true); // links
      v.setBigUint64(ptr + 32, BigInt(size), true);
      return ERRNO.SUCCESS;
    },
    path_open(dirFd, _dirFlags, pathPtr, pathLen, oflags, _rights, _inheriting, _fdFlags, fdPtr) {
      if (dirFd !== PREOPEN_FD) return ERRNO.BADF;
      const path = normalise(new TextDecoder().decode(bytes(pathPtr, pathLen).slice()));
      const data = fileData.get(path);
      if (data === undefined) return ERRNO.NOENT;
      if (oflags & OFLAGS_DIRECTORY) return ERRNO.NOTDIR;
      const fd = nextFd++;
      openFiles.set(fd, { data, pos: 0 });
      view().setUint32(fdPtr, fd, true);
      return ERRNO.SUCCESS;
    },
    fd_close(fd) {
      if (openFiles.delete(fd) || (fd >= 0 && fd <= PREOPEN_FD)) return ERRNO.SUCCESS;
      return ERRNO.BADF;
    },
    fd_read(fd, iovsPtr, iovsLen, nreadPtr) {
      const file = openFiles.get(fd);
      if (fd !== 0 && file === undefined) return ERRNO.BADF;
      let total = 0;
      for (let i = 0; i < iovsLen; i++) {
        const v = view();
        const ptr = v.getUint32(iovsPtr + i * 8, true);
        const len = v.getUint32(iovsPtr + i * 8 + 4, true);
        if (len === 0) continue;
        let piece;
        if (fd === 0) {
          if (total > 0 && pending === null) break; // one line per read
          piece = readStdin(len);
        } else {
          piece = file.data.subarray(file.pos, file.pos + len);
          file.pos += piece.length;
        }
        bytes(ptr, piece.length).set(piece);
        total += piece.length;
        if (piece.length < len) break;
      }
      view().setUint32(nreadPtr, total, true);
      return ERRNO.SUCCESS;
    },
    fd_write(fd, iovsPtr, iovsLen, nwrittenPtr) {
      if (fd !== 1 && fd !== 2) return ERRNO.BADF;
      const sink = fd === 1 ? outChunks : errChunks;
      let total = 0;
      for (let i = 0; i < iovsLen; i++) {
        const v = view();
        const ptr = v.getUint32(iovsPtr + i * 8, true);
        const len = v.getUint32(iovsPtr + i * 8 + 4, true);
        if (len === 0) continue;
        sink.push(bytes(ptr, len).slice());
        total += len;
      }
      written += total;
      view().setUint32(nwrittenPtr, total, true);
      if (written > outputLimit) throw new OutputLimit();
      return ERRNO.SUCCESS;
    },
    proc_exit(code) {
      throw new Exit(code);
    },
  };

  // Anything else the module asks for gets a stub that says "not supported",
  // so a rebuilt binary with one more import still loads.
  const imports = {};
  for (const { module: from, name, kind } of WebAssembly.Module.imports(module)) {
    if (kind !== "function") continue;
    imports[from] ??= {};
    imports[from][name] =
      from === "wasi_snapshot_preview1" && wasi[name] ? wasi[name] : () => ERRNO.NOSYS;
  }

  const instance = new WebAssembly.Instance(module, imports);
  memory = instance.exports.memory;

  let exit = "exit";
  let exitCode = 0;
  let trap = null;
  try {
    instance.exports._start();
  } catch (error) {
    if (error instanceof Exit) {
      exitCode = error.code;
    } else if (error instanceof NeedInput) {
      exit = "need-input";
      exitCode = null;
    } else if (error instanceof OutputLimit) {
      exit = "output-limit";
      exitCode = null;
    } else {
      // a wasm trap (unreachable, stack overflow, out of memory)
      exit = "trap";
      exitCode = null;
      trap = String(error && error.message ? error.message : error);
    }
  }
  flushOut();

  return { exit, exitCode, segments, stderr: decode(errChunks), linesRead, trap };
}

function normalise(path) {
  return path.replace(/^(\.?\/)+/, "");
}
