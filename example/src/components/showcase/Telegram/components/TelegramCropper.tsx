import React, { forwardRef, useRef } from 'react';
import cn from 'classnames';
import {
	Cropper,
	CropperProps,
	ScaleImageSettings,
	CropperRef,
	mergeRefs,
	ImageRestriction,
	joinClassNames,
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
				lineClassNames: joinClassNames(stencilProps.lineClassNames, {
					default: 'telegram-stencil__line',
				}),
				handlerWrapperClassNames: joinClassNames(stencilProps.handlerWrapperClassNames, {
					default: 'telegram-stencil__handler-wrapper',
					westNorth: 'telegram-stencil__handler-wrapper--west-north',
					eastSouth: 'telegram-stencil__handler-wrapper--east-south',
					westSouth: 'telegram-stencil__handler-wrapper--west-south',
					eastNorth: 'telegram-stencil__handler-wrapper--east-north',
				}),
				handlerClassNames: joinClassNames(stencilProps.handlerClassNames, {
					default: 'telegram-stencil__handler',
					hover: 'telegram-stencil__handler--hover',
					westNorth: 'telegram-stencil__handler--west-north',
					eastSouth: 'telegram-stencil__handler--east-south',
					westSouth: 'telegram-stencil__handler--west-south',
					eastNorth: 'telegram-stencil__handler--east-north',
				}),
				previewClassName: cn(stencilProps.previewClassName, 'telegram-stencil__preview'),
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
			postProcess={autoZoom}
			defaultSize={defaultSize}
			transformImageAlgorithm={transformImage}
			resizeCoordinatesAlgorithm={resizeCoordinates}
			transitions={true}
		/>
	);
});

TelegramCropper.displayName = 'TelegramCropper';
