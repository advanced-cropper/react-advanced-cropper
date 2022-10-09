import { useLayoutEffect, useState } from 'react';

interface CropperInstance {
	hasInteractions: () => boolean;
	reconcileState: () => void;
}

export function useCropperAutoReconcile(cropper: CropperInstance, enabled = true) {
	const [active, setActive] = useState(enabled);

	useLayoutEffect(() => {
		if (active && !cropper.hasInteractions()) {
			cropper.reconcileState();
		}
	});

	return {
		pause() {
			setActive(false);
		},
		resume() {
			setActive(true);
		},
	};
}
