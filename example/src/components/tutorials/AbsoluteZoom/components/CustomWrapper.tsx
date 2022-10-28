import React, { CSSProperties, FC } from 'react';
import cn from 'classnames';
import { CropperRef, CropperFade } from 'react-advanced-cropper';
import { getAbsoluteZoom, getZoomFactor } from 'advanced-cropper/extensions/absolute-zoom';
import { Navigation } from './Navigation/Navigation';
import './CustomWrapper.scss';

interface Props {
	cropper: CropperRef;
	className?: string;
	style?: CSSProperties;
}

export const CustomWrapper: FC<Props> = ({ cropper, children, className }) => {
	const state = cropper.getState();

	const settings = cropper.getSettings();

	const absoluteZoom = getAbsoluteZoom(state, settings);

	const onZoom = (value: number, transitions?: boolean) => {
		if (cropper) {
			cropper.zoomImage(getZoomFactor(state, settings, value), {
				transitions: !!transitions,
			});
		}
	};

	return (
		<CropperFade className={cn('custom-wrapper', className)} visible={state && cropper.isLoaded()}>
			{children}
			<Navigation className="custom-wrapper__navigation" zoom={absoluteZoom} onZoom={onZoom} />
		</CropperFade>
	);
};
