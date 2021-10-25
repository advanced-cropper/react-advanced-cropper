import React, { FC } from 'react';
import classnames from 'classnames';

import './StencilOverlay.scss';

interface Props {
	className?: string;
}

export const StencilOverlay: FC<Props> = ({ className, children }) => {
	return <div className={classnames('react-stencil-overlay', className)}>{children}</div>;
};
