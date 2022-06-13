import { CropperTransitions } from 'advanced-cropper/types';
import { Animation } from 'advanced-cropper/animation';
import { useRef, useState } from 'react';

export function useTransition<T>(transitions: CropperTransitions | null = null): [(callback: (progress: number) => void) => void, boolean] {
	const animation = useRef<Animation>();
	const [active, setActive] = useState(false);

	return [
		(callback: (progress: number) => void) => {
			if (transitions && transitions.active) {
				if (!animation.current?.active) {
					if (animation.current) {
						animation.current.stop();
					}
					animation.current = new Animation({
						...transitions,
						onStart() {
							setActive(false);
						},
						onProgress(progress) {
							callback(progress);
						},
						onStop() {
							setActive(false);
						},
					});
					animation.current.start();
				}
			} else {
				if (!animation.current || !animation.current.active) {
					callback(1);
				}
			}
		},
		active,
	];
}
