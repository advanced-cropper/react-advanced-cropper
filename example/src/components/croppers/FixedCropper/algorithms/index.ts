import {
	ImageRestriction,
	StencilSize,
	DefaultSettings,
	ratio,
	getSizeRestrictions,
	getMinimumSize,
	CropperSettings,
	InitializedCropperState,
	isGreater,
} from 'react-advanced-cropper';

function getMinimumVisibleAreaSize(
	state: InitializedCropperState,
	settings: DefaultSettings & {
		imageRestriction?: ImageRestriction;
		adjustStencil?: boolean;
		stencilSize?: StencilSize;
		minWidth?: number;
		minHeight?: number;
	},
) {
	const minimumSize = getMinimumSize(state);

	// Extend the basic settings
	settings = {
		...settings,
		minWidth: Math.max(minimumSize, settings.minWidth || 0),
		minHeight: Math.max(minimumSize, settings.minHeight || 0),
	};

	const { coordinates, visibleArea } = state;

	const { adjustStencil, stencilSize } = settings;

	const aspectRatio = ratio(coordinates);

	const sizeRestrictions = getSizeRestrictions(state, settings);

	if (sizeRestrictions.minWidth > 0 && sizeRestrictions.minHeight > 0) {
		if (isGreater(aspectRatio, sizeRestrictions.minWidth / sizeRestrictions.minHeight)) {
			sizeRestrictions.minWidth = sizeRestrictions.minHeight * aspectRatio;
		} else {
			sizeRestrictions.minHeight = sizeRestrictions.minWidth / aspectRatio;
		}
	}

	const viewRatio = isGreater(ratio(visibleArea), ratio(coordinates))
		? visibleArea.height / coordinates.height
		: visibleArea.width / coordinates.width;

	let minSize = isGreater(ratio(visibleArea), sizeRestrictions.minWidth / sizeRestrictions.minHeight)
		? sizeRestrictions.minHeight
		: sizeRestrictions.minWidth;

	if (!adjustStencil || stencilSize) {
		minSize = minSize * viewRatio;
	}

	return minSize;
}

function getMaximumVisibleAreaSize(
	state: InitializedCropperState,
	settings: CropperSettings & {
		imageRestriction?: ImageRestriction;
		adjustStencil?: boolean;
		stencilSize?: StencilSize;
		minWidth?: number;
		minHeight?: number;
	},
) {
	const { imageSize, boundary, coordinates, visibleArea } = state;

	const { imageRestriction, adjustStencil, stencilSize } = settings;

	const aspectRatio = ratio(coordinates);

	const sizeRestrictions = getSizeRestrictions(state, settings);

	if (sizeRestrictions.maxWidth < Infinity && sizeRestrictions.maxHeight < Infinity) {
		if (isGreater(sizeRestrictions.maxWidth / sizeRestrictions.maxHeight, aspectRatio)) {
			sizeRestrictions.maxWidth = sizeRestrictions.maxHeight * aspectRatio;
		} else {
			sizeRestrictions.maxHeight = sizeRestrictions.maxWidth / aspectRatio;
		}
	}

	let maximumVisibleAreaSize = {
		width: Infinity,
		height: Infinity,
	};

	const viewRatio = isGreater(ratio(visibleArea), ratio(coordinates))
		? visibleArea.height / coordinates.height
		: visibleArea.width / coordinates.width;

	if (imageRestriction === 'fillArea') {
		if (isGreater(ratio(imageSize), ratio(boundary))) {
			maximumVisibleAreaSize.height = imageSize.height;
			maximumVisibleAreaSize.width = maximumVisibleAreaSize.height * ratio(boundary);
		} else {
			maximumVisibleAreaSize.width = imageSize.width;
			maximumVisibleAreaSize.height = maximumVisibleAreaSize.width / ratio(boundary);
		}
	} else if (imageRestriction === 'fitArea') {
		if (isGreater(ratio(imageSize), ratio(boundary))) {
			maximumVisibleAreaSize.width = imageSize.width;
			maximumVisibleAreaSize.height = maximumVisibleAreaSize.width / ratio(imageSize);
		} else {
			maximumVisibleAreaSize.height = imageSize.height;
			maximumVisibleAreaSize.width = maximumVisibleAreaSize.height * ratio(imageSize);
		}
	} else {
		if (isGreater(ratio(imageSize), ratio(coordinates))) {
			maximumVisibleAreaSize.height = sizeRestrictions.maxHeight * viewRatio;
			maximumVisibleAreaSize.width = maximumVisibleAreaSize.height * ratio(imageSize);
		} else {
			maximumVisibleAreaSize.width = sizeRestrictions.maxWidth * viewRatio;
			maximumVisibleAreaSize.height = maximumVisibleAreaSize.width / ratio(imageSize);
		}
	}

	let maxSize = isGreater(ratio(visibleArea), sizeRestrictions.maxWidth / sizeRestrictions.maxHeight)
		? sizeRestrictions.maxHeight
		: sizeRestrictions.maxWidth;

	if (!adjustStencil || stencilSize) {
		maxSize = maxSize * viewRatio;
	}

	maxSize = Math.min(
		maxSize,
		isGreater(ratio(visibleArea), ratio(coordinates))
			? maximumVisibleAreaSize.height
			: maximumVisibleAreaSize.width,
	);

	return maxSize;
}

export function getAbsoluteZoom(
	state: InitializedCropperState,
	settings: CropperSettings & {
		imageRestriction?: ImageRestriction;
		adjustStencil?: boolean;
		stencilSize?: StencilSize;
		minWidth?: number;
		minHeight?: number;
	},
) {
	const { coordinates, visibleArea } = state;

	let size = ratio(visibleArea) > ratio(coordinates) ? visibleArea.height : visibleArea.width;

	const minSize = getMinimumVisibleAreaSize(state, settings);
	const maxSize = getMaximumVisibleAreaSize(state, settings);

	// This simple linear formula defines that absolute zoom is equal:
	// - 0 when `size` is equal to `maxSize`
	// - 1 when `size` is equal to `minSize`
	return Math.min(1, Math.max(0, 1 - (size - minSize) / (maxSize - minSize)));
}

export function getVisibleAreaSize(state: InitializedCropperState, settings: CropperSettings, absoluteZoom: number) {
	const minSize = getMinimumVisibleAreaSize(state, settings);
	const maxSize = getMaximumVisibleAreaSize(state, settings);

	return maxSize - absoluteZoom * (maxSize - minSize);
}
