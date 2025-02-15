import type { CLXElement } from "./jsx.d.ts";
import { store } from "@/src/runtime/store.ts";

export function render(node: CLXElement) {
  console.log(generateTOM(node));
}

type TOMElement = {
  pos: number;
  content: string;
};
type TOM = TOMElement | Array<TOMElement | TOM>;
export function generateTOM(node: CLXElement, state = { pos: 0 }): TOM {
  if (typeof node == "object" && "type" in node) {
    store.setActiveElement(node._id);
    const element = generateTOM(node.type(node.props), state);
    store.unsetActiveElement();
    return element;
  }

  if (node instanceof Array) {
    return node.map(n => generateTOM(n, state));
  }

  const content = node.toLocaleString();
  const tomElement: TOMElement = {
    pos: state.pos,
    content
  };
  state.pos += content.length;
  
  return tomElement;
}