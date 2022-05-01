import { omit } from 'advanced-cropper/utils';
import React, { forwardRef, ForwardRefRenderFunction, PropsWithChildren, ReactElement, RefAttributes } from 'react';
import { AbstractCropperProps, AbstractCropperSettings } from '../components/AbstractCropper';

type MainProps<Settings extends AbstractCropperSettings> = Omit<AbstractCropperProps<Settings>, 'settings'>;

export function splitAbstractCropperProps<Props extends object>(props: Props) {
	const settings = omit(props, [
		'src',
		'backgroundWrapperComponent',
		'backgroundWrapperProps',
		'wrapperComponent',
		'wrapperProps',
		'stencilComponent',
		'stencilProps',
		'className',
		'imageClassName',
		'boundaryClassName',
		'backgroundClassName',
		'checkOrientation',
		'canvas',
		'crossOrigin',
		'rotateImage',
		'scaleImage',
		'moveImage',
		'boundarySizeAlgorithm',
		'stretchAlgorithm',
		'style',
		'onReady',
		'onError',
		'unloadTime',
		'getInstance',
		'onTransitionsStart',
		'onTransitionsEnd',
		'onChange',
		'onResizeEnd',
		'onMoveEnd',
		'onMove',
		'onResize',
		'onTransformImage',
		'onTransformImageEnd',
		'onInteractionStart',
		'onInteractionEnd',
		'transitions',
		'postProcess',
		'setCoordinatesAlgorithm',
		'setVisibleAreaAlgorithm',
		'setBoundaryAlgorithm',
		'transformImageAlgorithm',
		'moveCoordinatesAlgorithm',
		'resizeCoordinatesAlgorithm',
		'createStateAlgorithm',
		'reconcileStateAlgorithm',
		'defaultTransforms',
		'priority',
	]) as Omit<Props, keyof MainProps<AbstractCropperSettings>>;

	return {
		...omit(props, Object.keys(settings)),
		settings,
	};
}

export function createCropper<T, P = {}>(
	render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null {
	return forwardRef<T, P>(render);
}
