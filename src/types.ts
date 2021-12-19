import { CropperState, CropperImage, CropperTransitions, AspectRatio } from 'advanced-cropper/types';
import { CropperBackgroundWrapperProps } from './components/service/CropperBackgroundWrapper';
import { CropperWrapperProps } from './components/service/CropperWrapper';
import { CropperStateHook } from './hooks/useCropperState';
import { CropperRef } from './components/Cropper';

export type StencilComponent = any;

export type CropperWrapperComponent = React.ComponentType<CropperWrapperProps>;

export type CropperBackgroundWrapperComponent = React.ComponentType<CropperBackgroundWrapperProps>;

export interface TransitionsSettings {
	timingFunction?: string;
	duration?: number;
}

export interface ResizeImageSettings {
	touch?: boolean;
	wheel?:
		| boolean
		| {
				ratio?: number;
		  };
	adjustStencil?: boolean;
}

export interface RotateImageSettings {
	touch?: boolean;
}

export interface MoveImageSettings {
	touch?: boolean;
	mouse?: boolean;
}

export interface BasicStencilProps<Cropper = CropperRef> {
	transitions?: CropperTransitions;
	cropper: Cropper;
}

export interface BasicCropperRef {
	setCoordinates: CropperStateHook['setCoordinates'];
	setState: CropperStateHook['setState'];
	flipImage: CropperStateHook['flipImage'];
	zoomImage: CropperStateHook['zoomImage'];
	rotateImage: CropperStateHook['rotateImage'];
	moveImage: CropperStateHook['moveImage'];
	moveCoordinates: CropperStateHook['moveCoordinates'];
	resizeCoordinates: CropperStateHook['resizeCoordinates'];
	getCoordinates: CropperStateHook['getCoordinates'];
	getVisibleArea: CropperStateHook['getVisibleArea'];
	getTransforms: CropperStateHook['getTransforms'];
	getTransitions: () => CropperTransitions;
}

export interface StencilRef {
	aspectRatio: () => AspectRatio;
}
