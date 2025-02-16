import { InStream } from "@/io/InStream.ts";
import { stdin } from "node:process";

export class NodeInStream extends EventTarget implements InStream {
  constructor() {
    super();
    stdin.setRawMode(true);
  }
}
// import { stdout, stdin } from "node:process";

// export class  extends EventTarget{

// }

// // stdout.write('\x1b[?1000h');
// stdin.on("data", (f) => { console.log(f.toString("utf-8")); });
// stdin.on("keypress", (data) => { console.log({ data }); });