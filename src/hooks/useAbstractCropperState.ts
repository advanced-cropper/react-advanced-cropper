import { useRef, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import {
	CropperSettings,
	PostprocessFunction,
	Priority,
	CropperImage,
	CoordinatesTransform,
	VisibleArea,
	Boundary,
	CropperState,
	Scale,
} from 'advanced-cropper/types';
import { getOptions, isArray, isFunction, isNumber } from 'advanced-cropper/utils';
import { TransformImageEvent, MoveEvent, ResizeEvent } from 'advanced-cropper/events';
import {
	copyState,
	createState,
	CreateStateAlgorithm,
	flipImage,
	FlipImageAlgorithm,
	moveCoordinates,
	MoveAlgorithm,
	reconcileState,
	resizeCoordinates,
	ResizeAlgorithm,
	rotateImage,
	RotateImageAlgorithm,
	setBoundary,
	SetBoundaryAlgorithm,
	setCoordinates,
	SetCoordinatesAlgorithm,
	setVisibleArea,
	SetVisibleAreaAlgorithm,
	transformImage,
	TransformImageAlgorithm,
	ReconcileStateAlgorithm,
} from 'advanced-cropper/state';
import {
	normalizeMoveEvent,
	normalizeResizeEvent,
	normalizeTransformImageEvent,
	roundCoordinates,
	isEqualStates,
} from 'advanced-cropper/service';
import { TransitionsSettings } from '../types';
import { useCropperState } from './useCropperState';
import { useStateWithCallback } from './useStateWithCallback';

export interface CropperMethodOptions {
	transitions?: boolean;
}

export interface AbstractCropperStateCallbacks<Instance = unknown> {
	getInstance?: () => Instance;
	onTransitionsStart?: (cropper: Instance) => void;
	onTransitionsEnd?: (cropper: Instance) => void;
	onChange?: (cropper: Instance) => void;
	onResizeEnd?: (cropper: Instance) => void;
	onMoveEnd?: (cropper: Instance) => void;
	onMove?: (cropper: Instance) => void;
	onResize?: (cropper: Instance) => void;
	onTransformImage?: (cropper: Instance) => void;
	onTransformImageEnd?: (cropper: Instance) => void;
	onInteractionStart?: (cropper: Instance) => void;
	onInteractionEnd?: (cropper: Instance) => void;
}

export interface AbstractCropperStateSettings<Cropper = unknown> {
	transitions?: TransitionsSettings | boolean;
	postProcess?: PostprocessFunction | PostprocessFunction[];
	setCoordinatesAlgorithm?: SetCoordinatesAlgorithm;
	setVisibleAreaAlgorithm?: SetVisibleAreaAlgorithm;
	setBoundaryAlgorithm?: SetBoundaryAlgorithm;
	transformImageAlgorithm?: TransformImageAlgorithm;
	resizeCoordinatesAlgorithm?: ResizeAlgorithm;
	createStateAlgorithm?: CreateStateAlgorithm;
	moveCoordinatesAlgorithm?: MoveAlgorithm;
	flipImageAlgorithm?: FlipImageAlgorithm;
	rotateImageAlgorithm?: RotateImageAlgorithm;
	reconcileStateAlgorithm?: ReconcileStateAlgorithm;
	zoomImageAlgorithm?: (
		state: CropperState,
		settings: CropperSettings,
		scale: Partial<Scale> | number,
	) => CropperState;
	moveImageAlgorithm?: (state: CropperState, settings: CropperSettings, left?: number, top?: number) => CropperState;
	priority?: Priority;
}

type StateModifier = (state: CropperState, settings: CropperSettings) => CropperState;

export type PostprocessAction =
	| 'create'
	| 'reconcile'
	| 'resize'
	| 'resizeEnd'
	| 'move'
	| 'moveEnd'
	| 'transformImage'
	| 'transformImageEnd'
	| 'interactionEnd'
	| 'flip'
	| 'rotate'
	| 'zoom'
	| 'setBoundary'
	| 'setVisibleArea'
	| 'setCoordinates';

function runCallback<Instance>(callback?: (instance: Instance) => void, getInstance?: () => Instance) {
	if (callback && getInstance) {
		const instance = getInstance();
		if (instance) {
			callback(instance);
		}
	}
}

function createCallback<Instance>(callback?: (instance: Instance) => void, getInstance?: () => Instance) {
	return () => {
		runCallback(callback, getInstance);
	};
}

export function useAbstractCropperState<
	Settings extends AbstractCropperStateSettings & CropperSettings,
	Instance = unknown,
>({
	getInstance,
	transitions,
	postProcess,
	setCoordinatesAlgorithm,
	setVisibleAreaAlgorithm,
	setBoundaryAlgorithm,
	transformImageAlgorithm,
	resizeCoordinatesAlgorithm,
	createStateAlgorithm,
	moveCoordinatesAlgorithm,
	flipImageAlgorithm,
	rotateImageAlgorithm,
	reconcileStateAlgorithm,
	priority,
	onTransitionsStart,
	onTransitionsEnd,
	onResizeEnd,
	onMoveEnd,
	onMove,
	onResize,
	onChange,
	onTransformImage,
	onTransformImageEnd,
	onInteractionStart,
	onInteractionEnd,
	...settings
}: Settings & AbstractCropperStateCallbacks<Instance>) {
	const [state, setState] = useStateWithCallback<CropperState>(null);

	const [transitionsActive, setTransitionsActive] = useStateWithCallback(false);

	const transitionsOptions = useMemo<{ timingFunction: string; duration: number; active: boolean }>(
		() => ({
			...getOptions(transitions, {
				timingFunction: 'ease-in-out',
				duration: 350,
			}),
			active: transitionsActive,
		}),
		[transitionsActive, transitions],
	);

	const enableTransitions = () => {
		setTransitionsActive(true, createCallback(onTransitionsStart, getInstance));
	};

	const disableTransitions = () => {
		setTransitionsActive(false, createCallback(onTransitionsEnd, getInstance));
	};

	const debouncedDisableTransitions = useDebouncedCallback(disableTransitions, transitionsOptions.duration);

	const applyPostProcess = (action: PostprocessAction, state: CropperState) => {
		if (isArray(postProcess)) {
			return postProcess.reduce((processedState, p) => p(processedState, settings, action), state);
		} else if (isFunction(postProcess)) {
			return postProcess(state, settings, action);
		} else {
			return state;
		}
	};

	const updateState = (modifier: StateModifier | CropperState, options: CropperMethodOptions = {}) => {
		const { transitions = false } = options;
		// TODO: check, that's the best approach
		setState((state) => {
			const newState = isFunction(modifier) ? modifier(state, settings) : modifier;
			if (!isEqualStates(state, newState)) {
				if (transitions) {
					enableTransitions();
					debouncedDisableTransitions();
				}
				return newState;
			} else {
				return state;
			}
		}, createCallback(onChange, getInstance));
	};

	const actions = useRef({
		move: false,
		resize: false,
		transformImage: false,
	});

	const startAction = (action: keyof typeof actions.current) => {
		if (!actions.current.move && !actions.current.resize && !actions.current.transformImage) {
			runCallback(onInteractionStart, getInstance);
		}
		actions.current[action] = true;
	};

	const endAction = (action: keyof typeof actions.current) => {
		actions.current[action] = false;
		if (!actions.current.move && !actions.current.resize && !actions.current.transformImage) {
			runCallback(onInteractionEnd, getInstance);
			updateState(() => state && applyPostProcess('interactionEnd', state), {
				transitions: true,
			});
		}
	};

	const resetState = (boundary: Boundary, image: CropperImage) => {
		if (boundary) {
			updateState(
				applyPostProcess(
					'create',
					(createStateAlgorithm || createState)(
						{
							boundary,
							imageSize: { width: image.width, height: image.height },
							transforms: image.transforms,
							priority,
						},
						settings,
					),
				),
			);
		} else {
			updateState(null);
		}
	};

	return {
		state,
		transitions: transitionsOptions,
		reconcileState: () => {
			updateState(
				state && applyPostProcess('reconcile', (reconcileStateAlgorithm || reconcileState)(state, settings)),
			);
		},
		clear: () => {
			setState(null);
		},
		flip: (horizontal?: boolean, vertical?: boolean, options: CropperMethodOptions = {}) => {
			const { transitions = true } = options;

			updateState(
				() =>
					state &&
					applyPostProcess('flip', (flipImageAlgorithm || flipImage)(state, settings, horizontal, vertical)),
				{
					transitions: transitions,
				},
			);
		},
		rotate: (angle: number, options: CropperMethodOptions = {}) => {
			const { transitions = true } = options;

			updateState(
				() =>
					state && applyPostProcess('rotate', (rotateImageAlgorithm || rotateImage)(state, settings, angle)),
				{
					transitions: transitions,
				},
			);
		},
		zoom: (scale: Scale | number, options: CropperMethodOptions = {}) => {
			const { transitions = true } = options;

			updateState(
				() =>
					state &&
					applyPostProcess(
						'zoom',
						(transformImageAlgorithm || transformImage)(
							state,
							settings,
							{},
							isNumber(scale)
								? {
										factor: scale,
								  }
								: scale,
						),
					),
				{
					transitions: transitions,
				},
			);
		},
		reset: (boundary: Boundary, image: CropperImage) => {
			resetState(boundary, image);
		},
		setState: (newState: Partial<CropperState>, options: CropperMethodOptions = {}) => {
			const { transitions = true } = options;
			updateState(() => state && { ...state, ...newState }, {
				transitions,
			});
		},
		setCoordinates: (
			transforms: CoordinatesTransform | CoordinatesTransform[],
			options: CropperMethodOptions = {},
		) => {
			const { transitions = true } = options;
			updateState(
				() =>
					state &&
					applyPostProcess(
						'setCoordinates',
						(setCoordinatesAlgorithm || setCoordinates)(state, settings, transforms, false),
					),
				{
					transitions,
				},
			);
		},
		setVisibleArea: (visibleArea: VisibleArea, options: CropperMethodOptions = {}) => {
			const { transitions = true } = options;
			updateState(
				() =>
					state &&
					applyPostProcess(
						'setVisibleArea',
						(setVisibleAreaAlgorithm || setVisibleArea)(state, settings, visibleArea),
					),
				{
					transitions,
				},
			);
		},
		setBoundary: (boundary: Boundary) => {
			if (boundary) {
				updateState(
					() =>
						state &&
						applyPostProcess(
							'setBoundary',
							(setBoundaryAlgorithm || setBoundary)(state, settings, boundary),
						),
				);
			} else {
				updateState(null);
			}
		},
		onResizeEnd: () => {
			updateState(() => state && applyPostProcess('resizeEnd', state), {
				transitions: true,
			});
			endAction('resize');
			runCallback(onResizeEnd, getInstance);
		},
		onMoveEnd: () => {
			updateState(() => state && applyPostProcess('moveEnd', state), {
				transitions: true,
			});
			endAction('move');
			runCallback(onMoveEnd, getInstance);
		},
		onMove: (event: MoveEvent) => {
			if (!transitionsActive && state) {
				const { directions } = normalizeMoveEvent(state, event);
				updateState(() =>
					applyPostProcess(
						'move',
						(moveCoordinatesAlgorithm || moveCoordinates)(state, settings, directions),
					),
				);
				startAction('move');
				runCallback(onMove, getInstance);
			}
		},
		onResize: (event: ResizeEvent) => {
			if (!transitionsOptions.active && state) {
				const { directions, options } = normalizeResizeEvent(state, event);
				updateState(() =>
					applyPostProcess(
						'resize',
						(resizeCoordinatesAlgorithm || resizeCoordinates)(state, settings, directions, options),
					),
				);
				startAction('resize');
				runCallback(onResize, getInstance);
			}
		},
		onTransformImage: (event: TransformImageEvent) => {
			if (!transitionsOptions.active && state) {
				const { scale, move } = normalizeTransformImageEvent(state, event);

				updateState(
					() =>
						applyPostProcess(
							'transformImage',
							(transformImageAlgorithm || transformImage)(state, settings, move, scale),
						),
					{
						transitions: false,
					},
				);
				startAction('transformImage');
				runCallback(onTransformImage, getInstance);
			}
		},
		onTransformImageEnd: () => {
			updateState(() => state && applyPostProcess('transformImageEnd', state), {
				transitions: true,
			});
			endAction('transformImage');
			runCallback(onTransformImageEnd, getInstance);
		},
		move: (left: number, top?: number, options: CropperMethodOptions = {}) => {
			const { transitions = true } = options;

			updateState(
				() =>
					state &&
					applyPostProcess(
						'move',
						(transformImageAlgorithm || transformImage)(state, settings, {
							left,
							top,
						}),
					),
				{
					transitions: transitions,
				},
			);
		},
		getCoordinates(options: { round?: boolean } = {}) {
			const { round = true } = options;
			if (round) {
				return roundCoordinates(state, settings);
			} else {
				return { ...state.coordinates };
			}
		},
		getVisibleArea() {
			return { ...state.visibleArea };
		},
		getSettings() {
			return { ...settings };
		},
		getState() {
			return state && copyState(state);
		},
		getTransitions() {
			return {
				...transitionsOptions,
			};
		},
		getTransforms() {
			return state
				? {
						...state.transforms,
						flip: {
							...state.transforms.flip,
						},
				  }
				: {
						rotate: 0,
						flip: {
							horizontal: false,
							vertical: false,
						},
				  };
		},
	};
}

export type AbstractCropperStateHook = ReturnType<typeof useCropperState>;
