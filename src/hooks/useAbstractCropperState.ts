import { useRef, useMemo } from 'react';
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
	MoveDirections,
	ImageTransform,
	ResizeDirections,
	Rotate,
	PostprocessAction,
	PartialTransforms,
} from 'advanced-cropper/types';
import { emptyCoordinates, getOptions, isArray, isFunction } from 'advanced-cropper/utils';

import {
	copyState,
	createState,
	CreateStateAlgorithm,
	moveCoordinates,
	MoveAlgorithm,
	reconcileState,
	resizeCoordinates,
	ResizeAlgorithm,
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
	roundCoordinates,
	isEqualStates,
	normalizeImageTransform,
	normalizeMoveDirections,
	normalizeResizeDirections,
	getStencilCoordinates,
	fillMoveDirections,
	fillResizeDirections,
} from 'advanced-cropper/service';
import { DefaultTransforms, TransitionsSettings } from '../types';
import { useCropperState } from './useCropperState';
import { useStateWithCallback } from './useStateWithCallback';
import { useDebouncedCallback } from './useDebouncedCallback';

export interface CropperMethodOptions {
	transitions?: boolean;
	immediately?: boolean;
	normalize?: boolean;
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
	moveCoordinatesAlgorithm?: MoveAlgorithm;
	resizeCoordinatesAlgorithm?: ResizeAlgorithm;
	createStateAlgorithm?: CreateStateAlgorithm;
	reconcileStateAlgorithm?: ReconcileStateAlgorithm;
	moveImageAlgorithm?: (state: CropperState, settings: CropperSettings, left?: number, top?: number) => CropperState;
	defaultTransforms?: DefaultTransforms;
	priority?: Priority;
}

type StateModifier = (state: CropperState | null, settings: CropperSettings) => CropperState | null;

type Callback<Instance> = (instance: Instance) => void;

export interface TransitionOptions {
	transitions?: boolean;
}

export interface ImmediatelyOptions {
	immediately?: boolean;
}

export interface NormalizeOptions {
	normalize?: boolean;
}

function runCallback<Instance>(callback?: (instance: Instance) => void, getInstance?: () => Instance) {
	if (callback && getInstance) {
		const instance = getInstance();
		if (instance) {
			callback(instance);
		}
	}
}

function createCallback<Instance>(callback?: Callback<Instance>, getInstance?: () => Instance) {
	return () => {
		runCallback(callback, getInstance);
	};
}

function mergeCallbacks<Instance>(callbacks: Function[]) {
	return () => {
		callbacks.forEach((callback) => {
			callback();
		});
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
	defaultTransforms,
	...settings
}: Settings & AbstractCropperStateCallbacks<Instance>) {
	const [state, setState] = useStateWithCallback<CropperState | null>(null);

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

	const updateState = (
		modifier: StateModifier | CropperState | null,
		options: CropperMethodOptions = {},
		callbacks: (Callback<Instance> | undefined)[] = [],
	) => {
		const { transitions = false } = options;
		// TODO: check, that's the best approach
		setState((state) => {
			const newState = isFunction(modifier) ? modifier(state, settings) : modifier;
			if (!isEqualStates(state, newState)) {
				if (transitions) {
					enableTransitions();
					debouncedDisableTransitions();
				}
				return copyState(newState);
			} else {
				return copyState(state);
			}
		}, mergeCallbacks([createCallback(onChange, getInstance), ...callbacks.map((callback) => createCallback(callback, getInstance))]));
	};

	const actions = useRef({
		moveCoordinates: false,
		resizeCoordinates: false,
		transformImage: false,
	});

	const startAction = (action: keyof typeof actions.current) => {
		if (!actions.current.moveCoordinates && !actions.current.resizeCoordinates && !actions.current.transformImage) {
			runCallback(onInteractionStart, getInstance);
		}
		actions.current[action] = true;
	};

	const endAction = (action: keyof typeof actions.current) => {
		actions.current[action] = false;
		if (!actions.current.moveCoordinates && !actions.current.resizeCoordinates && !actions.current.transformImage) {
			updateState(
				() =>
					state &&
					applyPostProcess(
						{
							name: 'interactionEnd',
							immediately: true,
							transitions: true,
						},
						state,
					),
				{
					transitions: true,
				},
				[onInteractionEnd],
			);
		}
	};

	const resetState = (boundary: Boundary, image: CropperImage) => {
		let transforms: PartialTransforms = image.transforms;
		if (defaultTransforms) {
			transforms = isFunction(defaultTransforms) ? defaultTransforms(image) : defaultTransforms;
		}

		updateState(
			applyPostProcess(
				{
					name: 'create',
					immediately: true,
					transitions: false,
				},
				(createStateAlgorithm || createState)(
					{
						boundary,
						imageSize: { width: image.width, height: image.height },
						transforms,
						priority,
					},
					settings,
				),
			),
		);
	};

	const cropper = {
		state,
		transitions: transitionsOptions,
		clear: () => {
			updateState(null);
		},
		reconcileState: () => {
			updateState(
				state &&
					applyPostProcess(
						{
							name: 'reconcile',
							immediately: true,
							transitions: false,
						},
						(reconcileStateAlgorithm || reconcileState)(state, settings),
					),
			);
		},
		transformImage: (
			transform: ImageTransform,
			options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {},
		) => {
			const { transitions = true, immediately = false, normalize = true } = options;

			const callbacks = [];

			if (state) {
				if (normalize) {
					transform = normalizeImageTransform(state, transform);
				}

				let result = applyPostProcess(
					{
						name: 'transformImage',
						transitions,
						immediately,
					},
					(transformImageAlgorithm || transformImage)(state, settings, transform),
				);
				callbacks.push(onTransformImage);

				if (immediately) {
					result = applyPostProcess(
						{
							name: 'transformImageEnd',
							transitions,
							immediately,
						},
						result,
					);
					callbacks.push(onTransformImageEnd);
				} else {
					startAction('transformImage');
				}

				updateState(
					result,
					{
						transitions: immediately && transitions,
					},
					callbacks,
				);
			}
		},
		transformImageEnd: (options: ImmediatelyOptions & TransitionOptions = {}) => {
			const { immediately = false, transitions = true } = options;
			updateState(
				() => state && applyPostProcess({ name: 'transformImageEnd', immediately, transitions }, state),
				{
					transitions,
				},
				[onTransformImageEnd],
			);
			endAction('transformImage');
		},
		zoomImage: (scale: Scale | number, options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {}) => {
			const { immediately = true, transitions = true, normalize = false } = options;

			cropper.transformImage(
				{
					scale,
				},
				{ immediately, transitions, normalize },
			);
		},
		moveImage: (
			left: number,
			top?: number,
			options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {},
		) => {
			const { immediately = true, transitions = true, normalize = false } = options;

			cropper.transformImage(
				{
					move: {
						left,
						top,
					},
				},
				{ immediately, transitions, normalize },
			);
		},
		flipImage: (
			horizontal?: boolean,
			vertical?: boolean,
			options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {},
		) => {
			const { immediately = true, transitions = true } = options;

			cropper.transformImage(
				{
					flip: {
						horizontal,
						vertical,
					},
				},
				{ immediately, transitions },
			);
		},
		rotateImage: (
			rotate: number | Rotate,
			options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {},
		) => {
			const { immediately = true, transitions = true, normalize = false } = options;
			cropper.transformImage(
				{
					rotate,
				},
				{ immediately, transitions, normalize },
			);
		},
		reset: (boundary: Boundary, image: CropperImage) => {
			resetState(boundary, image);
		},
		setState: (newState: Partial<CropperState>, options: TransitionOptions = {}) => {
			const { transitions = true } = options;
			updateState(() => state && { ...state, ...newState }, {
				transitions,
			});
		},
		setCoordinates: (
			transforms: CoordinatesTransform | CoordinatesTransform[],
			options: TransitionOptions = {},
		) => {
			const { transitions = true } = options;
			updateState(
				() =>
					state &&
					applyPostProcess(
						{
							name: 'setCoordinates',
							immediately: true,
							transitions,
						},
						(setCoordinatesAlgorithm || setCoordinates)(state, settings, transforms, false),
					),
				{
					transitions,
				},
			);
		},
		setVisibleArea: (visibleArea: VisibleArea, options: TransitionOptions = {}) => {
			const { transitions = true } = options;
			updateState(
				() =>
					state &&
					applyPostProcess(
						{ name: 'setVisibleArea', immediately: true, transitions },
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
							{ name: 'setBoundary', immediately: true, transitions: false },
							(setBoundaryAlgorithm || setBoundary)(state, settings, boundary),
						),
				);
			} else {
				updateState(null);
			}
		},
		moveCoordinates: (
			directions: Partial<MoveDirections>,
			options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {},
		) => {
			const { transitions = false, immediately = false, normalize = true } = options;

			const callbacks = [];

			if (!transitionsActive && state) {
				const normalizedDirections = normalize
					? normalizeMoveDirections(state, directions)
					: fillMoveDirections(directions);

				let result = applyPostProcess(
					{ name: 'moveCoordinates', immediately, transitions },
					(moveCoordinatesAlgorithm || moveCoordinates)(state, settings, normalizedDirections),
				);
				callbacks.push(onMove);

				if (immediately) {
					result = applyPostProcess({ name: 'moveCoordinatesEnd', immediately, transitions }, result);
					callbacks.push(onMoveEnd);
				} else {
					startAction('moveCoordinates');
				}

				updateState(
					result,
					{
						transitions: immediately && transitions,
					},
					callbacks,
				);
			}
		},
		moveCoordinatesEnd: (options: ImmediatelyOptions & TransitionOptions = {}) => {
			const { transitions = true, immediately = false } = options;
			updateState(
				() => state && applyPostProcess({ name: 'moveCoordinatesEnd', transitions, immediately }, state),
				{
					transitions,
				},
				[onMoveEnd],
			);
			endAction('moveCoordinates');
		},
		resizeCoordinates: (
			directions: Partial<ResizeDirections>,
			parameters: Record<string, unknown> = {},
			options: ImmediatelyOptions & NormalizeOptions & TransitionOptions = {},
		) => {
			const { transitions = false, immediately = false, normalize = true } = options;

			if (!transitionsOptions.active && state) {
				const callbacks = [];

				const normalizedDirections = normalize
					? normalizeResizeDirections(state, directions)
					: fillResizeDirections(directions);

				let result = applyPostProcess(
					{ name: 'resizeCoordinates', immediately, transitions },
					(resizeCoordinatesAlgorithm || resizeCoordinates)(
						state,
						settings,
						normalizedDirections,
						parameters,
					),
				);
				callbacks.push(onResize);

				if (immediately) {
					result = applyPostProcess({ name: 'resizeCoordinatesEnd', immediately, transitions }, result);
					callbacks.push(onResizeEnd);
				} else {
					startAction('resizeCoordinates');
				}

				updateState(
					result,
					{
						transitions: immediately && transitions,
					},
					callbacks,
				);
			}
		},
		resizeCoordinatesEnd: (options: ImmediatelyOptions & TransitionOptions = {}) => {
			const { transitions = true, immediately = false } = options;
			updateState(
				() => state && applyPostProcess({ name: 'resizeCoordinatesEnd', transitions, immediately }, state),
				{
					transitions,
				},
				[onResizeEnd],
			);
			endAction('resizeCoordinates');
		},
		getStencilCoordinates() {
			return getStencilCoordinates(state);
		},
		getCoordinates(options: { round?: boolean } = {}) {
			if (state && state.coordinates) {
				const { round = true } = options;
				if (round) {
					return roundCoordinates(state, settings);
				} else {
					return { ...state.coordinates };
				}
			} else {
				return emptyCoordinates();
			}
		},
		getVisibleArea() {
			if (state) {
				return { ...state.visibleArea };
			} else {
				return emptyCoordinates();
			}
		},
		getSettings() {
			return { ...settings };
		},
		getState() {
			return copyState(state);
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

	return cropper;
}

export type AbstractCropperStateHook = ReturnType<typeof useCropperState>;
