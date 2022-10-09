import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { CropperState, DrawOptions, drawCroppedArea } from 'advanced-cropper';

export interface CropperCanvasMethods {
	draw: (state: CropperState, image: HTMLElement, options?: DrawOptions) => HTMLCanvasElement | null;
}

export const CropperCanvas = forwardRef((_, ref) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const spareCanvasRef = useRef<HTMLCanvasElement>(null);

	useImperativeHandle(ref, () => ({
		draw: (state: CropperState, image: HTMLElement, options: DrawOptions = {}) => {
			if (image && canvasRef.current && spareCanvasRef.current) {
				return drawCroppedArea(
					state,
					image as HTMLImageElement | HTMLCanvasElement,
					canvasRef.current,
					spareCanvasRef.current,
					options,
				);
			} else {
				return null;
			}
		},
	}));

	return (
		<>
			<canvas className="advanced-cropper-canvas" ref={canvasRef} />
			<canvas className="advanced-cropper-canvas" ref={spareCanvasRef} />
		</>
	);
});

CropperCanvas.displayName = 'CropperCanvas';
