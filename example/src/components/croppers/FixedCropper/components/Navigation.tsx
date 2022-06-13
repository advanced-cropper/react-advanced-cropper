import React, { FC } from 'react';
import { isNumber } from 'react-advanced-cropper';
import cn from 'classnames';
import { ZoomInIcon } from '@site/src/components/icons/ZoomInIcon';
import { ZoomOutIcon } from '@site/src/components/icons/ZoomOutIcon';
import { Slider } from '@site/src/components/croppers/FixedCropper/components/Slider';
import './Navigation.scss';

interface Props {
	zoom?: number;
	onZoom?: (value: number, transitions?: boolean) => void;
	className?: string;
	disabled?: unknown;
}

export const Navigation: FC<Props> = ({ className, onZoom, zoom }) => {
	const onZoomIn = () => {
		if (onZoom && isNumber(zoom)) {
			onZoom(Math.min(1, zoom + 0.25), true);
		}
	};

	const onZoomOut = () => {
		if (onZoom && isNumber(zoom)) {
			onZoom(Math.max(0, zoom - 0.25), true);
		}
	};

	return (
		<div className={cn('fixed-cropper-navigation', className)}>
			<button className="fixed-cropper-navigation__button" onClick={onZoomOut}>
				<ZoomOutIcon />
			</button>
			<Slider value={zoom} onChange={onZoom} className="fixed-cropper-navigation__slider" />
			<button className="fixed-cropper-navigation__button" onClick={onZoomIn}>
				<ZoomInIcon />
			</button>
		</div>
	);
};
