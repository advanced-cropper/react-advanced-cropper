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
import { getOptions, isArray, isFunction } from 'advanced-cropper/utils';

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
import { TimingFunction } from 'advanced-cropper/animation';
import { DefaultTransforms, Nullable, TransitionsSettings } from '../types';
import { useCropperState } from './useCropperState';
import { useStateWithCallback } from './useStateWithCallback';
import { useDebouncedCallback } from './useDebouncedCallback';

export interface CropperMethodOptions {
	transitions?: boolean;
	immediately?: boolean;
	normalize?: boolean;
}

export type CropperCallback<Instance> = (instance: NonNullable<Instance>) => void;

export interface AbstractCropperStateCallbacks<Instance = unknown> {
	getInstance?: () => Nullable<Instance>;
	onTransitionsStart?: CropperCallback<Instance>;
	onTransitionsEnd?: CropperCallback<Instance>;
	onChange?: CropperCallback<Instance>;
	onResizeEnd?: CropperCallback<Instance>;
	onMoveEnd?: CropperCallback<Instance>;
	onMove?: CropperCallback<Instance>;
	onResize?: CropperCallback<Instance>;
	onTransformImage?: CropperCallback<Instance>;
	onTransformImageEnd?: CropperCallback<Instance>;
	onInteractionStart?: CropperCallback<Instance>;
	onInteractionEnd?: CropperCallback<Instance>;
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

export interface TransitionOptions {
	transitions?: boolean;
}

export interface ImmediatelyOptions {
	immediately?: boolean;
}

export interface NormalizeOptions {
	normalize?: boolean;
}

interface Core {
	state: CropperState | null;
	transitions: boolean;
}

function runCallback<Instance>(callback?: CropperCallback<Instance>, getInstance?: () => Nullable<Instance>) {
	if (callback && getInstance) {
		const instance = getInstance();
		if (instance) {
			callback(instance as NonNullable<Instance>);
		}
	}
}

function createCallback<Instance>(callback?: CropperCallback<Instance>, getInstance?: () => Nullable<Instance>) {
	return () => {
		runCallback(callback, getInstance);
	};
}

function runCallbacks<Instance>(callbacks: Function[]) {
	callbacks.forEach((callback) => {
		callback();
	});
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
	const [core, setCore] = useStateWithCallback<Core>({
		state: null,
		transitions: false,
	});

	const transitionsOptions = useMemo<{ timingFunction: TimingFunction; duration: number; active: boolean }>(
		() => ({
			...getOptions(transitions, {
				timingFunction: 'ease-in-out',
				duration: 350,
			}),
			active: core.transitions,
		}),
		[core.transitions, transitions],
	);

	const debouncedDisableTransitions = useDebouncedCallback(() => {
		setCore(
			(core) => ({
				...core,
				transitions: false,
			}),
			createCallback(onTransitionsEnd, getInstance),
		);
	}, transitionsOptions.duration);

	const { state } = core;

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
		callbacks: (CropperCallback<Instance> | undefined)[] = [],
	) => {
		const { transitions = false } = options;
		setCore(
			(core) => {
				const newState = isFunction(modifier) ? modifier(core.state, settings) : modifier;
				const changed = !isEqualStates(core.state, newState);
				if (transitions && changed) {
					debouncedDisableTransitions();
				}
				return {
					state: changed ? copyState(newState) : copyState(core.state),
					transitions: transitions && changed ? true : core.transitions,
				};
			},
			(core: Core, previousCore: Core) => {
				if (core.transitions && !previousCore.transitions) {
					runCallback(onTransitionsStart, getInstance);
				}
				runCallbacks([
					createCallback(onChange, getInstance),
					...callbacks.map((callback) => createCallback(callback, getInstance)),
				]);
			},
		);
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
		setState: (newState: Partial<CropperState> | null, options: TransitionOptions = {}) => {
			const { transitions = true } = options;
			updateState(() => state && { ...state, ...newState }, {
				transitions,
			});
		},
		setCoordinates: (
			transforms: CoordinatesTransform | CoordinatesTransform[],
			options: ImmediatelyOptions & TransitionOptions = {},
		) => {
			const { transitions = true, immediately = true } = options;
			updateState(
				() =>
					state &&
					applyPostProcess(
						{
							name: 'setCoordinates',
							immediately,
							transitions,
						},
						(setCoordinatesAlgorithm || setCoordinates)(state, settings, transforms, false),
					),
				{
					transitions,
				},
			);
		},
		setVisibleArea: (visibleArea: VisibleArea, options: ImmediatelyOptions & TransitionOptions = {}) => {
			const { transitions = true, immediately = true } = options;
			updateState(
				() =>
					state &&
					applyPostProcess(
						{ name: 'setVisibleArea', immediately, transitions },
						(setVisibleAreaAlgorithm || setVisibleArea)(state, settings, visibleArea),
					),
				{
					transitions,
				},
			);
		},
		setBoundary: (boundary: Boundary, options: ImmediatelyOptions & TransitionOptions = {}) => {
			const { transitions = false, immediately = true } = options;
			if (boundary) {
				updateState(
					() =>
						state &&
						applyPostProcess(
							{ name: 'setBoundary', immediately, transitions },
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

			if (!core.transitions && core.state) {
				const normalizedDirections = normalize
					? normalizeMoveDirections(core.state, directions)
					: fillMoveDirections(directions);

				let result = applyPostProcess(
					{ name: 'moveCoordinates', immediately, transitions },
					(moveCoordinatesAlgorithm || moveCoordinates)(core.state, settings, normalizedDirections),
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
				return null;
			}
		},
		getVisibleArea() {
			if (state) {
				return { ...state.visibleArea };
			} else {
				return null;
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
