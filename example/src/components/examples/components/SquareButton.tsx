import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './SquareButton.scss';

export const SquareButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => {
	return (
		<button className={cn('square-button', className)} {...props}>
			{children}
		</button>
	);
};
