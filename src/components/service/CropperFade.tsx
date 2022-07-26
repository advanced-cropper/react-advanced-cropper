import React, { CSSProperties, FC } from 'react';
import cn from 'classnames';

interface Props {
	visible?: unknown;
	className?: string;
	style?: CSSProperties;
}

export const CropperFade: FC<Props> = ({ visible, className, style, children }) => {
	return (
		<div
			style={style}
			className={cn(className, 'advanced-cropper-fade', Boolean(visible) && 'advanced-cropper-fade--visible')}
		>
			{children}
		</div>
	);
};
