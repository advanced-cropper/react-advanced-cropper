import { SetStateAction, useRef, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

type DispatchWithCallback<S> = (value: SetStateAction<S>, callback?: Function) => void;

export function useStateWithCallback<S>(initialState?: S | (() => S)): [S, DispatchWithCallback<S>];
export function useStateWithCallback<S = undefined>(): [S | undefined, DispatchWithCallback<S  | undefined>];
export function useStateWithCallback<S = undefined>(initialState?: S | (() => S)): [S | undefined, DispatchWithCallback<S | undefined>]  {
	const [state, setState] = useState(initialState);
	const [callback, setCallback] = useState<Function>()

	useUpdateEffect(() => {
		if (callback) {
			callback();
		}
	}, [callback])

	return [
		state,
		(value: SetStateAction<S | undefined>, callback?: Function) => {
			setState(value);
			setCallback(callback);
		}
	]
}
