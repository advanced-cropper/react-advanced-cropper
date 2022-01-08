import React, { useLayoutEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { CropperImage, CropperState, CropperTransitions, Size } from 'advanced-cropper/types';
import { getPreviewStyle } from 'advanced-cropper/image';
import { isLower } from 'advanced-cropper/utils';
import { ratio } from 'advanced-cropper/service';
import { StretchParams } from 'advanced-cropper/html';
import { DefaultBoundaryParams } from 'advanced-cropper/defaults';
import { StretchableBoundary, StretchableBoundaryMethods } from '../service/StretchableBoundary';
import './CropperPreview.scss';

interface Props {
	state: CropperState | null;
	image: CropperImage | null;
	className?: string;
	imageClassName?: string;
	contentClassName?: string;
	transitions?: CropperTransitions;
	width?: number;
	height?: number;
	fill?: unknown;
}

export const CropperPreview = ({ className, contentClassName, imageClassName, state, image, transitions }: Props) => {
	const boundaryRef = useRef<StretchableBoundaryMethods>(null);

	const [size, setSize] = useState<Size | null>(null);

	const [coefficient, setCoefficient] = useState(1);

	const imageStyle =
		state && state.coordinates && image && size ? getPreviewStyle(image, state, transitions, coefficient) : {};

	const refresh = () => {
		if (boundaryRef.current && state?.coordinates) {
			boundaryRef.current.stretchTo(state.coordinates).then((size) => {
				if (size && state.coordinates) {
					if (!isLower(ratio(state.coordinates), ratio(size))) {
						setSize({
							width: size.width,
							height: size.width / ratio(state.coordinates),
						});
						setCoefficient(state.coordinates.width / size.width);
					} else {
						setSize({
							width: size.height * ratio(state.coordinates),
							height: size.height,
						});
						setCoefficient(state.coordinates.height / size.height);
					}
				} else {
					setSize(null);
				}
			});
		}
	};

	const sizeAlgorithm = function ({ boundary }: DefaultBoundaryParams) {
		const { width, height } = boundary.getBoundingClientRect();

		return {
			width,
			height,
		};
	};

	const stretchAlgorithm = function ({ boundary, stretcher, size }: StretchParams) {
		// Reset stretcher
		stretcher.style.width = `0px`;
		stretcher.style.height = `0px`;

		// Stretch the boundary with respect to its width
		const width = Math.max(boundary.clientWidth, size.width);
		stretcher.style.width = `${width}px`;
		stretcher.style.height = `${width / ratio(size)}px`;

		// If the height of boundary larger than current stretcher height
		// stretch the boundary with respect to its height
		if (stretcher.clientHeight < boundary.clientHeight) {
			stretcher.style.height = `${boundary.clientHeight}px`;
			stretcher.style.width = `${stretcher.clientHeight * ratio(size)}px`;
		}
	};

	const contentStyle = size
		? {
				width: `${size.width}px`,
				height: `${size.height}px`,
		  }
		: {};

	useLayoutEffect(() => {
		if (state?.coordinates) {
			refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image?.src, state?.coordinates]);

	return (
		<StretchableBoundary
			ref={boundaryRef}
			sizeAlgorithm={sizeAlgorithm}
			stretchAlgorithm={stretchAlgorithm}
			className={cn(className, 'react-cropper-preview')}
		>
			<div className={cn(contentClassName, 'react-cropper-preview__content')} style={contentStyle}>
				<img
					src={image ? image.src : undefined}
					className={cn(
						imageClassName,
						'react-cropper-preview__image',
						image && image.src && 'react-cropper-preview__image--visible',
					)}
					style={imageStyle}
				/>
			</div>
		</StretchableBoundary>
	);
};
