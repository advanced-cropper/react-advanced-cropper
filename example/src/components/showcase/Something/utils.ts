import {
	copyState,
	CoreSettings,
	CropperState,
	CropperTransitions,
	getAreaPositionRestrictions,
	getAreaSizeRestrictions,
	getStyleTransforms,
	getTransformedImageSize,
	isInitializedState,
	moveToPositionRestrictions,
	ratio,
	rotatePoint,
	rotateSize,
	CropperImage,
} from 'advanced-cropper';
import { CropMode } from '@site/src/components/showcase/Something/types';

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

export function getStyles(
	image: CropperImage | null,
	state: CropperState | null,
	transitions: CropperTransitions | null = null,
	mode: CropMode,
) {
	if (image && isInitializedState(state)) {
		const actualImageSize = getTransformedImageSize(state);

		const area = mode === CropMode.preview ? state.coordinates : state.visibleArea;

		let coefficient = area.width / state.boundary.width;
		let contentBox;
		if (mode !== CropMode.preview) {
			const imageBox = {
				left: -area.left,
				right: -area.left + actualImageSize.width,
				top: -area.top,
				bottom: -area.top + actualImageSize.height,
			};

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
		} else {
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
		}

		if (mode === CropMode.preview) {
			coefficient = state.coordinates.width / contentBox.width;
		}

		const contentCoordinates = {
			...rotateSize(contentBox, state.transforms.rotate),
			left: state.boundary.width / 2 - contentBox.width / 2,
			top: state.boundary.height / 2 - contentBox.height / 2,
		};

		const contentTransforms = {
			rotate: state.transforms.rotate,
			flip: {
				horizontal: state.transforms.flip.horizontal,
				vertical: state.transforms.flip.vertical,
			},
		};

		const contentCompensations = {
			rotate: {
				left: -(contentBox.width - contentCoordinates.width) / 2,
				top: -(contentBox.height - contentCoordinates.height) / 2,
			},
		};

		const backgroundShift = rotatePoint(
			{
				left: area.left / coefficient,
				top: area.top / coefficient,
			},
			state.transforms.rotate,
		);

		// Rewrite it.
		if (state.transforms.rotate % 360 === 90) {
			backgroundShift.left *= -1;
			backgroundShift.top = image.height / coefficient - contentCoordinates.height - backgroundShift.top;
		} else if (state.transforms.rotate % 360 === 180) {
			backgroundShift.left = image.width / coefficient - contentCoordinates.width + backgroundShift.left;
			backgroundShift.top = image.height / coefficient - contentCoordinates.height + backgroundShift.top;
		} else if (state.transforms.rotate % 360 === 270) {
			backgroundShift.left = image.width / coefficient - contentCoordinates.width - backgroundShift.left;
			backgroundShift.top *= -1;
		} else if (state.transforms.rotate % 360 === -90) {
			backgroundShift.left = image.width / coefficient - contentCoordinates.width - backgroundShift.left;
			backgroundShift.top *= -1;
		} else if (state.transforms.rotate % 360 === -180) {
			backgroundShift.left = image.width / coefficient - contentCoordinates.width + backgroundShift.left;
			backgroundShift.top = image.height / coefficient - contentCoordinates.height + backgroundShift.top;
		} else if (state.transforms.rotate % 360 === -270) {
			backgroundShift.left *= -1;
			backgroundShift.top = image.height / coefficient - contentCoordinates.height - backgroundShift.top;
		}

		const contentStyle = {
			background: `url(${image.src})`,
			backgroundSize: `${image.width / coefficient}px ${image.height / coefficient}px`,
			backgroundPosition: `${Math.max(
				-(rotateSize(image, 0).width / coefficient - rotateSize(contentCoordinates, 0).width),
				Math.min(0, -backgroundShift.left),
			)}px ${Math.max(
				-(rotateSize(image, 0).height / coefficient - rotateSize(contentCoordinates, 0).height),
				Math.min(0, -backgroundShift.top),
			)}px`,
			backgroundRepeat: 'no-repeat',
			width: `${contentCoordinates.width}px`,
			height: `${contentCoordinates.height}px`,
			left: `${contentCoordinates.left}px`,
			top: `${contentCoordinates.top}px`,
			transition: 'none',
			willChange: 'none',
			transform:
				`translate3d(${-contentCompensations.rotate.left}px, ${-contentCompensations.rotate.top}px, 0px)` +
				getStyleTransforms({
					...contentTransforms,
					scale: 1,
				}),
		};

		const imageWrapperStyle = {
			width: `${rotateSize(contentCoordinates, -contentTransforms.rotate).width}px`,
			height: `${rotateSize(contentCoordinates, -contentTransforms.rotate).height}px`,
			transition: 'none',
			willChange: 'none',
			transform:
				`translate3d(${contentCompensations.rotate.left}px, ${contentCompensations.rotate.top}px, 0px)` +
				getStyleTransforms({
					...contentTransforms,
					rotate: -contentTransforms.rotate,
					scale: 1,
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
			stencilCoordinates,
			imageWrapperStyle,
		};
	}
	return { contentStyle: {}, internalsStyle: {} };
}
