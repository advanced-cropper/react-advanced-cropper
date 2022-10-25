import {
	CoreSettings,
	CropperImage,
	CropperState,
	CropperTransitions,
	ImageTransform,
	Rotate,
	applyMove,
	approximateSize,
	copyState,
	diff,
	getAreaPositionRestrictions,
	getAreaSizeRestrictions,
	getAspectRatio,
	getCenter,
	getPositionRestrictions,
	getSizeRestrictions,
	getStyleTransforms,
	getTransformedImageSize,
	isInitializedState,
	isNumber,
	mergeSizeRestrictions,
	moveToPositionRestrictions,
	ratio,
	resizeToSizeRestrictions,
	rotatePoint,
	rotateSize,
	transformImage as originalTransformImage,
} from 'advanced-cropper';
import { CropMode } from './types';

export function transformImageAlgorithm(state: CropperState, settings: CoreSettings, transform: ImageTransform) {
	const { flip, rotate, scale, move } = transform;

	return originalTransformImage(rotate ? rotateImageAlgorithm(state, settings, rotate) : state, settings, {
		flip,
		move,
		scale,
	});
}

export function rotateImageAlgorithm(state: CropperState, settings: CoreSettings, rotate: number | Rotate) {
	if (isInitializedState(state)) {
		const result = copyState(state);

		const angle = isNumber(rotate) ? rotate : rotate.angle;

		const imageCenter = rotatePoint(
			getCenter({
				left: 0,
				top: 0,
				...getTransformedImageSize(state),
			}),
			angle,
		);

		// Rotate the image
		result.transforms.rotate += angle;

		// Get the coordinates
		result.coordinates = {
			...approximateSize({
				sizeRestrictions: getSizeRestrictions(result, settings),
				aspectRatio: getAspectRatio(result, settings),
				...rotateSize(result.coordinates, angle),
			}),
			...rotatePoint(getCenter(result.coordinates), angle),
		};

		// Move the coordinates to preserve theirs original center position
		const center = !isNumber(rotate) && rotate.center ? rotate.center : getCenter(state.coordinates);
		const shift = diff(getCenter(state.coordinates), rotatePoint(getCenter(state.coordinates), angle, center));
		const imageSize = getTransformedImageSize(result);
		result.coordinates.left -= imageCenter.left - imageSize.width / 2 + result.coordinates.width / 2 - shift.left;
		result.coordinates.top -= imageCenter.top - imageSize.height / 2 + result.coordinates.height / 2 - shift.top;

		// Check that visible area doesn't break the area restrictions:
		result.visibleArea = resizeToSizeRestrictions(
			result.visibleArea,
			mergeSizeRestrictions(getAreaSizeRestrictions(result, settings), {
				minWidth: result.coordinates.width,
				minHeight: result.coordinates.height,
			}),
		);

		// Check that positions restrictions were not broken
		result.coordinates = moveToPositionRestrictions(result.coordinates, getPositionRestrictions(result, settings));

		// Move the visible area to preserve its position relative to the coordinates
		result.visibleArea = applyMove(
			result.visibleArea,
			diff(getCenter(result.coordinates), getCenter(state.coordinates)),
		);
		result.visibleArea = moveToPositionRestrictions(
			result.visibleArea,
			getAreaPositionRestrictions(result, settings),
		);
		return result;
	}
	return state;
}

export function fullSize(state: CropperState, settings: CoreSettings): CropperState {
	if (isInitializedState(state)) {
		const result = copyState(state);

		const imageSize = getTransformedImageSize(state);

		const restrictionsSize = getAreaSizeRestrictions(state, settings);

		const visibleAreaSize = {
			width: Math.max(Math.min(imageSize.width, restrictionsSize.maxWidth), restrictionsSize.minWidth),
			height: Math.max(Math.min(imageSize.height, restrictionsSize.maxHeight), restrictionsSize.minHeight),
		};

		if (ratio(result.boundary) > ratio(imageSize)) {
			result.visibleArea.height = visibleAreaSize.height;
			result.visibleArea.width = visibleAreaSize.height * ratio(result.boundary);
		} else {
			result.visibleArea.width = visibleAreaSize.width;
			result.visibleArea.height = visibleAreaSize.width / ratio(result.boundary);
		}

		return {
			...result,
			visibleArea: moveToPositionRestrictions(result.visibleArea, getAreaPositionRestrictions(result, settings)),
			coordinates: {
				...imageSize,
				left: 0,
				top: 0,
			},
		};
	}

	return state;
}

export function getProperties(
	image: CropperImage | null,
	state: CropperState | null,
	transitions: CropperTransitions | null = null,
	mode: CropMode,
) {
	if (image && isInitializedState(state)) {
		const actualImageSize = getTransformedImageSize(state);

		const area = mode === CropMode.preview ? state.coordinates : state.visibleArea;

		//  Calculate the size of the displayed box (the box with rounded corners). It's not equal to boundary in general case.
		let contentBox, coefficient;
		if (mode === CropMode.preview) {
			if (ratio(state.coordinates) > ratio(state.boundary)) {
				contentBox = {
					width: state.boundary.width,
					height: state.boundary.width / ratio(state.coordinates),
				};
			} else {
				contentBox = {
					height: state.boundary.height,
					width: state.boundary.height * ratio(state.coordinates),
				};
			}
			coefficient = state.coordinates.width / contentBox.width;
		} else {
			const imageBox = {
				left: -area.left,
				right: -area.left + actualImageSize.width,
				top: -area.top,
				bottom: -area.top + actualImageSize.height,
			};

			coefficient = area.width / state.boundary.width;

			contentBox = {
				width:
					(Math.min(state.boundary.width * coefficient, Math.max(0, imageBox.right)) -
						Math.max(0, Math.min(state.boundary.width * coefficient, imageBox.left))) /
					coefficient,
				height:
					(Math.min(state.boundary.height * coefficient, Math.max(0, imageBox.bottom)) -
						Math.max(0, Math.min(state.boundary.height * coefficient, imageBox.top))) /
					coefficient,
			};
		}

		// The box should be centered in the boundary:
		const contentCoordinates = {
			...rotateSize(contentBox, state.transforms.rotate),
			left: state.boundary.width / 2 - contentBox.width / 2,
			top: state.boundary.height / 2 - contentBox.height / 2,
		};

		// The box is rotated around its corner, so this rotation should be compensated to rotate box around its center
		const contentCompensations = {
			rotate: {
				left: -(contentBox.width - contentCoordinates.width) / 2,
				top: -(contentBox.height - contentCoordinates.height) / 2,
			},
		};

		// These calculations are needed because background shift is calculated after rotation;
		const backgroundShift = rotatePoint(
			{
				left: area.left / coefficient,
				top: area.top / coefficient,
			},
			state.transforms.rotate,
		);
		if (state.transforms.rotate % 360 === 90 || state.transforms.rotate % 360 === 90 - 360) {
			backgroundShift.left *= -1;
			backgroundShift.top = image.height / coefficient - contentCoordinates.height - backgroundShift.top;
		} else if (state.transforms.rotate % 360 === 180 || state.transforms.rotate % 360 === 180 - 360) {
			backgroundShift.left = image.width / coefficient - contentCoordinates.width + backgroundShift.left;
			backgroundShift.top = image.height / coefficient - contentCoordinates.height + backgroundShift.top;
		} else if (state.transforms.rotate % 360 === 270 || state.transforms.rotate % 360 === 270 - 360) {
			backgroundShift.left = image.width / coefficient - contentCoordinates.width - backgroundShift.left;
			backgroundShift.top *= -1;
		}

		const contentStyle = {
			background: `url(${image.src})`,
			backgroundSize: `${image.width / coefficient}px ${image.height / coefficient}px`,
			// Background image should not leave the box
			backgroundPosition: `${Math.max(
				contentCoordinates.width - image.width / coefficient,
				Math.min(0, -backgroundShift.left),
			)}px ${Math.max(
				contentCoordinates.height - image.height / coefficient,
				Math.min(0, -backgroundShift.top),
			)}px`,
			width: `${contentCoordinates.width}px`,
			height: `${contentCoordinates.height}px`,
			left: `${contentCoordinates.left}px`,
			top: `${contentCoordinates.top}px`,
			transition: 'none',
			willChange: 'none',
			transform:
				`translate3d(${-contentCompensations.rotate.left}px, ${-contentCompensations.rotate.top}px, 0px)` +
				getStyleTransforms(state.transforms),
		};

		const imageWrapperStyle = {
			width: `${contentBox.width}px`,
			height: `${contentBox.height}px`,
			transition: 'none',
			willChange: 'none',
			transform:
				`translate3d(${contentCompensations.rotate.left}px, ${contentCompensations.rotate.top}px, 0px)` +
				getStyleTransforms({
					...state.transforms,
					rotate: -state.transforms.rotate,
				}),
		};

		const stencilCoordinates =
			mode === CropMode.preview
				? {
						...contentBox,
						left: 0,
						top: 0,
				  }
				: {
						width: state.coordinates.width / coefficient,
						height: state.coordinates.height / coefficient,
						left: (state.coordinates.left - state.visibleArea.left) / coefficient - contentCoordinates.left,
						top: (state.coordinates.top - state.visibleArea.top) / coefficient - contentCoordinates.top,
				  };

		if (transitions && transitions.active) {
			contentStyle.willChange = imageWrapperStyle.willChange = 'transform';
			contentStyle.transition =
				imageWrapperStyle.transition = `${transitions.duration}ms ${transitions.timingFunction}`;
		}

		return {
			contentStyle,
			imageWrapperStyle,
			stencilCoordinates,
		};
	}
	return { contentStyle: {}, internalsStyle: {}, stencilCoordinates: { left: 0, top: 0, width: 0, height: 0 } };
}
