import React, { FC, useRef, useState } from 'react';
import cn from 'classnames';
import { CropperRef, CropperProps, Cropper } from 'react-advanced-cropper';
import { getAbsoluteZoom, getVisibleAreaSize } from './algorithms';
import { Navigation } from './components/Navigation';
import './FixedCropper.scss';

export interface FixedCropperProps extends Omit<CropperProps, 'defaultSize' | 'defaultCoordinates' | 'stencilSize'> {
	wrapperClassName?: string;
}

export type FixedCropperMethods = CropperRef;

export const FixedCropper: FC<FixedCropperProps> = ({ wrapperClassName, className, onChange, stencilProps, ...props }) => {
	const [absoluteZoom, setAbsoluteZoom] = useState(0);
	const [navigationWidth, setNavigationWidth] = useState(0);

	const cropperRef = useRef<CropperRef>();

	const defaultSize = ({ imageSize, visibleArea }) => {
		return {
			width: (visibleArea || imageSize).width,
			height: (visibleArea || imageSize).height,
		};
	};

	const stencilSize = ({ boundary }) => {
		return {
			width: Math.min(boundary.height, boundary.width) - 80,
			height: Math.min(boundary.height, boundary.width) - 80,
		};
	};

	const onZoom = (value: number, transitions?: boolean) => {
		const cropper = cropperRef.current;
		if (cropper) {
			cropper.zoom(
				getVisibleAreaSize(cropper.getState(), cropper.getSettings(), absoluteZoom) /
					getVisibleAreaSize(cropper.getState(), cropper.getSettings(), value),
				{
					transitions: !!transitions,
				},
			);
		}
	};

	const onChangeInternal = (cropper: CropperRef) => {
		const state = cropper.getState();

		setAbsoluteZoom(getAbsoluteZoom(state, cropper.getSettings()));
		setNavigationWidth(Math.min(state.boundary.height, state.boundary.width) - 40)

		if (onChange) {
			onChange(cropper);
		}
	};

	return (
		<div className={cn('fixed-cropper', wrapperClassName)}>
			<Cropper
				onChange={onChangeInternal}
				className={cn('fixed-cropper__cropper', className)}
				defaultSize={defaultSize}
				ref={cropperRef}
				stencilSize={stencilSize}
				stencilProps={{
					previewClassName: 'fixed-cropper-stencil__preview',
					overlayClassName: 'fixed-cropper-stencil__overlay',
					handlers: {},
					lines: {},
					movable: false,
					resizable: false,
					...stencilProps,
				}}
				{...props}
			/>
			<div className="fixed-cropper__navigation" style={{ width: navigationWidth }}>
				<Navigation zoom={absoluteZoom} onZoom={onZoom} />
			</div>
		</div>
	);
};

FixedCropper.displayName = 'FixedCropper';
