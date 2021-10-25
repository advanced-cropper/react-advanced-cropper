import { autoZoom, ExtendedCropperSettings, withDefaults } from 'advanced-cropper/defaults';
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
	props: Settings & CropperStateCallbacks<Instance>,
) {
	const {
		adjustStencil,
		imageRestriction = 'fitArea',
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
		flipImageAlgorithm,
		rotateImageAlgorithm,
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
		...cropperSettings
	} = props;

	const cropper = useAbstractCropperState({
		...withDefaults({
			...cropperSettings,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight,
			imageRestriction,
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
		flipImageAlgorithm,
		rotateImageAlgorithm,
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
	}, [imageRestriction, minWidth, minHeight, maxWidth, maxHeight]);

	return cropper;
}
export type CropperStateHook = ReturnType<typeof useCropperState>;
