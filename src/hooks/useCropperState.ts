import { createDefaultSettings, DefaultSettings } from 'advanced-cropper/defaults';
import { ImageRestriction, ModifierSettings } from 'advanced-cropper/types';
import { useEffect, useRef } from 'react';
import { CropperInstance, AbstractCropperParameters, AbstractCropperCallbacks } from 'advanced-cropper/instance';
import { useForceRerender } from './useForceRerender';
import { useCropperProps } from './useCropperProps';

export type CropperStateSettings = DefaultSettings & ModifierSettings;

export type CropperStateSettingsProp<Settings extends CropperStateSettings> = Partial<
	Pick<Settings, keyof DefaultSettings>
> &
	Omit<Settings, keyof DefaultSettings>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	props: () => AbstractCropperParameters<Settings> &
		AbstractCropperCallbacks<Instance> & {
			settings: CropperStateSettingsProp<Settings>;
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

	useEffect(() => {
		if (!cropper.current.hasInteractions()) {
			cropper.current.reconcileState();
		}
	});

	return cropper.current;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
