import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const Logo: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="40" height="32" xmlSpace="preserve">
			<path fill="#FFF" d="M.3 0h8v8h-8zM24.3 24h8v8h-8zM8.3 8h16v16h-16z" />
			<path fill="#6FCFF0" d="M8.3 8h16v16h-16z" />
		</svg>
	);
};
