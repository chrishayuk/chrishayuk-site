// A minimal WASI (preview 1) host: just enough for algol60,
// which takes its program as an argument, reads standard input and writes
// standard output and standard error.
// It works in a browser, a web worker and Node, and needs no other library.

const ERRNO_BADF = 8;
const ERRNO_NOENT = 44;
const ERRNO_NOSYS = 52;
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
 * @param {WebAssembly.Module} module  the compiled algol60
 * @param {string[]} argv              its arguments, without the program name
 * @param {Uint8Array} stdin           everything the program will read
 * @param {(fd: number, bytes: Uint8Array) => void} write  called for output;
 *        fd is 1 for standard output and 2 for standard error
 * @returns {number} the exit code
 */
export function run(module, argv, stdin, write) {
  let memory;
  let position = 0;
  const view = () => new DataView(memory.buffer);
  const bytes = () => new Uint8Array(memory.buffer);
  const args = ["algol60", ...argv].map((arg) => new TextEncoder().encode(arg + "\0"));

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
    fd_close() {
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
    fd_filestat_get() {
      return ERRNO_BADF;
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

/** The arguments that run a program: as the Report defines it, or as the
 * X1 system of 1960 ran it (--x1), stopped after maxSteps if given. */
export function argsFor(program, mode = "report", maxSteps) {
  const limit = maxSteps ? ["--max-steps", String(maxSteps)] : [];
  return [...limit, ...(mode === "x1" ? ["--x1"] : []), "-e", program];
}

/** A browser's workers have a smaller stack than its page: Chrome's runs
 * Knuth's man or boy test to k = 9 in a worker and k = 10 on the page.
 * A program a worker finds too deep can be run again here, on the page,
 * with a limit on its steps so that it cannot hang the page. */
export const PAGE_STEPS = 20_000_000;

export async function runOnPage(wasmUrl, program, input, mode) {
  const module = await WebAssembly.compileStreaming(fetch(wasmUrl));
  const decoders = { 1: new TextDecoder(), 2: new TextDecoder() };
  const text = { 1: "", 2: "" };
  try {
    run(module, argsFor(program, mode, PAGE_STEPS), stdinFor(input), (fd, bytes) => {
      text[fd] += decoders[fd].decode(bytes, { stream: true });
    });
  } catch (error) {
    const deep = error instanceof RangeError;
    text[2] += deep ? "stopped: the program is nested too deeply for the browser" : String(error.message || error);
  }
  return { out: text[1], err: text[2].trim() };
}

/** The bytes a program reads with inreal, ininteger and inchar. */
export function stdinFor(input) {
  return new TextEncoder().encode(input);
}
