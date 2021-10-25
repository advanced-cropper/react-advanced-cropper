import { useEffect } from 'react';

export const useWindowResize = (callback: (...args: unknown[]) => void) => {
	useEffect(() => {
		window.addEventListener('resize', callback);
		window.addEventListener('orientationchange', callback);

		return () => {
			window.removeEventListener('resize', callback);
			window.removeEventListener('orientationchange', callback);
		};
	}, [callback]);
};
