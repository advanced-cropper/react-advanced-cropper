import React, { ReactNode, useMemo, useState, forwardRef, useImperativeHandle, useRef, CSSProperties } from 'react';
import cn from 'classnames';
import { BoundarySizeAlgorithm, Size } from 'advanced-cropper/types';
import { updateStretcher, StretchAlgorithm } from 'advanced-cropper/html';
import { fillBoundary, fitBoundary } from 'advanced-cropper/defaults';
import { isFunction } from 'advanced-cropper/utils';
import { tick } from '../../service/utils';

import './CropperBoundary.scss';

interface Props {
	className?: string;
	style?: CSSProperties;
	stretcherClassName?: string;
	contentClassName?: string;
	stretchAlgorithm?: StretchAlgorithm;
	sizeAlgorithm?: BoundarySizeAlgorithm | string;
	children?: ReactNode;
}

export interface CropperBoundaryMethods {
	stretchTo: (size: Size) => Promise<Size | null>;
	reset: () => void;
}

export const CropperBoundary = forwardRef(
	(
		{
			className,
			style,
			stretcherClassName,
			contentClassName,
			stretchAlgorithm = updateStretcher,
			sizeAlgorithm,
			children,
		}: Props,
		ref,
	) => {
		const stretcherRef = useRef<HTMLDivElement>();
		const boundaryRef = useRef<HTMLDivElement>();

		useImperativeHandle(ref, () => ({
			reset: () => {
				const stretcher = stretcherRef.current;
				if (stretcher) {
					stretcher.style.height = '';
					stretcher.style.width = '';
				}
			},
			stretchTo: (size: Size) => {
				const stretcher = stretcherRef.current;
				const boundary = boundaryRef.current;

				if (size && size.width && size.height && stretcher && boundary) {
					stretchAlgorithm({
						boundary,
						stretcher,
						size,
					});

					const params = {
						boundary,
						size,
					};

					let result;
					if (isFunction(sizeAlgorithm)) {
						result = sizeAlgorithm(params);
					} else if (sizeAlgorithm === 'fit') {
						result = fitBoundary(params);
					} else {
						result = fillBoundary(params);
					}
					if (!result.width || !result.height) {
						return Promise.resolve(null);
					} else {
						return Promise.resolve(result);
					}
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
			<div ref={boundaryRef} style={style} className={cn('react-cropper-boundary', className)}>
				<div ref={stretcherRef} className={cn(['react-cropper-boundary__stretcher', stretcherClassName])} />
				<div className={cn(['react-cropper-boundary__content', contentClassName])}>{children}</div>
			</div>
		);
	},
);

CropperBoundary.displayName = 'CropperBoundary';
