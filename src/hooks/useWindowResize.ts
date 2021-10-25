import { useEffect, useRef } from 'react';

export const useWindowResize = (callback: (...args: unknown[]) => void) => {
	const callbackRef = useRef<Function>(callback);

	const internalCallback = () => {
		if (callbackRef.current) {
			callbackRef.current();
		}
	};

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		window.addEventListener('resize', internalCallback);
		window.addEventListener('orientationchange', internalCallback);

		return () => {
			window.removeEventListener('resize', internalCallback);
			window.removeEventListener('orientationchange', internalCallback);
		};
	}, []);
};
