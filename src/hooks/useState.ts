import { useReducer } from "@/hooks/useReducer.ts";


type StateUpdater<S> = (state: S | ((prevState: S) => S)) => void;
export function useState<T>(initial: T) {
  const [state, dispatch] = useReducer(
    (_, action: T) => action,
    initial
  );

  const update: StateUpdater<T> = (state) => {
    if(typeof state == "function"){
      throw new Error("Function updates not yet implemented");
    }
    
    dispatch(state);
  };

  return [state, update];
}