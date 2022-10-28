import React, { CSSProperties, FC } from 'react';
import { CropperRef, CropperFade } from 'react-advanced-cropper';
import { getAbsoluteZoom, getZoomFactor } from 'advanced-cropper/extensions/absolute-zoom';
import cn from 'classnames';
import { Navigation } from './Navigation';
import './Wrapper.scss';

interface Props {
	cropper: CropperRef;
	className?: string;
	style?: CSSProperties;
}

export const Wrapper: FC<Props> = ({ cropper, children, className }) => {
	const state = cropper.getState();

	const settings = cropper.getSettings();

	const absoluteZoom = getAbsoluteZoom(state, settings);

	const navigationWidth = state ? Math.min(state.boundary.height, state.boundary.width) - 40 : 0;

	const onZoom = (value: number, transitions?: boolean) => {
		if (cropper) {
			cropper.zoomImage(getZoomFactor(state, settings, value), {
				transitions: !!transitions,
			});
		}
	};

	return (
		<CropperFade className={cn('fixed-cropper-wrapper', className)} visible={state && cropper.isLoaded()}>
			<div className="fixed-cropper-wrapper__content">{children}</div>
			<div className="fixed-cropper-wrapper__navigation" style={{ width: navigationWidth }}>
				<Navigation zoom={absoluteZoom} onZoom={onZoom} />
			</div>
		</CropperFade>
	);
};
