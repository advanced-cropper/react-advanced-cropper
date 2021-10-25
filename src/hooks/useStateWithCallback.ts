import { SetStateAction, useRef, useState } from "react";
import { useUpdateEffect } from "./useUpdateEffect";

type DispatchWithCallback<S> = (value: SetStateAction<S | undefined>, callback?: Function) => void;

export function useStateWithCallback<S = undefined>(initialState?: S | (() => S)): [S | undefined, DispatchWithCallback<S>]  {
	const [state, setState] = useState(initialState);

	const callbackRef = useRef<Function>();

	useUpdateEffect(() => {
		if (callbackRef.current) {
			callbackRef.current();
		}
	}, [state])

	return [
		state,
		(value: SetStateAction<S | undefined>, callback?: Function) => {
			setState(value);
			callbackRef.current = callback;
		}
	]
}
