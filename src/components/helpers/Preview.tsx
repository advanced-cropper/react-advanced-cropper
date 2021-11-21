import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { CropperImage, CropperState, CropperTransitions, Size } from 'advanced-cropper/types';
import { getPreviewStyle } from 'advanced-cropper/image';
import { isUndefined } from 'advanced-cropper/utils';

import './Preview.scss';

interface Props {
	className?: string;
	imageClassName?: string;
	wrapperClassName?: string;
	state: CropperState | null;
	image: CropperImage | null;
	transitions?: CropperTransitions | null;
	width?: number;
	height?: number;
	fill?: unknown;
}

export const Preview = ({
	className,
	wrapperClassName,
	imageClassName,
	state,
	image,
	transitions,
	width,
	height,
	fill,
}: Props) => {
	const rootRef = useRef<HTMLDivElement>();

	const wrapperRef = useRef<HTMLDivElement>();

	const imageRef = useRef<HTMLImageElement>();

	const [calculatedSize, setCalculatedSize] = useState<Partial<Size>>({});

	const transitionsActive = transitions && transitions.active;

	const size = useMemo(
		() => ({
			width: isUndefined(width) ? calculatedSize.width : width,
			height: isUndefined(height) ? calculatedSize.height : height,
		}),
		[width, height, calculatedSize.width, calculatedSize.height],
	);

	const style = (() => {
		if (!fill) {
			const result: CSSProperties = {};
			if (width) {
				result.width = `${size.width}px`;
			}
			if (height) {
				result.height = `${size.height}px`;
			}
			if (transitionsActive) {
				result.transition = `${transitions.duration}ms ${transitions.timingFunction}`;
			}
			return result;
		} else {
			return {};
		}
	})();

	const wrapperStyle = (() => {
		const result: CSSProperties = {
			width: `${size.width}px`,
			height: `${size.height}px`,
			left: `calc(50% - ${size.width / 2}px)`,
			top: `calc(50% - ${size.height / 2}px)`,
		};
		if (transitionsActive) {
			result.transition = `${transitions.duration}ms ${transitions.timingFunction}`;
		}
		return result;
	})();

	const imageStyle = state && image ? getPreviewStyle(image, state, transitions, size) : {};

	const refresh = () => {
		const root = rootRef.current;
		const result: Partial<Size> = {};
		if (!width) {
			result.width = root.clientWidth;
		}
		if (!height) {
			result.height = root.clientHeight;
		}
		setCalculatedSize(result);
	};

	useEffect(() => {
		if (image && (image.width || image.height)) {
			refresh();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image?.src]);

	return (
		<div ref={rootRef} className={cn(className, 'react-preview')} style={style}>
			<div ref={wrapperRef} className={cn(wrapperClassName, 'react-preview__wrapper')} style={wrapperStyle}>
				<img
					ref={imageRef}
					src={image && image.src}
					className={cn(
						imageClassName,
						'react-preview__image',
						image && image.src && 'react-preview__image--visible',
					)}
					style={imageStyle}
				/>
			</div>
		</div>
	);
};
