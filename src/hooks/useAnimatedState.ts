import { CropperTransitions, Animation } from 'advanced-cropper';
import { useRef, useState } from 'react';

export function useTransition<T>(transitions: CropperTransitions | null = null): [(callback: (progress: number) => void) => void, boolean] {
	const animation = useRef(new Animation());
	const [active, setActive] = useState(false);

	return [
		(callback: (progress: number) => void) => {
			if (transitions && transitions.active) {
					animation.current.start({
						...transitions,
						onStart() {
							setActive(true);
						},
						onProgress(progress) {
							callback(progress);
						},
						onStop() {
							setActive(false);
						},
					});
 			} else if (!animation.current.active) {
				callback(1);
			}
		},
		active,
	];
}
