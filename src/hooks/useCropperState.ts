import { createDefaultSettings, DefaultSettings } from 'advanced-cropper/defaults';
import { CoreSettings, ImageRestriction, ModifierSettings } from 'advanced-cropper';
import { useLayoutEffect, useRef } from 'react';
import { CropperInstance, AbstractCropperParameters, AbstractCropperCallbacks } from 'advanced-cropper/instance';
import { useForceRerender } from './useForceRerender';
import { useCropperProps } from './useCropperProps';

export type CropperStateSettings = DefaultSettings & CoreSettings & ModifierSettings;

export type CropperStateSettingsProp<Settings extends CropperStateSettings> = Partial<
	Pick<Settings, keyof CropperStateSettings>
> &
	Omit<Settings, keyof CropperStateSettings>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	props: () => AbstractCropperParameters<Settings> &
		AbstractCropperCallbacks<Instance> & {
			settings: CropperStateSettingsProp<Settings>;
		},
	settings: {
		autoReconcileState?: boolean;
	},
) {
	const rerender = useForceRerender();

	const getProps = useCropperProps(() => {
		const { settings, ...parameters } = props();

		const extendedSettings = {
			imageRestriction: ImageRestriction.fitArea,
			transformImage: {
				adjustStencil: true,
			},
			...settings,
		};

		const extendedParameters = {
			transitions: true,
			...parameters,
		};

		return {
			settings: {
				...extendedSettings,
				...createDefaultSettings<Settings>(extendedSettings),
				// It's needed because of nature of settings field
			} as Settings,
			...extendedParameters,
		};
	});

	const cropper = useRef(
		new CropperInstance<Settings, Instance>({
			getProps,
			setData() {
				rerender();
			},
		}),
	);

	useLayoutEffect(() => {
		if (settings.autoReconcileState && !cropper.current.hasInteractions()) {
			cropper.current.reconcileState();
		}
	});

	return cropper.current;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
