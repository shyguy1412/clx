import type { JSXInternal, CLXComponent, PropsWithChildren, VNode, CLXElement } from "@/jsx.d.ts";

export declare namespace clx {
  //@ts-ignore this works, idk why its complaining
  export import JSX = JSXInternal;
}

export function clx<P>(
  type: CLXComponent<P>,
  props: P | null,
  ...children: CLXElement[]
): CLXElement {
  const [normalizedProps, key] = Object.entries(props ?? {}).reduce((prev, [k, v]) => {
    if (k == "key") return (prev[1] = v, prev);
    //@ts-ignore TS sucks with key iteration
    prev[0][k] = v;
    return prev;
  }, [{}, null, null] as [PropsWithChildren<P>, unknown, unknown]);

  if (arguments.length > 2) {
    normalizedProps.children =
      arguments.length > 3 ? [...arguments].slice(2) : children;
  }

  const vnode: VNode<P> = {
    type: <CLXComponent<P>>type,
    props: normalizedProps,
    key,
    _id: crypto.randomUUID()
  };

  return vnode;
}

export function Fragment(props: { children: CLXElement; }) {
  return props.children;
}
