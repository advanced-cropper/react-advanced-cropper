import React, { forwardRef, Ref } from 'react';
import { isUndefined } from 'advanced-cropper';
import { StencilSize } from 'advanced-cropper/extensions/stencil-size';
import { CustomCropperProps, CustomCropperRef, ExtendedSettings } from '../../types';
import { hybridStencilAutoZoom } from '../../deprecated/hybridAutoZoom';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
import { AbstractCropper, AbstractCropperIntrinsicProps } from '../AbstractCropper';
import { useAbstractCropperProps } from '../../hooks/useAbstractCropperProps';
import { FixedCropper, FixedCropperRef, FixedCropperSettings } from './FixedCropper';

interface DeprecatedCropperSettings {
	stencilSize?: StencilSize;
	autoZoom?: boolean;
}

export type CropperProps = CustomCropperProps;

export type CropperRef = CustomCropperRef;

export const Cropper = forwardRef((props: CropperProps, ref?: Ref<CropperRef>) => {
	const cropperProps = useAbstractCropperProps(props);

	const intrinsicProps = cropperProps.props;

	// Process the deprecated properties
	const { stencilSize, autoZoom, ...actualSettings } = cropperProps.settings as DeprecatedCropperSettings;

	const deprecationWarning = useDeprecationWarning();

	if (!isUndefined(autoZoom)) {
		if (intrinsicProps.postProcess || stencilSize) {
			deprecationWarning(
				`prop 'autoZoom' is deprecated now and will be removed, use 'postProcess' prop to pass your auto zoom function.`,
			);
		} else {
			deprecationWarning(
				`prop 'autoZoom' is deprecated now and will be removed, use 'postProcess' prop to pass your auto zoom function. The 'postProcess' automatically set to 'hybridAutoZoom'`,
			);
			intrinsicProps.postProcess = hybridStencilAutoZoom;
		}
	}

	if (!isUndefined(stencilSize)) {
		deprecationWarning(
			`prop 'stencilSize' is deprecated for <Cropper/> component now and will be removed, use <FixedCropper/> component instead.`,
		);
		return (
			<FixedCropper
				ref={ref as Ref<FixedCropperRef>}
				stencilSize={stencilSize}
				{...actualSettings}
				{...(intrinsicProps as AbstractCropperIntrinsicProps<ExtendedSettings<FixedCropperSettings>>)}
			/>
		);
	}

	return <AbstractCropper {...intrinsicProps} ref={ref} settings={actualSettings} />;
});

Cropper.displayName = 'CropperComponent';
