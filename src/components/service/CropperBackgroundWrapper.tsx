import React, { CSSProperties, ReactNode } from 'react';
import { isMouseEvent, isTouchEvent, isWheelEvent, TransformImageEvent } from 'advanced-cropper/events';
import { CropperState, CropperTransitions } from 'advanced-cropper/types';
import { TransformableImage, TransformImageType } from './TransformableImage';

export interface CropperBackgroundWrapperProps {
	touchMove?: boolean;
	mouseMove?: boolean;
	touchResize?: boolean;
	wheelResize?:
		| boolean
		| {
				ratio: number;
		  };
	children?: ReactNode;
	className?: string;
	onMove?: (event: TransformImageEvent) => void;
	onResize?: (event: TransformImageEvent) => void;
	onTransformEnd?: () => void;
	style?: CSSProperties;
	state?: CropperState | null;
	transitions?: CropperTransitions | null;
}

export const CropperBackgroundWrapper = ({
	touchMove,
	mouseMove,
	touchResize,
	wheelResize,
	children,
	className,
	onMove,
	onResize,
	onTransformEnd,
	style,
}: CropperBackgroundWrapperProps) => {
	return (
		<TransformableImage
			className={className}
			style={style}
			onMove={onMove}
			onResize={onResize}
			onTransformEnd={onTransformEnd}
			touchMove={touchMove}
			mouseMove={mouseMove}
			touchResize={touchResize}
			wheelResize={wheelResize}
		>
			{children}
		</TransformableImage>
	);
};
