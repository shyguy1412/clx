import { store, type ReducerState } from "@/src/runtime/store.ts";

export type Reducer<S, A> = (state: S, action: A) => S;
export type Dispatch<A> = (action: A) => void;

export function useReducer<S, A>(reducer: Reducer<S, A>, initial: S): [S, Dispatch<A>];
export function useReducer<S, A, I>(
  reducer: Reducer<S, A>,
  initial: I,
  initializer?: (state: I) => S): [S, Dispatch<A>] {

  const state = store.getState<ReducerState<S>>();

  const dispatch: Dispatch<A> = (action) => {
    if (!state.current) throw new Error("Dispatch was called before state was initialized");
    state.current = reducer(state.current, action);
  };

  if (!state.initialized) {
    //@ts-ignore ts doesnt get that if intializer isnt set intitial must be generic type S 
    state.current = initializer ? initializer(initial) : initial;
  }

  return [state.current!, dispatch];
}