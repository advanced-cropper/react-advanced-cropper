import React, { forwardRef, useEffect, useRef } from 'react';
import cn from 'classnames';
import { getBackgroundStyle, mergeRefs, CropperTransitions, CropperImage, CropperState } from 'react-advanced-cropper';

import './AdjustableImage.scss';

interface Props {
	className?: string;
	image: CropperImage | null;
	state: CropperState | null;
	transitions?: CropperTransitions;
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	brightness?: number;
	saturation?: number;
	hue?: number;
	contrast?: number;
}

export const AdjustableImage = forwardRef<HTMLCanvasElement, Props>(
	(
		{
			className,
			image,
			state,
			crossOrigin,
			transitions,
			brightness = 0,
			saturation = 0,
			hue = 0,
			contrast = 0,
		}: Props,
		ref,
	) => {
		const imageRef = useRef<HTMLImageElement>(null);

		const canvasRef = useRef<HTMLCanvasElement>(null);

		const style = image && state ? getBackgroundStyle(image, state, transitions) : {};

		const src = image ? image.src : undefined;

		const drawImage = () => {
			const image = imageRef.current;
			const canvas = canvasRef.current;
			if (canvas && image && image.complete) {
				const ctx = canvas.getContext('2d');
				canvas.width = image.naturalWidth;
				canvas.height = image.naturalHeight;

				if (ctx) {
					ctx.filter = [
						`brightness(${100 + brightness * 100}%)`,
						`contrast(${100 + contrast * 100}%)`,
						`saturate(${100 + saturation * 100}%)`,
						`hue-rotate(${hue * 360}deg)`,
					].join(' ');

					ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
				}
			}
		};

		useEffect(() => {
			drawImage();
		}, [brightness, saturation, hue, contrast]);

		return (
			<>
				<canvas
					ref={mergeRefs([ref, canvasRef])}
					className={cn('adjustable-image-canvas', className)}
					style={style}
				/>
				{src ? (
					<img
						key={src}
						ref={imageRef}
						className={'adjustable-image-source'}
						src={src}
						crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
						onLoad={drawImage}
					/>
				) : null}
			</>
		);
	},
);

AdjustableImage.displayName = 'AdjustableImage';
