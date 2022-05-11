import { createDefaultSettings, DefaultSettings } from 'advanced-cropper/defaults';
import { defaultPostprocess } from 'advanced-cropper/extensions/constraints';
import { ImageRestriction, ModifiersSettings } from 'advanced-cropper/types';
import { useUpdateEffect } from './useUpdateEffect';
import {
	AbstractCropperStateCallbacks,
	AbstractCropperStateParameters,
	useAbstractCropperState,
} from './useAbstractCropperState';

export type CropperStateSettings = DefaultSettings & ModifiersSettings;

export type CropperStateSettingsProp<Settings extends CropperStateSettings> = Partial<
	Pick<Settings, keyof CropperStateSettings>
> &
	Omit<Settings, keyof CropperStateSettings>;

export type CropperStateParameters<Settings extends DefaultSettings> = AbstractCropperStateParameters<Settings>;

export type CropperStateCallbacks<Instance> = AbstractCropperStateCallbacks<Instance>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	settings: CropperStateParameters<Settings> &
		CropperStateCallbacks<Instance> & {
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

	const cropper = useAbstractCropperState<Settings, Instance>({
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
	});

	useUpdateEffect(() => {
		cropper.reconcileState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageRestriction, minWidth, minHeight, maxWidth, maxHeight]);

	return cropper;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
