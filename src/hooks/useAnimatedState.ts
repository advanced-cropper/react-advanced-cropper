import { CropperTransitions } from "advanced-cropper/types";
import { Animation } from 'advanced-cropper/animation';
import { useRef, useState } from "react";

export function useAnimatedState<T>(value: T): [T, (modifier: (state: T, progress: number) => T, transition?: CropperTransitions) => void, boolean] {
	const [state, setState] = useState<T>(value);
	const [animationActive, setAnimationActive] = useState(false);
	const animation = useRef<Animation>();
	return [
		state,
		(modifier: (state: T, progress: number) => T, transition?: CropperTransitions) => {
			if (transition && transition.active) {
				if (animation.current) {
					animation.current.stop();
				}
				animation.current = new Animation({
					...transition,
					onStart() {
						setAnimationActive(true)
					},
					onProgress(progress) {
						setState(modifier(state, progress));
					},
					onStop() {
						setAnimationActive(false);
					}
				});
				animation.current.start();
			} else {
				if (!animation.current || !animation.current.active) {
					setState((initialState) => modifier(initialState, 1))
				}
			}
		},
		animationActive
	];
}
