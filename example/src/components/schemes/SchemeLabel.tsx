import React, { FC } from 'react';
import './SchemeLabel.scss';
import cn from 'classnames';

export interface SchemeLabelProps {
	className?: string;
}

export const SchemeLabel: FC<SchemeLabelProps> = ({ children, className }) => {
	return <div className={cn('schemes-label', className)}>{children}</div>;
};
