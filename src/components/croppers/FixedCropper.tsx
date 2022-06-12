import React, { Ref } from 'react';
import {
	defaultSize,
	sizeRestrictions,
	aspectRatio,
	fixedStencil,
	StencilSize,
	fixedStencilConstraints,
} from 'advanced-cropper/extensions/stencilSize';
import { withDefaultSizeRestrictions } from 'advanced-cropper/defaults';
import { CustomCropperProps, CustomCropperRef } from '../../types';
import { createCropper, splitAbstractCropperProps } from '../../service/cropper';
import { AbstractCropper } from '../AbstractCropper';

type UnavailableProps = 'sizeRestrictions' | 'aspectRatio';

export interface FixedCropperSettings {
	stencilSize: StencilSize<this>;
}

export type FixedCropperProps<Extension extends FixedCropperSettings = FixedCropperSettings> = Omit<
	CustomCropperProps<Extension>,
	UnavailableProps
>;

export type FixedCropperRef<Extension extends FixedCropperSettings = FixedCropperSettings> =
	CustomCropperRef<Extension>;

const FixedCropperComponent = <Extension extends FixedCropperSettings = FixedCropperSettings>(
	props: FixedCropperProps<Extension>,
	ref?: Ref<FixedCropperRef<Extension>>,
) => {
	const { settings, ...parameters } = splitAbstractCropperProps(props);
	return (
		<AbstractCropper<FixedCropperSettings>
			postProcess={fixedStencil}
			stencilConstraints={fixedStencilConstraints}
			{...parameters}
			settings={{
				defaultSize: defaultSize,
				aspectRatio: aspectRatio,
				sizeRestrictions: withDefaultSizeRestrictions(sizeRestrictions),
				...settings,
				transformImage: {
					...settings.transformImage,
					adjustStencil: false,
				},
			}}
			ref={ref}
		/>
	);
};

export const FixedCropper = createCropper(FixedCropperComponent);
