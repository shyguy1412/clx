import { store, type ReducerState } from "@/runtime/store.ts";

export type Reducer<S, A> = (state: S, action: A) => S;
export type Dispatch<A> = (action: A) => void;
let i = 0;
export function useReducer<S, A>(reducer: Reducer<S, A>, initial: S): [S, Dispatch<A>];
export function useReducer<S, A, I>(
  reducer: Reducer<S, A>,
  initial: I,
  initializer?: (state: I) => S): [S, Dispatch<A>] {

  const { state, node } = store.getState<ReducerState<S>>();

  const dispatch: Dispatch<A> = (action) => {
    if (!state.current) throw new Error("Dispatch was called before state was initialized");
    // console.log("trigger", action);
    const oldState = state.current;
    state.current = reducer(state.current, action);
    // console.log({oldState, current:state.current});
    node.update();
  };

  if (!state.initialized) {
    //@ts-ignore ts doesnt get that if intializer isnt set intitial must be generic type S 
    state.current = initializer ? initializer(initial) : initial;
    state.initialized = true;
  }

  return [state.current!, dispatch];
}