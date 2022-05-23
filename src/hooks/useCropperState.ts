import { createDefaultSettings, DefaultSettings } from 'advanced-cropper/defaults';
import { defaultPostprocess } from 'advanced-cropper/extensions/constraints';
import { ImageRestriction, ModifierSettings } from 'advanced-cropper/types';
import { useEffect, useRef } from 'react';
import { CropperInstance, AbstractCropperParameters, AbstractCropperCallbacks } from 'advanced-cropper/instance';
import { useForceRerender } from './useForceRerender';
import { useCropperProps } from './useCropperProps';

export type CropperStateSettings = DefaultSettings & ModifierSettings;

export type CropperStateSettingsProp<Settings extends CropperStateSettings> = Partial<
	Pick<Settings, keyof CropperStateSettings>
> &
	Omit<Settings, keyof CropperStateSettings>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	props: () => AbstractCropperParameters<Settings> &
		AbstractCropperCallbacks<Instance> & {
			settings: CropperStateSettingsProp<Settings>;
		},
) {
	const rerender = useForceRerender();

	const getProps = useCropperProps(() => {
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
		} = props();

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
