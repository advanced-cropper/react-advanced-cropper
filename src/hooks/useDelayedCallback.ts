import { useState } from 'react';
import { useUpdateEffect } from './useUpdateEffect';

export function useDelayedCallback(callback: () => void) {
	const [tick, setTick] = useState<object>();

	useUpdateEffect(() => {
		callback();
	}, [tick]);

	return () => {
		setTick({});
	};
}
