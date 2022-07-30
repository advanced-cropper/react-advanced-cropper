import React, { useLayoutEffect, useRef, useState } from 'react';
import cn from 'classnames';
import {
	CropperImage,
	CropperState,
	CropperTransitions,
	Size,
	getPreviewStyle,
	isLower,
	ratio,
	stretchPreviewBoundary,
} from 'advanced-cropper';
import { StretchableBoundary, StretchableBoundaryMethods } from '../service/StretchableBoundary';
import { useWindowResize } from '../../hooks/useWindowResize';

interface Props {
	state: CropperState | null;
	image: CropperImage | null;
	transitions?: CropperTransitions | null;
	className?: string;
	imageClassName?: string;
	contentClassName?: string;
}

export const CropperPreview = ({
	className,
	contentClassName,
	imageClassName,
	state,
	image,
	transitions = null,
}: Props) => {
	const boundaryRef = useRef<StretchableBoundaryMethods>(null);

	const [size, setSize] = useState<Size | null>(null);

	const [coefficient, setCoefficient] = useState(1);

	const imageStyle =
		state && state.coordinates && image && size ? getPreviewStyle(image, state, coefficient, transitions) : {};

	const contentStyle = size
		? {
				width: `${size.width}px`,
				height: `${size.height}px`,
		  }
		: {};

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

	useWindowResize(refresh);

	useLayoutEffect(() => {
		if (state?.coordinates) {
			refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image?.src, state?.coordinates]);

	return (
		<StretchableBoundary
			ref={boundaryRef}
			stretchAlgorithm={stretchPreviewBoundary}
			className={cn(className, 'advanced-cropper-preview')}
		>
			<div className={cn(contentClassName, 'advanced-cropper-preview__content')} style={contentStyle}>
				<img
					src={image ? image.src : undefined}
					className={cn(
						imageClassName,
						'advanced-cropper-preview__image',
						image && image.src && 'advanced-cropper-preview__image--visible',
					)}
					style={imageStyle}
				/>
			</div>
		</StretchableBoundary>
	);
};
