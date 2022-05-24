import { useRef } from 'react';
import { deprecationWarning } from '../service/utils';

export function useDeprecationWarning() {
	const fired = useRef<boolean>(false);

	return (message: string) => {
		if (!fired.current) {
			deprecationWarning(message);
		}
	};
}
