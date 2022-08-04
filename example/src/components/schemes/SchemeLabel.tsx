import React, { FC } from 'react';
import cn from 'classnames';
import './SchemeLabel.scss';

export interface SchemeLabelProps {
	className?: string;
}

export const SchemeLabel: FC<SchemeLabelProps> = ({ children, className }) => {
	return <div className={cn('scheme-label', className)}>{children}</div>;
};
