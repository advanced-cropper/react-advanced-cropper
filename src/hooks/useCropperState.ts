import { autoZoom, ExtendedCropperSettings, withDefaults } from 'advanced-cropper/defaults';
import { ImageRestriction } from 'advanced-cropper/types';
import {
	AbstractCropperStateCallbacks,
	AbstractCropperStateSettings,
	useAbstractCropperState,
} from './useAbstractCropperState';
import { useUpdateEffect } from './useUpdateEffect';

export interface CropperStateSettings extends AbstractCropperStateSettings, ExtendedCropperSettings {
	autoZoom?: boolean;
}

export type CropperStateCallbacks<Instance> = AbstractCropperStateCallbacks<Instance>;

export function useCropperState<Settings extends CropperStateSettings, Instance = unknown>(
	settings: Settings & CropperStateCallbacks<Instance>,
) {
	const {
		adjustStencil,
		imageRestriction = ImageRestriction.fitArea,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,
		priority,
		postProcess = autoZoom,
		transitions = true,
		setCoordinatesAlgorithm,
		setVisibleAreaAlgorithm,
		setBoundaryAlgorithm,
		transformImageAlgorithm,
		resizeCoordinatesAlgorithm,
		createStateAlgorithm,
		reconcileStateAlgorithm,
		moveCoordinatesAlgorithm,
		onTransitionsStart,
		onTransitionsEnd,
		onResizeEnd,
		onMoveEnd,
		onMove,
		onResize,
		onChange,
		onTransformImage,
		onTransformImageEnd,
		onInteractionEnd,
		onInteractionStart,
		scaleImage,
		...cropperSettings
	} = settings;

	const cropper = useAbstractCropperState({
		...withDefaults({
			...cropperSettings,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight,
			imageRestriction,
			scaleImage,
			adjustStencil,
		}),
		onInteractionEnd,
		onInteractionStart,
		transitions,
		setCoordinatesAlgorithm,
		setVisibleAreaAlgorithm,
		setBoundaryAlgorithm,
		transformImageAlgorithm,
		resizeCoordinatesAlgorithm,
		createStateAlgorithm,
		moveCoordinatesAlgorithm,
		reconcileStateAlgorithm,
		priority,
		onTransitionsStart,
		onTransitionsEnd,
		onResizeEnd,
		onMoveEnd,
		onMove,
		onResize,
		onChange,
		onTransformImage,
		onTransformImageEnd,
		postProcess,
	});

	useUpdateEffect(() => {
		cropper.reconcileState();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageRestriction, minWidth, minHeight, maxWidth, maxHeight, scaleImage]);

	return cropper;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
