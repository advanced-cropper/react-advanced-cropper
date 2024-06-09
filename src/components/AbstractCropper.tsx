import React, { useImperativeHandle, useRef, CSSProperties, Ref } from 'react';
import cn from 'classnames';
import {
	DrawOptions,
	DefaultSettings,
	defaultStencilConstraints,
	CoreSettings,
	CropperImage,
	CropperState,
	CropperTransitions,
	ModifierSettings,
	InitializeSettings,
} from 'advanced-cropper';

import {
	CropperBackgroundWrapperComponent,
	CropperWrapperComponent,
	StencilComponent,
	CropperBackgroundComponent,
	ArbitraryProps,
	StencilConstraints,
	SettingsExtension,
	ExtendedSettings,
	CustomCropperRef,
	CropperBoundaryComponent,
} from '../types';
import { CropperStateHook, CropperInstanceSettings, CropperInstanceSettingsProp } from '../hooks/useCropperInstance';
import { createCropper } from '../service/cropper';
import { AbstractCropperHookProps, useAbstractCropper } from '../hooks/useAbstractCropper';
import { StretchableBoundary } from './service/StretchableBoundary';
import { CropperWrapper } from './service/CropperWrapper';
import { CropperBackgroundImage } from './service/CropperBackgroundImage';
import { CropperCanvas } from './service/CropperCanvas';
import { RectangleStencil } from './stencils/RectangleStencil';
import { CropperBackgroundWrapper } from './service/CropperBackgroundWrapper';

export type AbstractCropperSettingsProp<Settings extends CropperInstanceSettings> =
	CropperInstanceSettingsProp<Settings>;

export type AbstractCropperSettings = DefaultSettings & CoreSettings & ModifierSettings & InitializeSettings;

export interface AbstractCropperRef<Settings extends AbstractCropperSettings = AbstractCropperSettings> {
	reset: () => void;
	refresh: () => void;
	clear: () => void;
	setCoordinates: CropperStateHook['setCoordinates'];
	setState: CropperStateHook['setState'];
	setImage: (image: CropperImage) => void;
	flipImage: CropperStateHook['flipImage'];
	zoomImage: CropperStateHook['zoomImage'];
	rotateImage: CropperStateHook['rotateImage'];
	reconcileState: CropperStateHook['reconcileState'];
	moveImage: CropperStateHook['moveImage'];
	moveCoordinates: CropperStateHook['moveCoordinates'];
	moveCoordinatesEnd: CropperStateHook['moveCoordinatesEnd'];
	resizeCoordinates: CropperStateHook['resizeCoordinates'];
	resizeCoordinatesEnd: CropperStateHook['resizeCoordinatesEnd'];
	transformImage: CropperStateHook['transformImage'];
	transformImageEnd: CropperStateHook['transformImageEnd'];
	getCoordinates: CropperStateHook['getCoordinates'];
	getVisibleArea: CropperStateHook['getVisibleArea'];
	getTransforms: CropperStateHook['getTransforms'];
	getStencilCoordinates: CropperStateHook['getStencilCoordinates'];
	getDefaultState: () => CropperState | null;
	getCanvas: (options?: DrawOptions) => HTMLCanvasElement | null;
	getSettings: () => Settings;
	getImage: () => CropperImage | null;
	getState: () => CropperState | null;
	getTransitions: () => CropperTransitions;
	isLoading: () => boolean;
	isLoaded: () => boolean;
}

export interface AbstractCropperProps<Settings extends AbstractCropperSettings>
	extends Omit<AbstractCropperHookProps<Settings>, 'settings'> {
	backgroundComponent?: CropperBackgroundComponent;
	backgroundProps?: ArbitraryProps;
	backgroundClassName?: string;
	backgroundWrapperComponent?: CropperBackgroundWrapperComponent;
	backgroundWrapperProps?: ArbitraryProps;
	backgroundWrapperClassName?: string;
	wrapperComponent?: CropperWrapperComponent;
	wrapperProps?: ArbitraryProps;
	stencilComponent?: StencilComponent;
	stencilProps?: ArbitraryProps;
	stencilConstraints?: StencilConstraints<AbstractCropperSettingsProp<Settings>>;
	className?: string;
	boundaryComponent?: CropperBoundaryComponent;
	boundaryProps?: ArbitraryProps;
	boundaryClassName?: string;
	style?: CSSProperties;
	settings: CropperInstanceSettingsProp<Settings>;
	disabled?: boolean;
}

export type AbstractCropperIntrinsicProps<Settings extends AbstractCropperSettings> = Omit<
	AbstractCropperProps<Settings>,
	'settings'
>;

const AbstractCropperComponent = <Extension extends SettingsExtension = {}>(
	props: AbstractCropperProps<ExtendedSettings<Extension>>,
	ref: Ref<CustomCropperRef<Extension>>,
) => {
	const {
		style,
		className,
		stencilComponent = RectangleStencil,
		stencilConstraints = defaultStencilConstraints,
		stencilProps = {},
		wrapperComponent = CropperWrapper,
		wrapperProps = {},
		backgroundComponent = CropperBackgroundImage,
		backgroundProps = {},
		backgroundClassName,
		backgroundWrapperComponent = CropperBackgroundWrapper,
		backgroundWrapperProps = {},
		boundaryComponent = StretchableBoundary,
		boundaryProps,
		boundaryClassName,
		canvas = true,
		crossOrigin = true,
		disabled,
		settings,
		...parameters
	} = props;

	const stencilRef = useRef<StencilComponent>(null);

	const { cropper, image, refs } = useAbstractCropper(() => ({
		...parameters,
		crossOrigin,
		stencilProps,
		canvas,
		settings: {
			...settings,
			...stencilConstraints(settings, {
				...stencilProps,
				...stencilRef.current,
			}),
		},
	}));

	const StencilComponent = stencilComponent;

	const WrapperComponent = wrapperComponent;

	const BackgroundWrapperComponent = backgroundWrapperComponent;

	const BackgroundComponent = backgroundComponent;

	const BoundaryComponent = boundaryComponent;

	useImperativeHandle(ref, () => cropper);

	const deprecatedWrapperProps = {
		loading: cropper.isLoading(),
		loaded: cropper.isLoaded(),
	};

	return (
		<WrapperComponent
			{...wrapperProps}
			disabled={disabled}
			className={cn('advanced-cropper', className)}
			cropper={cropper}
			style={style}
			{...deprecatedWrapperProps}
		>
			<BoundaryComponent
				{...boundaryProps}
				ref={refs.boundary}
				className={cn('advanced-cropper__boundary', boundaryClassName)}
			>
				<BackgroundWrapperComponent
					{...backgroundWrapperProps}
					disabled={disabled}
					cropper={cropper}
					className={'advanced-cropper__background-wrapper'}
				>
					{cropper.getState() && (
						<BackgroundComponent
							{...backgroundProps}
							ref={refs.image}
							crossOrigin={crossOrigin}
							cropper={cropper}
							className={cn('advanced-cropper__background', backgroundClassName)}
						/>
					)}
					<StencilComponent {...stencilProps} disabled={disabled} ref={stencilRef} cropper={cropper} image={image} />
				</BackgroundWrapperComponent>
				{canvas && <CropperCanvas ref={refs.canvas} />}
			</BoundaryComponent>
		</WrapperComponent>
	);
};

export const AbstractCropper = createCropper(AbstractCropperComponent);
