import { ComponentType } from 'react';
import { CropperImage, CropperTransitions, AspectRatio, PartialTransforms } from 'advanced-cropper/types';
import { CropperBackgroundWrapperProps } from './components/service/CropperBackgroundWrapper';
import { CropperWrapperProps } from './components/service/CropperWrapper';
import { CropperStateHook } from './hooks/useCropperState';
import { CropperRef } from './components/Cropper';

export type StencilComponent = any;

export type CropperWrapperComponent = ComponentType<CropperWrapperProps>;

export type CropperBackgroundWrapperComponent = ComponentType<CropperBackgroundWrapperProps>;

export interface TransitionsSettings {
	timingFunction?: string;
	duration?: number;
}

export interface ScaleImageSettings {
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

export type DefaultTransforms = PartialTransforms | ((image: CropperImage) => PartialTransforms);

export type Nullable<T> = T | null | undefined;
