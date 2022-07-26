import React, { FC } from 'react';
import classnames from 'classnames';

interface Props {
	className?: string;
}

export const StencilOverlay: FC<Props> = ({ className, children }) => {
	return <div className={classnames('advanced-cropper-stencil-overlay', className)}>{children}</div>;
};
