import { isUndefined } from 'advanced-cropper';
import React, { forwardRef } from 'react';
import { AbstractCropperProps } from '../components/AbstractCropper';

type MainProps = Omit<AbstractCropperProps<any>, 'settings'>;

function omitEmpty<Obj extends object>(obj: Obj) {
	const properties: Partial<Obj> = {};

	(Object.keys(obj) as (keyof Obj)[]).forEach((key) => {
		if (!isUndefined(obj[key])) {
			properties[key] = obj[key];
		}
	});
	return properties;
}

export function splitAbstractCropperProps<Props extends MainProps>(props: Props) {
	const {
		src,
		autoReconcileState,
		backgroundWrapperComponent,
		backgroundWrapperProps,
		wrapperComponent,
		wrapperProps,
		stencilComponent,
		stencilConstraints,
		stencilProps,
		className,
		imageClassName,
		boundaryClassName,
		backgroundClassName,
		backgroundComponent,
		backgroundProps,
		checkOrientation,
		canvas,
		crossOrigin,
		boundarySizeAlgorithm,
		boundaryStretchAlgorithm,
		style,
		onReady,
		onError,
		unloadTime,
		getInstance,
		onTransitionsStart,
		onTransitionsEnd,
		onChange,
		onResizeEnd,
		onMoveEnd,
		onMove,
		onResize,
		onTransformImage,
		onTransformImageEnd,
		onInteractionStart,
		onInteractionEnd,
		onUpdate,
		transitions,
		postProcess,
		setCoordinatesAlgorithm,
		setVisibleAreaAlgorithm,
		setBoundaryAlgorithm,
		transformImageAlgorithm,
		moveCoordinatesAlgorithm,
		resizeCoordinatesAlgorithm,
		createStateAlgorithm,
		reconcileStateAlgorithm,
		defaultTransforms,
		priority,
		...settings
	} = props;

	return {
		...omitEmpty({
			src,
			autoReconcileState,
			backgroundWrapperComponent,
			backgroundWrapperProps,
			wrapperComponent,
			wrapperProps,
			stencilComponent,
			stencilConstraints,
			stencilProps,
			className,
			imageClassName,
			boundaryClassName,
			backgroundClassName,
			backgroundComponent,
			backgroundProps,
			checkOrientation,
			canvas,
			crossOrigin,
			boundarySizeAlgorithm,
			boundaryStretchAlgorithm: boundaryStretchAlgorithm,
			style,
			onReady,
			onError,
			unloadTime,
			getInstance,
			onTransitionsStart,
			onTransitionsEnd,
			onChange,
			onResizeEnd,
			onMoveEnd,
			onMove,
			onResize,
			onTransformImage,
			onTransformImageEnd,
			onInteractionStart,
			onInteractionEnd,
			onUpdate,
			transitions,
			postProcess,
			setCoordinatesAlgorithm,
			setVisibleAreaAlgorithm,
			setBoundaryAlgorithm,
			transformImageAlgorithm,
			moveCoordinatesAlgorithm,
			resizeCoordinatesAlgorithm,
			createStateAlgorithm,
			reconcileStateAlgorithm,
			defaultTransforms,
			priority,
		}),
		settings,
	};
}

export function createCropper<T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null {
	return forwardRef<T, P>(render);
}
