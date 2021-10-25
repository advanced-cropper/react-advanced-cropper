import { CropperState, CropperImage, CropperTransitions, AspectRatio } from 'advanced-cropper/types';
import { MoveEvent, ResizeEvent } from 'advanced-cropper/events';

export type StencilComponent = any;

export interface TransitionsSettings {
	timingFunction?: string;
	duration?: number;
}

export interface ResizeImageSettings {
	touch?: boolean;
	wheel?:
		| boolean
		| {
				ratio?: number;
		  };
	adjustStencil?: boolean;
}

export interface MoveImageSettings {
	touch?: boolean;
	mouse?: boolean;
}

export interface BasicStencilProps {
	state: CropperState | null;
	image: CropperImage | null;
	transitions: CropperTransitions | null;
	onResize?: (event: ResizeEvent) => void;
	onResizeEnd?: () => void;
	onMove?: (event: MoveEvent) => void;
	onMoveEnd?: () => void;
}
export interface StencilRef {
	aspectRatio: () => AspectRatio;
}
