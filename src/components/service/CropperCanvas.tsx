import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { CropperState } from 'advanced-cropper/types';
import { DrawOptions, drawCroppedArea } from 'advanced-cropper/canvas';
import './CropperCanvas.scss';

export interface CropperCanvasMethods {
	draw: (state: CropperState, image: HTMLImageElement, options?: DrawOptions) => HTMLCanvasElement | null;
}

export const CropperCanvas = forwardRef((_, ref) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const spareCanvasRef = useRef<HTMLCanvasElement>(null);

	useImperativeHandle(ref, () => ({
		draw: (state: CropperState, image: HTMLImageElement, options: DrawOptions = {}) => {
			if (image && canvasRef.current && spareCanvasRef.current) {
				return drawCroppedArea(state, image, canvasRef.current, spareCanvasRef.current, options);
			} else {
				return null;
			}
		},
	}));

	return (
		<>
			<canvas className="react-cropper-canvas" ref={canvasRef} />
			<canvas className="react-cropper-canvas" ref={spareCanvasRef} />
		</>
	);
});

CropperCanvas.displayName = 'CropperCanvas';
