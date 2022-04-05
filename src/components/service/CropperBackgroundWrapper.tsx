import React, { CSSProperties, ReactNode } from 'react';
import { CropperTransitions, ImageTransform } from 'advanced-cropper/types';
import { TransformableImage } from './TransformableImage';

interface DesiredCropperRef {
	transformImage: (transform: ImageTransform) => void;
	transformImageEnd: () => void;
	getTransitions: () => CropperTransitions;
}

export interface CropperBackgroundWrapperProps {
	cropper: DesiredCropperRef;
	touchMove?: boolean;
	mouseMove?: boolean;
	touchScale?: boolean;
	touchRotate?: boolean;
	wheelScale?:
		| boolean
		| {
				ratio: number;
		  };
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export const CropperBackgroundWrapper = ({
	touchMove,
	mouseMove,
	touchScale,
	wheelScale,
	touchRotate,
	children,
	className,
	style,
	cropper,
}: CropperBackgroundWrapperProps) => {
	const transitions = cropper.getTransitions();

	return (
		<TransformableImage
			className={className}
			style={style}
			onTransform={cropper.transformImage}
			onTransformEnd={cropper.transformImageEnd}
			touchMove={touchMove}
			mouseMove={mouseMove}
			touchScale={touchScale}
			wheelScale={wheelScale}
			touchRotate={touchRotate}
			frozen={transitions.active}
		>
			{children}
		</TransformableImage>
	);
};
