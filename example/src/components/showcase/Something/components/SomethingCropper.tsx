import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react';
import cn from 'classnames';
import {
	CropperBackgroundWrapper,
	CropperCanvas,
	CropperRef,
	CropperSource,
	CropperWrapper,
	RectangleStencil,
	StretchableBoundary,
	useAbstractCropper,
} from 'react-advanced-cropper';
import { defaultPosition, defaultVisibleArea, getTransformedImageSize } from 'advanced-cropper';
import { fullSize, getProperties, transformImageAlgorithm } from '../utils';
import { CropIcon } from '../icons/CropIcon';
import { RotateLeftIcon } from '../icons/RotateLeftIcon';
import { RotateRightIcon } from '../icons/RotateRightIcon';
import { CropMode } from '../types';
import './SomethingCropper.scss';

export interface SomethingCropperProps {
	src?: string | null;
	className?: string;
}

export const SomethingCropper = forwardRef((props: SomethingCropperProps, ref: Ref<CropperRef>) => {
	const { src, className } = props;
	const [mode, setMode] = useState<CropMode>(CropMode.full);

	const { cropper, image, refs } = useAbstractCropper(() => ({
		src,
		postProcess: mode === CropMode.full ? [fullSize] : [],
		transformImageAlgorithm,
	}));

	const state = cropper.getState();

	const transitions = cropper.getTransitions();

	const disabled = transitions.active || mode !== CropMode.crop;

	const { imageWrapperStyle, contentStyle, stencilCoordinates } = getProperties(image, state, transitions, mode);

	const onSetMode = (value: CropMode) => {
		if (!transitions.active) {
			cropper.startTransitions();
			setMode(value);
		}
	};

	const onDownload = () => {
		if (cropper) {
			const newTab = window.open();
			if (newTab) {
				newTab.document.body.innerHTML = `<img src="${cropper.getCanvas()?.toDataURL()}"></img>`;
			}
		}
	};

	const onCancel = () => {
		if (mode === CropMode.crop || mode === CropMode.preview) {
			onSetMode(CropMode.full);
		}
	};

	const onSave = () => {
		if (mode === CropMode.crop) {
			onSetMode(CropMode.preview);
		} else {
			onDownload();
		}
	};

	const onRotate = (angle: number) => {
		cropper.rotateImage(angle);
	};

	useEffect(() => {
		if (mode === CropMode.full || mode === CropMode.crop) {
			const state = cropper.getState();
			const settings = cropper.getSettings();
			if (state) {
				cropper.setVisibleArea(defaultVisibleArea(state, settings));
				cropper.setCoordinates({
					width: getTransformedImageSize(state).width * 0.8,
					height: getTransformedImageSize(state).height * 0.8,
				});
				cropper.setCoordinates(defaultPosition);
			}
		}
	}, [mode]);

	useImperativeHandle(ref, () => cropper);

	return (
		<CropperWrapper className={cn('something-cropper', className)} cropper={cropper}>
			<StretchableBoundary
				ref={refs.boundary}
				className={cn('something-cropper__boundary')}
				stretcherClassName={cn('something-cropper__stretcher')}
			>
				<CropperBackgroundWrapper
					moveImage={!disabled}
					scaleImage={!disabled}
					cropper={cropper}
					className={'something-cropper__background-wrapper'}
				>
					<div className={cn('something-cropper__background')}>
						{image && (
							<div className={'something-cropper__content'} style={contentStyle}>
								<div className={'something-cropper__image-wrapper'} style={imageWrapperStyle}>
									<RectangleStencil
										coordinates={stencilCoordinates}
										className={cn(
											'something-cropper__stencil',
											mode !== CropMode.crop && 'something-cropper__stencil--hidden',
										)}
										movable={!disabled}
										resizable={!disabled}
										cropper={cropper}
										image={image}
										handlerClassNames={{
											default: 'something-cropper__handler',
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</CropperBackgroundWrapper>
				<CropperCanvas ref={refs.canvas} />
				<CropperSource ref={refs.image} src={src} />
			</StretchableBoundary>
			<div className={'something-cropper__navigation'}>
				{mode !== CropMode.crop && (
					<div className={'something-cropper__small-buttons'}>
						<div className={'something-cropper__icon-button'} onClick={() => onRotate(-90)}>
							<RotateLeftIcon className={'something-cropper__icon'} />
						</div>
						<div className={'something-cropper__icon-button'} onClick={() => onRotate(90)}>
							<RotateRightIcon className={'something-cropper__icon'} />
						</div>
						<div className={'something-cropper__icon-button'} onClick={() => onSetMode(CropMode.crop)}>
							<CropIcon className={'something-cropper__icon'} />
						</div>
					</div>
				)}

				<div className={'something-cropper__buttons'}>
					<div className={'something-cropper__button something-cropper__button--cancel'} onClick={onCancel}>
						Cancel
					</div>
					<div className={'something-cropper__button something-cropper__button--save'} onClick={onSave}>
						Save
					</div>
				</div>
			</div>
		</CropperWrapper>
	);
});

SomethingCropper.displayName = 'SomethingCropper';
