import React, { FC } from 'react';
import { CropperRef, CropperFade } from 'react-advanced-cropper';
import cn from 'classnames';
import { getAbsoluteZoom, getVisibleAreaSize } from '../algorithms';
import { Navigation } from './Navigation';
import './Wrapper.scss';

interface Props {
	cropper?: CropperRef;
	loading?: boolean;
	loaded?: boolean;
	className?: string;
}

export const Wrapper: FC<Props> = ({ cropper, children, loaded, className }) => {
	const state = cropper.getState();

	const absoluteZoom = state ? getAbsoluteZoom(state, cropper.getSettings()) : 0;

	const navigationWidth = state ? Math.min(state.boundary.height, state.boundary.width) - 40 : 0;

	const onZoom = (value: number, transitions?: boolean) => {
		if (cropper) {
			cropper.zoomImage(
				getVisibleAreaSize(cropper.getState(), cropper.getSettings(), absoluteZoom) /
					getVisibleAreaSize(cropper.getState(), cropper.getSettings(), value),
				{
					transitions: !!transitions,
				},
			);
		}
	};

	return (
		<CropperFade className={cn('fixed-cropper-wrapper', className)} visible={state && loaded}>
			<div className="fixed-cropper-wrapper__content">{children}</div>
			<div className="fixed-cropper-wrapper__navigation" style={{ width: navigationWidth }}>
				<Navigation zoom={absoluteZoom} onZoom={onZoom} />
			</div>
		</CropperFade>
	);
};
