import React, { forwardRef, Ref } from 'react';
import {
	defaultSize,
	sizeRestrictions,
	aspectRatio,
	fixedStencil,
	StencilSize,
	fixedStencilConstraints,
} from 'advanced-cropper/extensions/stencil-size';
import { withDefaultSizeRestrictions } from 'advanced-cropper/defaults';
import { CustomCropperProps, CustomCropperRef } from '../../types';
import { AbstractCropper } from '../AbstractCropper';
import { useAbstractCropperProps } from '../../hooks/useAbstractCropperProps';
import { defaultSettings } from '../../service/constants';

type UnavailableProps = 'sizeRestrictions' | 'aspectRatio';

export interface FixedCropperSettings {
	stencilSize: StencilSize<this>;
}

export type FixedCropperProps = Omit<CustomCropperProps<FixedCropperSettings>, UnavailableProps>;

export type FixedCropperRef = CustomCropperRef<FixedCropperSettings>;

export const FixedCropper = forwardRef((props: FixedCropperProps, ref?: Ref<FixedCropperRef>) => {
	const cropperProps = useAbstractCropperProps(props, [...defaultSettings, 'stencilSize']);
	return (
		<AbstractCropper<FixedCropperSettings>
			postProcess={fixedStencil}
			stencilConstraints={fixedStencilConstraints}
			{...cropperProps.props}
			settings={{
				defaultSize,
				aspectRatio,
				sizeRestrictions: withDefaultSizeRestrictions(sizeRestrictions),
				...cropperProps.settings,
				transformImage: {
					...cropperProps.settings.transformImage,
					adjustStencil: false,
				},
			}}
			ref={ref}
		/>
	);
});

FixedCropper.displayName = 'FixedCropper';
