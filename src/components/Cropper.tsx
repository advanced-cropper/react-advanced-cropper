import React, { Ref } from 'react';
import { isUndefined } from 'advanced-cropper/utils';
import { CustomCropperProps, CustomCropperRef } from '../types';
import { createCropper, splitAbstractCropperProps } from '../service/cropper';
import { StencilSize } from '../../../Advanced Cropper/dist/extensions/stencilSize';
import { hybridStencilAutoZoom } from '../deprecated/hybridAutoZoom';
import { useDeprecationWarning } from '../hooks/useDeprecationWarning';
import { AbstractCropper, AbstractCropperSettings } from './AbstractCropper';
import { FixedCropper, FixedCropperSettings } from './FixedCropper';

interface DeprecatedCropperSettings extends AbstractCropperSettings {
	stencilSize?: StencilSize;
	autoZoom?: boolean;
}

export type CropperSettings = DeprecatedCropperSettings;

export type CropperProps<Settings extends CropperSettings = CropperSettings> = CustomCropperProps<Settings>;

export type CropperRef<Settings extends CropperSettings = CropperSettings> = CustomCropperRef<Settings>;

const CropperComponent = <Settings extends CropperSettings = CropperSettings>(
	props: CropperProps<Settings>,
	ref?: Ref<CropperRef<Settings>>,
) => {
	let { settings, postProcess, ...parameters } = splitAbstractCropperProps(props);

	// Process the deprecate properties
	const { stencilSize, autoZoom, ...actualSettings } = settings;

	const deprecationWarning = useDeprecationWarning();

	if (!isUndefined(autoZoom)) {
		if (postProcess || stencilSize) {
			deprecationWarning(
				`prop 'autoZoom' is deprecated now and will be removed, use 'postProcess' prop to pass your auto zoom function.`,
			);
		} else {
			deprecationWarning(
				`prop 'autoZoom' is deprecated now and will be removed, use 'postProcess' prop to pass your auto zoom function. The 'postProcess' automatically set to 'hybridAutoZoom'`,
			);
			postProcess = hybridStencilAutoZoom;
		}
	}

	if (!isUndefined(stencilSize)) {
		deprecationWarning(
			`prop 'stencilSize' is deprecated for <Cropper/> component now and will be removed, use <FixedCropper/> component instead.`,
		);
		return (
			<FixedCropper<FixedCropperSettings>
				stencilSize={stencilSize}
				{...actualSettings}
				{...parameters}
				ref={ref as any}
			/>
		);
	}

	return (
		<AbstractCropper<DeprecatedCropperSettings>
			{...parameters}
			postProcess={postProcess}
			ref={ref}
			settings={actualSettings}
		/>
	);
};

export const Cropper = createCropper(CropperComponent);
