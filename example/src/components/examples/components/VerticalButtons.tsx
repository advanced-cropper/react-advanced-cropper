import React, { FC } from 'react';
import cn from 'classnames';
import './VerticalButtons.scss';

interface Props {
	className?: string;
}

export const VerticalButtons: FC<Props> = ({ children, className, ...props }) => {
	return <div className={cn('vertical-buttons', className)}>{children}</div>;
};
