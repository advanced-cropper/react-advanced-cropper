import { useEffect, useRef } from 'react';
import { debounce } from 'debounce';

type Callback = () => void;

// The simple and light alternative for  useDebouncedCallback from 'use-debounce' library (-8 kb)
export function useDebouncedCallback(callback: Callback, time = 0) {
	const debouncedCallback = useRef<ReturnType<typeof debounce>>();
	const handler = useRef<Callback>();

	useEffect(() => {
		if (debouncedCallback.current) {
			debouncedCallback.current.clear();
		}
		debouncedCallback.current = debounce(() => handler.current?.(), time);
	}, [time]);

	useEffect(() => {
		handler.current = callback;
	}, [callback]);

	return () => {
		if (debouncedCallback.current) {
			debouncedCallback.current();
		}
	};
}
