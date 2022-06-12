import { SetStateAction, useRef, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

type DispatchWithCallback<S> = (value: SetStateAction<S>, callback?: Function) => void;

export function useStateWithCallback<S>(initialState?: S | (() => S)): [S, DispatchWithCallback<S>];
export function useStateWithCallback<S = undefined>(): [S | undefined, DispatchWithCallback<S  | undefined>];
export function useStateWithCallback<S = undefined>(initialState?: S | (() => S)): [S | undefined, DispatchWithCallback<S | undefined>]  {
	const [state, setState] = useState(initialState);
	const [callback, setCallback] = useState<Function | null | undefined>(null);
	const previousState = useRef(initialState);

	useUpdateEffect(() => {
		if (callback) {
			callback(state, previousState.current);
		}
	}, [callback])

	return [
		state,
		(value: SetStateAction<S | undefined>, callback?: Function) => {
			previousState.current = state;
			setState(value);
			setCallback(() => callback);
		}
	]
}
