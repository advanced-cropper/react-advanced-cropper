import React, { CSSProperties, ReactNode } from 'react';
import { CropperTransitions, ImageTransform } from 'advanced-cropper';
import { useRotateImageOptions } from '../../hooks/useRotateImageOptions';
import { useScaleImageOptions } from '../../hooks/useScaleImageOptions';
import { useMoveImageOptions } from '../../hooks/useMoveImageOptions';
import { MoveImageOptions, RotateImageOptions, ScaleImageOptions } from '../../types';
import { TransformableImage } from './TransformableImage';

interface DesiredCropperRef {
	transformImage: (transform: ImageTransform) => void;
	transformImageEnd: () => void;
	getTransitions: () => CropperTransitions;
}

export interface CropperBackgroundWrapperProps {
	cropper: DesiredCropperRef;
	rotateImage?: boolean | RotateImageOptions;
	scaleImage?: boolean | ScaleImageOptions;
	moveImage?: boolean | MoveImageOptions;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	timeout?: number;
}

export const CropperBackgroundWrapper = ({
	scaleImage = true,
	moveImage = true,
	rotateImage = false,
	children,
	className,
	style,
	cropper,
	timeout,
}: CropperBackgroundWrapperProps) => {
	const transitions = cropper.getTransitions();

	const rotateImageOptions = useRotateImageOptions(rotateImage);
	const scaleImageOptions = useScaleImageOptions(scaleImage);
	const moveImageOptions = useMoveImageOptions(moveImage);

	return (
		<TransformableImage
			className={className}
			style={style}
			onTransform={cropper.transformImage}
			onTransformEnd={cropper.transformImageEnd}
			touchMove={moveImageOptions.touch}
			mouseMove={moveImageOptions.mouse}
			touchScale={scaleImageOptions.touch}
			wheelScale={scaleImageOptions.wheel}
			touchRotate={rotateImageOptions.touch}
			disabled={transitions.active}
			timeout={timeout}
		>
			{children}
		</TransformableImage>
	);
};
