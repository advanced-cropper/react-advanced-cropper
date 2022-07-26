import React, { FC } from 'react';
import { CropperTransitions } from 'advanced-cropper';
import classnames from 'classnames';

import { ArtificialTransition } from './ArtificialTransition';

interface Props {
	className?: string;
	transitions?: CropperTransitions;
	width?: number;
	height?: number;
	left: number;
	top: number;
}

export const StencilWrapper: FC<Props> = ({ className, transitions, width, height, left, top, children }) => {
	return (
		<ArtificialTransition
			className={classnames('advanced-cropper-stencil-wrapper', className)}
			transitions={transitions}
			width={width}
			height={height}
			top={top}
			left={left}
		>
			{children}
		</ArtificialTransition>
	);
};
