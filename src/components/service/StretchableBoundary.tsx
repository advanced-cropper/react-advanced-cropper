import React, { ReactNode, forwardRef, useImperativeHandle, useRef, CSSProperties } from 'react';
import cn from 'classnames';
import {
	BoundarySizeAlgorithm,
	Size,
	stretchCropperBoundary,
	BoundaryStretchAlgorithm,
	fillBoundary,
} from 'advanced-cropper';

interface Props {
	className?: string;
	style?: CSSProperties;
	stretcherClassName?: string;
	contentClassName?: string;
	stretchAlgorithm?: BoundaryStretchAlgorithm;
	sizeAlgorithm?: BoundarySizeAlgorithm;
	children?: ReactNode;
}

export interface StretchableBoundaryMethods {
	stretchTo: (size: Size | null) => Promise<Size | null>;
	reset: () => void;
}

export const StretchableBoundary = forwardRef(
	(
		{
			className,
			style,
			stretcherClassName,
			contentClassName,
			stretchAlgorithm = stretchCropperBoundary,
			sizeAlgorithm = fillBoundary,
			children,
		}: Props,
		ref,
	) => {
		const stretcherRef = useRef<HTMLDivElement>(null);
		const boundaryRef = useRef<HTMLDivElement>(null);

		useImperativeHandle(ref, () => ({
			reset: () => {
				const stretcher = stretcherRef.current;
				if (stretcher) {
					stretcher.style.height = '';
					stretcher.style.width = '';
				}
			},
			stretchTo: (size: Size | null) => {
				const stretcher = stretcherRef.current;
				const boundary = boundaryRef.current;

				if (size?.width && size?.height && stretcher && boundary) {
					stretchAlgorithm(boundary, stretcher, size);
					const result = sizeAlgorithm(boundary, size);
					return Promise.resolve(result.width && result.height ? result : null);
				} else {
					if (stretcher) {
						stretcher.style.height = '';
						stretcher.style.width = '';
					}
					return Promise.resolve(null);
				}
			},
		}));

		return (
			<div ref={boundaryRef} style={style} className={cn('advanced-cropper-boundary', className)}>
				<div ref={stretcherRef} className={cn(['advanced-cropper-boundary__stretcher', stretcherClassName])} />
				<div className={cn(['advanced-cropper-boundary__content', contentClassName])}>{children}</div>
			</div>
		);
	},
);

StretchableBoundary.displayName = 'StretchableBoundary';
