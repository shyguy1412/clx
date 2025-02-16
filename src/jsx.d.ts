type Defaultize<Props, Defaults> =
  // Distribute over unions
  Props extends any // Make any properties included in Default optional
  ? Partial<Pick<Props, Extract<keyof Props, keyof Defaults>>> & // Include the remaining properties from Props
  Pick<Props, Exclude<keyof Props, keyof Defaults>>
  : never;

export type PropsWithChildren<P> = P & { children: CLXElement };
export type CLXComponent<P> = (props: P) => CLXElement;
export type CLXElement = VNode<any> | string | boolean | number | CLXElement[];
export type VNode<P = NonNullable<unknown>> = {
  type: CLXComponent<P>;
  props: PropsWithChildren<P>;
  key: unknown;
  _id: string;
}

export namespace JSXInternal {
  export type LibraryManagedAttributes<Component, Props> = Component extends {
    defaultProps: infer Defaults;
  }
    ? Defaultize<Props, Defaults>
    : Props;

  export interface IntrinsicAttributes {
    key?: any;
  }

  export type ElementType<P = any> = CLXComponent<P>;
  export interface Element extends VNode<any> { }
  export type ElementClass = CLXComponent<any>;

  export interface ElementAttributesProperty {
    props: any;
  }

  export interface ElementChildrenAttribute {
    children: any;
  }

  export interface IntrinsicElements {
    span: any
  }

}
