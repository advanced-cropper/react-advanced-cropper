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
	touchResize?: boolean;
	touchRotate?: boolean;
	wheelResize?:
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
	touchResize,
	wheelResize,
	touchRotate,
	children,
	className,
	style,
	cropper,
}: CropperBackgroundWrapperProps) => {
	return (
		<TransformableImage
			className={className}
			style={style}
			onTransform={cropper.transformImage}
			onTransformEnd={cropper.transformImageEnd}
			touchMove={touchMove}
			mouseMove={mouseMove}
			touchResize={touchResize}
			wheelResize={wheelResize}
			touchRotate={touchRotate}
		>
			{children}
		</TransformableImage>
	);
};
