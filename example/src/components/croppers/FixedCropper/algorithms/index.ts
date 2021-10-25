import { getSizeRestrictions, CropperSettings, CropperState } from 'react-advanced-cropper';

export function getAbsoluteZoom(state: CropperState, settings: CropperSettings) {
	const { imageSize, coordinates } = state;

	const sizeRestrictions = getSizeRestrictions(state, settings);

	// The minimum size is the minimum size of the coordinates (it's the safe assumption because `adjustStencil` is on by default
	// What side of coordinates is considered as "size" doesn't matter, because it's the circle
	let minSize = Math.max(sizeRestrictions.minHeight || 10, sizeRestrictions.minWidth  || 10);

	// The maximum size depends on boundaries size.
	// If the image is horizontally fitted to boundaries, it's its original width
	// Else if the image is vertically fitted to boundaries, it's its original height
	let size, maxSize;
	if (imageSize.width / imageSize.height < coordinates.width / coordinates.height) {
		// The current size is the visible area size.
		// When it has the maximum value it's equal to the original image size
		// When it has the minimum value it's equal to the cropper size
		size = coordinates.width;
		maxSize = imageSize.width;
	} else {
		size = coordinates.height;
		maxSize = imageSize.height;
	}
	// This simple linear formula defines that absolute zoom is equal:
	// - 0 when `size` is equal to `maxSize`
	// - 1 when `size` is equal to `minSize`
	return Math.min(1, Math.max(0, 1 - (size - minSize) / (maxSize - minSize)));
}

export function getVisibleAreaSize(state: CropperState, settings: CropperSettings, absoluteZoom: number) {
	const { imageSize, boundary } = state;

	const sizeRestrictions = getSizeRestrictions(state, settings);

	// It's the reverse of formula above for calculation of absolute size
	let minSize = Math.max(sizeRestrictions.minHeight || 10, sizeRestrictions.minWidth  || 10);

	let maxSize =
		imageSize.width / imageSize.height > boundary.width / boundary.height ? imageSize.width : imageSize.height;

	return maxSize - absoluteZoom * (maxSize - minSize);
}
