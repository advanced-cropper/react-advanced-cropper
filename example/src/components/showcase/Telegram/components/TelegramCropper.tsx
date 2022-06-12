import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';
import {
	Cropper,
	CropperProps,
	ScaleImageSettings,
	CropperSettings,
	CropperRef,
	mergeRefs,
	ImageRestriction,
} from 'react-advanced-cropper';
import {
	autoZoom,
	resizeCoordinates,
	transformImage,
	defaultSize,
	stencilConstraints,
} from 'advanced-cropper/showcase/telegram';
import { PublicNavigationProps } from './Navigation';
import { CropperWrapper } from './CropperWrapper';
import './TelegramCropper.scss';

export interface TelegramCropperProps
	extends Omit<CropperProps, 'transitions' | 'priority' | 'imageRestriction' | 'stencilSize' | 'transformImage'> {
	spinnerClassName?: string;
	resizeImage?: boolean | Omit<ScaleImageSettings, 'adjustStencil'>;
	navigation?: boolean;
	navigationProps?: PublicNavigationProps;
}

export type TelegramCropperSettings = CropperSettings;

export const TelegramCropper = forwardRef((props: TelegramCropperProps, ref) => {
	const {
		className,
		spinnerClassName,
		navigation = true,
		stencilProps = {},
		navigationProps = {},
		wrapperComponent,
		backgroundWrapperProps,
		...cropperProps
	} = props;

	const cropperRef = useRef<CropperRef>(null);

	const WrapperComponent = wrapperComponent || CropperWrapper;

	return (
		<Cropper
			{...cropperProps}
			ref={mergeRefs([ref, cropperRef])}
			stencilConstraints={stencilConstraints}
			stencilProps={{
				lineClassNames: {
					default: 'telegram-circle-stencil__line',
				},
				handlerWrapperClassNames: {
					default: 'telegram-circle-stencil__handler-wrapper',
					westNorth: 'telegram-circle-stencil__handler-wrapper--west-north',
					eastSouth: 'telegram-circle-stencil__handler-wrapper--east-south',
					westSouth: 'telegram-circle-stencil__handler-wrapper--west-south',
					eastNorth: 'telegram-circle-stencil__handler-wrapper--east-north',
				},
				handlerClassNames: {
					default: 'telegram-circle-stencil__handler',
					hover: 'telegram-circle-stencil__handler--hover',
					westNorth: 'telegram-circle-stencil__handler--west-north',
					eastSouth: 'telegram-circle-stencil__handler--east-south',
					westSouth: 'telegram-circle-stencil__handler--west-south',
					eastNorth: 'telegram-circle-stencil__handler--east-north',
				},
				previewClassName: 'telegram-circle-stencil__preview',
				...stencilProps,
				movable: false,
			}}
			wrapperComponent={WrapperComponent}
			wrapperProps={{
				navigationProps,
				navigation,
				spinnerClassName,
			}}
			backgroundWrapperProps={{
				timeout: 500,
				...backgroundWrapperProps,
			}}
			imageRestriction={ImageRestriction.none}
			className={cn('telegram-cropper', className)}
			postProcess={autoZoom}
			defaultSize={defaultSize}
			transformImageAlgorithm={transformImage}
			resizeCoordinatesAlgorithm={resizeCoordinates}
			transitions={true}
		/>
	);
});

TelegramCropper.displayName = 'TelegramCropper';
