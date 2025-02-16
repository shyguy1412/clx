import { Node } from "@/TOM/Node.ts";

export class TextNode extends Node {
  content: string = "";

  get pos() {
    let pos = 0;
    this.root.traverse({
      TextNode: (textNode) => {
        if (textNode == this) pos *= -1;
        if (pos < 0) return;
        pos += textNode.content.length;
      }
    });
    return Math.abs(pos);
  }

  constructor(content: string) {
    super();
    this.content = content;
    // setTimeout(() => console.log({ pos: this.pos }));
  }

  override renderToString(): string {
    // console.log({ content: this.content });

    return this.content;
  }

}