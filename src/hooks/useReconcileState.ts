import { AbstractCropper, AbstractCropperSettings } from 'advanced-cropper/instance';
import { useEffect } from 'react';

export function useReconcileState<Settings extends AbstractCropperSettings, Instance>(
	cropper: AbstractCropper<Settings, Instance>,
) {
	useEffect(() => {
		if (!cropper.hasInteractions()) {
			cropper.reconcileState();
		}
	});
}
