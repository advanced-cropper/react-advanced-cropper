import { createDefaultSettings, DefaultSettings } from 'advanced-cropper/defaults';
import { defaultPostprocess } from 'advanced-cropper/extensions/constraints';
import { ImageRestriction, ModifiersSettings } from 'advanced-cropper/types';
import { useRef } from 'react';
import { CropperInstance, AbstractCropperParameters, AbstractCropperCallbacks } from 'advanced-cropper/instance';

import { useForceRerender } from './useForceRerender';

export type CropperStateSettings = DefaultSettings & ModifiersSettings;

export type CropperStateSettingsProp<Settings extends CropperStateSettings> = Partial<
	Pick<Settings, keyof CropperStateSettings>
> &
	Omit<Settings, keyof CropperStateSettings>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	settings: AbstractCropperParameters<Settings> &
		AbstractCropperCallbacks<Instance> & {
			settings: CropperStateSettingsProp<Settings>;
		},
) {
	const {
		postProcess = defaultPostprocess,
		transitions = true,
		createStateAlgorithm,
		defaultTransforms,
		getInstance,
		moveCoordinatesAlgorithm,
		onChange,
		onInteractionEnd,
		onInteractionStart,
		onMove,
		onMoveEnd,
		onResize,
		onResizeEnd,
		onTransformImage,
		onTransformImageEnd,
		onTransitionsEnd,
		onTransitionsStart,
		priority,
		reconcileStateAlgorithm,
		resizeCoordinatesAlgorithm,
		setBoundaryAlgorithm,
		setCoordinatesAlgorithm,
		setVisibleAreaAlgorithm,
		transformImageAlgorithm,
		settings: {
			areaPositionRestrictions,
			areaSizeRestrictions,
			aspectRatio,
			defaultCoordinates,
			defaultPosition,
			defaultSize,
			defaultVisibleArea,
			maxHeight,
			maxWidth,
			minHeight,
			minWidth,
			positionRestrictions,
			sizeRestrictions,
			imageRestriction = ImageRestriction.fitArea,
			transformImage = {
				adjustStencil: true,
			},
			...customSettings
		},
	} = settings;

	const rerender = useForceRerender();

	const cropper = useRef(
		new CropperInstance<Settings, Instance>({
			getProps() {
				return {
					settings: {
						...createDefaultSettings<Settings>({
							areaPositionRestrictions,
							areaSizeRestrictions,
							aspectRatio,
							defaultCoordinates,
							defaultPosition,
							defaultSize,
							defaultVisibleArea,
							imageRestriction,
							maxHeight,
							maxWidth,
							minHeight,
							minWidth,
							positionRestrictions,
							sizeRestrictions,
						}),
						transformImage,
						...customSettings,
						// TypeScript can't defer the type itself, let's help it
					} as Settings,
					createStateAlgorithm,
					defaultTransforms,
					getInstance,
					moveCoordinatesAlgorithm,
					onChange,
					onInteractionEnd,
					onInteractionStart,
					onMove,
					onMoveEnd,
					onResize,
					onResizeEnd,
					onTransformImage,
					onTransformImageEnd,
					onTransitionsEnd,
					onTransitionsStart,
					postProcess,
					priority,
					reconcileStateAlgorithm,
					resizeCoordinatesAlgorithm,
					setBoundaryAlgorithm,
					setCoordinatesAlgorithm,
					setVisibleAreaAlgorithm,
					transformImageAlgorithm,
					transitions,
				};
			},
			setData() {
				rerender();
			},
		}),
	);

	return cropper.current;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
