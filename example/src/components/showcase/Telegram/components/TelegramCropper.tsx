import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';
import {
	Cropper,
	CropperProps,
	ScaleImageSettings,
	CropperRef,
	mergeRefs,
	ImageRestriction,
} from 'react-advanced-cropper';
import {
	zoomStencil,
	fitStencilToImage,
	resizeCoordinates,
	transformImage,
	defaultSize,
	stencilConstraints,
} from 'advanced-cropper/showcase/mobile';
import { PublicNavigationProps } from './Navigation';
import { CropperWrapper } from './CropperWrapper';
import './TelegramCropper.scss';

export interface TelegramCropperProps
	extends Omit<
		CropperProps,
		'transitions' | 'priority' | 'imageRestriction' | 'stencilSize' | 'stencilConstraints' | 'transformImage'
	> {
	spinnerClassName?: string;
	resizeImage?: boolean | Omit<ScaleImageSettings, 'adjustStencil'>;
	navigation?: boolean;
	navigationProps?: PublicNavigationProps;
}

export const TelegramCropper = forwardRef((props: TelegramCropperProps, ref) => {
	const {
		className,
		spinnerClassName,
		navigation = true,
		stencilProps = {},
		navigationProps = {},
		wrapperComponent,
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
				grid: true,
				...stencilProps,
				movable: false,
			}}
			wrapperComponent={WrapperComponent}
			wrapperProps={{
				navigationProps,
				navigation,
				spinnerClassName,
			}}
			imageRestriction={ImageRestriction.none}
			className={cn('telegram-cropper', className)}
			postProcess={[fitStencilToImage, zoomStencil]}
			defaultSize={defaultSize}
			transformImageAlgorithm={transformImage}
			resizeCoordinatesAlgorithm={resizeCoordinates}
			transitions={true}
		/>
	);
});

TelegramCropper.displayName = 'TelegramCropper';
