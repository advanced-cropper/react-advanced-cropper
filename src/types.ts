import { ComponentType, CSSProperties, ReactNode, Ref } from 'react';
import {
	CropperImage,
	CropperTransitions,
	CropperState,
	DefaultSettings,
	ModifierSettings,
	CoreSettings,
	RawAspectRatio,
	AbstractCropperMethodOptions,
} from 'advanced-cropper';
import {
	AbstractCropperIntrinsicProps,
	AbstractCropperRef,
	AbstractCropperSettings,
} from './components/AbstractCropper';
import { CropperRef } from './components/croppers/Cropper';

export type StencilComponent = any;

export type CropperWrapperComponent = ComponentType<{
	cropper: any;
	loading: boolean;
	loaded: boolean;
	className?: string;
	style?: CSSProperties;
}>;

export interface CropperBackgroundProps {
	className?: string;
	ref: Ref<HTMLImageElement | HTMLCanvasElement>;
	image: CropperImage | null;
	state: CropperState | null;
	transitions?: CropperTransitions;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
}

export type CropperBackgroundComponent = any;

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

export type StencilOptions = Record<string, unknown>;

export type StencilConstraints<Settings extends {}> = (
	settings: Settings,
	stencilOptions: StencilOptions,
) => Partial<Settings>;

export interface RotateImageSettings {
	touch?: boolean;
}

export interface MoveImageSettings {
	touch?: boolean;
	mouse?: boolean;
}

export type CustomCropperProps<Extension extends SettingsExtension> = AbstractCropperIntrinsicProps<
	ExtendedSettings<Extension>
> &
	Partial<Pick<ExtendedSettings<Extension>, keyof CustomCropperSettings>> &
	Omit<ExtendedSettings<Extension>, keyof CustomCropperSettings>;

export type CustomCropperRef<Extension extends SettingsExtension> = AbstractCropperRef<ExtendedSettings<Extension>>;

export type CustomCropperSettings = AbstractCropperSettings;

export type CropperMethodOptions = AbstractCropperMethodOptions;

export interface StencilRef {
	aspectRatio: RawAspectRatio | (() => RawAspectRatio);
}

export interface StencilProps<Cropper = CropperRef> {
	cropper: Cropper;
	image: CropperImage | null;
}

export type ArbitraryProps = Record<string, any>;

export type ExtendedSettings<Extension extends {}> = Extension & DefaultSettings & CoreSettings & ModifierSettings;

export type SettingsExtension = object;
