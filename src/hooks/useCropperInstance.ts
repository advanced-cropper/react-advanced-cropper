import { useRef } from 'react';
import {
	ImageRestriction,
	createDefaultSettings,
	AbstractCropperInstanceParameters,
	AbstractCropperInstanceCallbacks,
	AbstractCropperInstanceSettings,
	DefaultSettings,
} from 'advanced-cropper';
import { CropperInstance } from '../instance/CropperInstance';
import { useForceRerender } from './useForceRerender';
import { usePersistentFunction } from './usePersistentFunction';

export type CropperInstanceSettings = DefaultSettings & AbstractCropperInstanceSettings;

export type CropperInstanceSettingsProp<Settings extends CropperInstanceSettings> = Partial<
	Pick<Settings, keyof CropperInstanceSettings>
> &
	Omit<Settings, keyof CropperInstanceSettings>;

export function useCropperInstance<Settings extends CropperInstanceSettings, Instance = unknown>(
	props: () => AbstractCropperInstanceParameters<Settings> &
		AbstractCropperInstanceCallbacks<Instance> & {
			settings?: CropperInstanceSettingsProp<Settings>;
		},
) {
	const rerender = useForceRerender();

	const getProps = usePersistentFunction(() => {
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
				// It's needed because of the nature of the settings field
			} as Settings,
			...extendedParameters,
		};
	});

	const cropper = useRef(new CropperInstance<Settings, Instance>(getProps, rerender));

	return cropper.current;
}
export type CropperStateHook = ReturnType<typeof useCropperInstance>;
