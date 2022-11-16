import { ComponentType, CSSProperties, ReactNode } from 'react';
import {
	AbstractCropperIntrinsicProps,
	AbstractCropperRef,
	AbstractCropperSettings,
} from './components/AbstractCropper';

export type ArbitraryProps = Record<string, any>;

export type StencilComponent = any;

export type CropperWrapperComponent = ComponentType<{
	cropper: any;
	className?: string;
	style?: CSSProperties;
}>;

export type CropperBackgroundComponent = any;

export type CropperBackgroundWrapperComponent = ComponentType<{
	cropper: any;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}>;

export type StencilOptions = Record<string, unknown>;

export type StencilConstraints<Settings extends {}> = (
	settings: Settings,
	stencilOptions: StencilOptions,
) => Partial<Settings>;

export interface ScaleImageOptions {
	touch?: boolean;
	wheel?:
		| boolean
		| {
				ratio?: number;
		  };
	adjustStencil?: boolean;
}

export interface RotateImageOptions {
	touch?: boolean;
}

export interface MoveImageOptions {
	touch?: boolean;
	mouse?: boolean;
}

export type CustomCropperProps<Extension extends SettingsExtension = {}> = AbstractCropperIntrinsicProps<
	ExtendedSettings<Extension>
> &
	Partial<Pick<ExtendedSettings<Extension>, keyof AbstractCropperSettings>> &
	Omit<ExtendedSettings<Extension>, keyof AbstractCropperSettings>;

export type CustomCropperRef<Extension extends SettingsExtension = {}> = AbstractCropperRef<
	ExtendedSettings<Extension>
>;

export type ExtendedSettings<Extension extends {} = {}> = Extension & AbstractCropperSettings;

export type SettingsExtension = object;
