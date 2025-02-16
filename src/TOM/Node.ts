import { TextNode } from "@/TOM/nodes/Text.ts";
import { Root } from "@/TOM/elements/Root.ts";

export abstract class Node extends EventTarget {

  private _parentNode?: Node;
  get parentNode() {
    return this._parentNode;
  }

  private _childNodes: Node[] = [];
  get childNodes() {
    return [...this._childNodes];
  }

  get root() {
    let cur: Node = this;
    while (cur._parentNode) cur = cur._parentNode;
    return <Root>cur;
  }

  appendChild(node: Node) {
    this._childNodes.push(node);
    // console.log(this.childNodes);

    node._parentNode = this;
  }

  append(nodes: Node[] | Node) {
    if (nodes instanceof Array) {
      for (const node of nodes) {
        this.appendChild(node);
      }
    } else {
      this.appendChild(nodes);
    }
  }

  remove() {
    this._parentNode?.removeChild(this);
  }

  removeChild(child: Node) {
    this._childNodes.filter((node) => child != node ? true : (child._parentNode = undefined, false));
  }

  replaceChild(newChild: Node, oldChild: Node) {
    this._childNodes.map((node) => node == oldChild ? (oldChild._parentNode = undefined, newChild) : node);
  }

  clearChildren() {
    for (const node of this._childNodes) {
      this.removeChild(node);
    }
  }

  traverse(map: TraverseMap) {
    for (const child of this._childNodes) {

      // @ts-ignore its fine if cb is undefined
      const cb: undefined | ((node: Node) => void) = (map?.[child.constructor.name] ?? map?.Node);
      if (cb) cb(child);
      child.traverse(map);
    }
  }

  renderToString(): string {
    return this.childNodes.reduce((prev, cur) => prev + cur.renderToString(), "");
  }
}

type TraverseMap = Partial<{
  Node: (node: Node) => void;
  TextNode: (node: TextNode) => void;
}>;