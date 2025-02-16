import type { CLXNode } from "@/TOM/nodes/CLXNode.ts";

export type ReducerState<S> = Partial<{
  initialized: boolean;
  current: S;
}>;

type HookState = ReducerState<any>;

type ComponentStore = {
  state: HookState[];
  node: CLXNode;
  currentHook: number;
};

class RuntimeStore {

  store: Map<string, ComponentStore> = new Map();
  private activeElement: string | undefined = undefined;
  constructor() {

  }

  setActiveElement(id: string, clxNode: CLXNode) {
    if (!this.store.has(id))
      this.store.set(id, createNewComponentStore(clxNode));

    this.store.get(id)!.currentHook = 0;
    this.activeElement = id;
  }

  unsetActiveElement() {
    this.activeElement = undefined;
  }


  getState<S extends HookState>(): { state: S, node: CLXNode; } {
    if (!this.activeElement) throw new Error("No element is being rendered");
    const store = this.store.get(this.activeElement)!;
    if (store.currentHook >= store.state.length) store.state.push({});
    return { state: <S>store.state[store.currentHook++], node: store.node };
  }
}

function createNewComponentStore(node: CLXNode): ComponentStore {
  return {
    state: [],
    node,
    currentHook: 0
  };
}

export const store = new RuntimeStore();