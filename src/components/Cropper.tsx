import React, { Ref } from 'react';
import { CustomCropperProps, CustomCropperRef, CustomCropperSettings } from '../types';
import { createCropper, splitAbstractCropperProps } from '../service/cropper';
import { AbstractCropper } from './AbstractCropper';

export type CropperSettings = CustomCropperSettings;

export type CropperProps<Settings extends CropperSettings = CropperSettings> = CustomCropperProps<Settings>;

export type CropperRef<Settings extends CropperSettings = CropperSettings> = CustomCropperRef<Settings>;

const CropperComponent = <Settings extends CropperSettings = CropperSettings>(
	props: CropperProps<Settings>,
	ref?: Ref<CropperRef<Settings>>,
) => <AbstractCropper<CropperSettings> ref={ref} {...splitAbstractCropperProps(props)} />;

export const Cropper = createCropper(CropperComponent);
