import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './Button.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	active?: boolean;
}

export const Button: FC<Props> = ({ className, active, children, ...props }) => {
	return (
		<button className={cn('image-editor-button', active && 'image-editor-button--active', className)} {...props}>
			{children}
		</button>
	);
};
