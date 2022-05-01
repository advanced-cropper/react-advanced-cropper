import { ComponentType, CSSProperties, ReactNode } from 'react';
import {
	CropperImage,
	CropperTransitions,
	AspectRatio,
	PartialTransforms,
	ExtensionOf,
	CoreSettings,
	ModifiersSettings,
	BivarianceConstraint,
} from 'advanced-cropper/types';
import { DefaultSettings } from 'advanced-cropper/defaults';
import { CropperStateHook, CropperStateSettings } from './hooks/useCropperState';
import {
	AbstractCropperIntrinsicProps,
	AbstractCropperProps,
	AbstractCropperRef,
	AbstractCropperSettings,
	AbstractCropperSettingsProp,
} from './components/AbstractCropper';
import { FixedCropperSettings } from './components/FixedCropper';

export type StencilComponent = any;

export type CropperWrapperComponent = ComponentType<{
	cropper: any;
	loading: boolean;
	loaded: boolean;
	className?: string;
	style?: CSSProperties;
}>;

export type CropperBackgroundWrapperComponent = ComponentType<{
	cropper: any;
	touchMove?: boolean;
	mouseMove?: boolean;
	touchScale?: boolean;
	touchRotate?: boolean;
	wheelScale?:
		| boolean
		| {
				ratio: number;
		  };
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}>;

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

export type CustomCropperProps<Settings extends CustomCropperSettings> = AbstractCropperIntrinsicProps<Settings> &
	Partial<Pick<Settings, keyof CustomCropperSettings>> &
	Omit<Settings, keyof CustomCropperSettings>;

export type CustomCropperRef<Settings extends CustomCropperSettings> = AbstractCropperRef<Settings>;

export type CustomCropperSettings = AbstractCropperSettings;

export type DefaultTransforms = PartialTransforms | ((image: CropperImage) => PartialTransforms);

export type Nullable<T> = T | null | undefined;

export interface StencilRef {
	aspectRatio: () => AspectRatio;
}
