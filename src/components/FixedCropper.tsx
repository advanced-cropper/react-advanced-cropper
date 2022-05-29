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
import { CustomCropperProps, CustomCropperRef, CustomCropperSettings, SettingsExtension } from '../types';
import { createCropper, splitAbstractCropperProps } from '../service/cropper';
import { AbstractCropper } from './AbstractCropper';

type UnavailableProps = 'sizeRestrictions' | 'aspectRatio';

export interface FixedCropperSettings {
	stencilSize: StencilSize<this>;
}

export type FixedCropperProps<Extension extends SettingsExtension> = Omit<
	CustomCropperProps<Extension>,
	UnavailableProps
>;

export type FixedCropperRef<Settings extends FixedCropperSettings = FixedCropperSettings> = CustomCropperRef<Settings>;

const FixedCropperComponent = <Settings extends FixedCropperSettings = FixedCropperSettings>(
	props: FixedCropperProps<Settings>,
	ref?: Ref<FixedCropperRef<Settings>>,
) => {
	const { settings, ...parameters } = splitAbstractCropperProps(props);
	return (
		<AbstractCropper<FixedCropperSettings>
			ref={ref}
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
		/>
	);
};

export const FixedCropper = createCropper(FixedCropperComponent);
