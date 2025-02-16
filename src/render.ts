import type { CLXElement } from "@/jsx.d.ts";
import { store } from "@/runtime/store.ts";
import { Root } from "@/TOM/elements/Root.ts";
import type { Node } from "@/TOM/Node.ts";
import { TextNode } from "@/TOM/nodes/Text.ts";
import { NodeInStream } from "@/io/NodeInStream.ts";
import { NodeOutStream } from "@/io/NodeOutStream.ts";
import { CLXNode } from "@/TOM/nodes/CLXNode.ts";

export function render(element: CLXElement) {
  const root = new Root();
  const inStream = new NodeInStream();
  const outStream = new NodeOutStream();
  root.setInStream(inStream);
  root.setOutStream(outStream);

  const body = CLXNode.generate(element);
  root.append(body);

  root.dunnowhattocallthis();
}

