export type ReducerState<S> = Partial<{
  initialized: boolean;
  current: S;
}>;

type HookState = ReducerState<any>;

type ComponentStore = {
  state: HookState[];
  currentHook: number;
};

class RuntimeStore {

  store: Map<string, ComponentStore> = new Map();
  private activeElement: string | undefined = undefined;
  constructor() {

  }

  setActiveElement(id: string) {
    if (!this.store.has(id))
      this.store.set(id, createNewComponentStore());

    this.store.get(id)!.currentHook = 0;
    this.activeElement = id;
  }

  unsetActiveElement(){
    this.activeElement = undefined;
  }


  getState<S extends HookState>(): S {
    if (!this.activeElement) throw new Error("No element is being rendered");
    const store = this.store.get(this.activeElement)!;
    if (store.currentHook >= store.state.length) store.state.push({});
    console.log({store});
    
    return <S>store.state[store.currentHook++];
  }
}

function createNewComponentStore(): ComponentStore {
  return {
    state: [],
    currentHook: 0
  };
}

export const store = new RuntimeStore();