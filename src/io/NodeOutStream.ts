import { OutStream } from "@/io/OutStream.ts";
import { stdout } from "node:process";
export class NodeOutStream implements OutStream{

  constructor(){
  }

  write(content: string, pos?: number): void {
    stdout.write(content)
  }
}