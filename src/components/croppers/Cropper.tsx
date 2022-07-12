import React, { Ref } from 'react';
import { isUndefined } from 'advanced-cropper/utils';
import { StencilSize } from 'advanced-cropper/extensions/stencil-size';
import { CustomCropperProps, CustomCropperRef, SettingsExtension } from '../../types';
import { createCropper, splitAbstractCropperProps } from '../../service/cropper';
import { hybridStencilAutoZoom } from '../../deprecated/hybridAutoZoom';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
import { AbstractCropper } from '../AbstractCropper';
import { FixedCropper, FixedCropperRef, FixedCropperSettings } from './FixedCropper';

interface DeprecatedCropperSettings {
	stencilSize?: StencilSize;
	autoZoom?: boolean;
}

export type CropperProps<Extension extends SettingsExtension = {}> = CustomCropperProps<Extension>;

export type CropperRef<Extension extends SettingsExtension = {}> = CustomCropperRef<Extension>;

const CropperComponent = <Extension extends SettingsExtension = {}>(
	props: CropperProps<Extension>,
	ref?: Ref<CropperRef<Extension>>,
) => {
	let { settings, postProcess, ...parameters } = splitAbstractCropperProps(props);

	// Process the deprecated properties
	const { stencilSize, autoZoom, ...actualSettings } = settings as DeprecatedCropperSettings;

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
				ref={ref as Ref<FixedCropperRef>}
				stencilSize={stencilSize}
				{...actualSettings}
				{...parameters}
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
