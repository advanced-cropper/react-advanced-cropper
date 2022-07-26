import {
	applyMove,
	applyScale,
	diff,
	fitToSizeRestrictions,
	getAreaPositionRestrictions,
	getAreaSizeRestrictions,
	getCenter,
	getPositionRestrictions,
	isInitializedState,
	mergePositionRestrictions,
	moveToPositionRestrictions,
	ratio,
	coordinatesToPositionRestrictions,
} from 'advanced-cropper/service';
import { CoreSettings, CropperState, PostprocessAction, Size } from 'advanced-cropper';
import { copyState } from 'advanced-cropper/state';

export function hybridStencilAutoZoomAlgorithm(state: CropperState, settings: CoreSettings): CropperState {
	if (isInitializedState(state)) {
		const result = copyState(state);

		// Checks that coordinates has the same ratio that coordinates:
		const stencil: Size = {
			width: 0,
			height: 0,
		};

		if (ratio(result.boundary) > ratio(result.coordinates)) {
			stencil.height = result.boundary.height * 0.8;
			stencil.width = stencil.height * ratio(result.coordinates);
		} else {
			stencil.width = result.boundary.width * 0.8;
			stencil.height = stencil.width * ratio(result.coordinates);
		}

		// First of all try to resize visible area as much as possible:
		result.visibleArea = applyScale(
			result.visibleArea,
			(result.coordinates.width * result.boundary.width) / (result.visibleArea.width * stencil.width),
		);

		// Check that visible area doesn't break the area restrictions:
		const scale = fitToSizeRestrictions(result.visibleArea, getAreaSizeRestrictions(result, settings));

		result.visibleArea = applyScale(result.visibleArea, scale);

		if (scale !== 1) {
			stencil.height /= scale;
			stencil.width /= scale;
		}

		result.visibleArea = applyMove(
			result.visibleArea,
			diff(getCenter(result.coordinates), getCenter(result.visibleArea)),
		);

		// Center stencil in visible area:
		result.visibleArea = moveToPositionRestrictions(
			result.visibleArea,
			getAreaPositionRestrictions(result, settings),
		);

		result.coordinates = moveToPositionRestrictions(
			result.coordinates,
			mergePositionRestrictions(
				coordinatesToPositionRestrictions(result.visibleArea),
				getPositionRestrictions(result, settings),
			),
		);

		return result;
	}
	return state;
}

export function hybridStencilAutoZoom(
	state: CropperState,
	settings: CoreSettings,
	action: PostprocessAction,
): CropperState {
	if (action.immediately) {
		return hybridStencilAutoZoomAlgorithm(state, settings);
	}
	return state;
}
