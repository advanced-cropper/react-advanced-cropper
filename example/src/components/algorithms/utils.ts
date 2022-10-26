import { Coordinates } from 'advanced-cropper';

export function coordinatesToStyle(coordinates: Coordinates | null) {
	return coordinates
		? {
				width: `${coordinates.width}px`,
				height: `${coordinates.height}px`,
				left: `${coordinates.left}px`,
				top: `${coordinates.top}px`,
		  }
		: {};
}
