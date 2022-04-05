import { MutableRefObject, LegacyRef, RefCallback } from 'react';

export function mergeRefs<T = any>(refs: (MutableRefObject<T> | LegacyRef<T>)[]): RefCallback<T> {
	return (value) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				(ref as MutableRefObject<T | null>).current = value;
			}
		});
	};
}
