import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const RotateLeftIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16">
			<path
				fill="#FFF"
				d="M3.5 11.8c-.2.2-.2.6 0 .9 1.1 1.1 2.8 1.8 4.5 1.8 3.7 0 6.5-2.8 6.5-6.5s-3-6.5-6.5-6.5c-1.7 0-3.3.7-4.5 1.8l-1-1c-.4-.4-1-.1-1 .4v3.8c0 .3.3.6.6.6h3.7c.5 0 .8-.7.4-1L5 4.9c.9-.9 1.9-1.3 3-1.3 3 0 5.4 3.1 4 6.2-.7 1.6-2.3 2.6-4 2.6-1.2 0-2.2-.4-3-1.3-.2-.2-.6-.2-.8 0l-.7.7z"
			/>
		</svg>
	);
};
