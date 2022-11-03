import { useRef } from 'react';
import {
	ImageRestriction,
	createDefaultSettings,
	CropperInstance,
	AbstractCropperParameters,
	AbstractCropperCallbacks,
	AbstractCropperSettings,
	DefaultSettings,
} from 'advanced-cropper';
import { useForceRerender } from './useForceRerender';
import { useCropperProps } from './useCropperProps';

export type CropperStateSettings = DefaultSettings & AbstractCropperSettings;

export type CropperStateSettingsProp<Settings extends CropperStateSettings> = Partial<
	Pick<Settings, keyof CropperStateSettings>
> &
	Omit<Settings, keyof CropperStateSettings>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	props: () => AbstractCropperParameters<Settings> &
		AbstractCropperCallbacks<Instance> & {
			settings?: CropperStateSettingsProp<Settings>;
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
				// It's needed because of the nature of the settings field
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

	return cropper.current;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
