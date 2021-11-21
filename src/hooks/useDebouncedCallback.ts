import { useEffect, useRef } from 'react';
import { debounce } from 'debounce';

type Callback = () => void;

// The simple and light alternative for  useDebouncedCallback from 'use-debounce' library (-8 kb)
export function useDebouncedCallback(callback: Callback, time = 0) {
	const debouncedCallback = useRef<Callback>();

	useEffect(() => {
		debouncedCallback.current = debounce(callback, time);
	}, []);

	return () => {
		debouncedCallback.current();
	};
}
