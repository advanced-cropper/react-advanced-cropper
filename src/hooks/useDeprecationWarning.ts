import { useRef } from 'react';
import { deprecationWarning } from '../service/utils';

export function useDeprecationWarning() {
	const fired = useRef<string[]>([]);

	return (message: string) => {
		if (fired.current.indexOf(message) === -1) {
			deprecationWarning(message);
			fired.current.push(message);
		}
	};
}
