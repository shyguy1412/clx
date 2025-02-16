import { Element } from "@/TOM/Element.ts";
import { CLXElement } from "@/jsx.d.ts";
import { InStream } from "@/io/InStream.ts";
import { OutStream } from "@/io/OutStream.ts";

export class Root extends Element {
  private inStream?: InStream;
  private outStream?: OutStream;

  setInStream(stream: InStream) {
    this.inStream = stream;
  }

  setOutStream(stream: OutStream) {
    this.outStream = stream;
  }
  
  dunnowhattocallthis(){
    this.outStream?.write(this.renderToString())
  }
}