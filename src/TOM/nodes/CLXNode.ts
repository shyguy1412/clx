import { CLXComponent, CLXElement, VNode } from "@/jsx.d.ts";
import { Node } from "../Node.ts";
import { store } from "@/runtime/store.ts";
import { TextNode } from "@/TOM/nodes/Text.ts";

export class CLXNode<P = any> extends Node {
  private type: CLXComponent<P>;
  private props: any;
  private id: string;
  private _signal: boolean = false;

  constructor({type, props, _id}:VNode<P>) {
    super();
    this.type = type;
    this.props = props;
    this.id = _id;
  };

  update() {
    this.generate();
  }
  
  generate(){
    this.clearChildren();
    store.setActiveElement(this.id, this);
    const body = CLXNode.generate(this.type(this.props));
    if(!this._signal){
      this.append(body);
      this._signal = true;
    }
    store.unsetActiveElement();
  }

  static generate(node: CLXElement): Node | Node[] {
    if (typeof node == "object" && "type" in node) {
      const clxNode = new CLXNode(node);
      clxNode.generate();
      clxNode._signal = false;
      return clxNode;
    }

    if (node instanceof Array) {
      return node.flatMap(n => CLXNode.generate(n));
    }

    const content = node.toLocaleString();
    const textNode = new TextNode(content);

    return textNode;
  }
}