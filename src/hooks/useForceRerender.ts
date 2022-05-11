import { useState } from 'react';

export function useForceRerender() {
	const [tick, setTick] = useState({});

	return () => {
		setTick({});
	};
}
