import { stdout, stdin } from "node:process";

stdin.setRawMode(true);
stdout.write('\x1b[?1000h');
stdin.on("data", (f) => { console.log(f.toString("utf-8")); });
stdin.on("keypress", (data) => { console.log({ data }); });