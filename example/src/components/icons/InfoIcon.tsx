import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const InfoIcon: FC<Props> = ({ className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="-1 -1.4 18 18"
			xmlSpace="preserve"
		>
			<g fill="#FFF">
				<path d="M9.5 3.8c0 .8-.7 1.5-1.5 1.5s-1.4-.7-1.4-1.5.7-1.5 1.5-1.5 1.4.7 1.4 1.5zM8.6 12.3H7.5c-.3 0-.6-.3-.6-.6v-5c0-.3.3-.6.6-.6h1.2c.3 0 .6.3.6.6v5c-.1.3-.3.6-.7.6z" />
			</g>
			<path
				fill="#FFF"
				d="M8 16.6c-5 0-9-4-9-9s4-9 9-9 9 4 9 9c0 1.1-.2 2.2-.6 3.2-.2.5-.8.8-1.3.6-.5-.2-.8-.8-.6-1.3.3-.8.5-1.6.5-2.5 0-3.9-3.1-7-7-7s-7 3.1-7 7 3.1 7 7 7c.8 0 1.6-.1 2.3-.4.5-.2 1.1.1 1.3.6.2.5-.1 1.1-.6 1.3-1 .4-2 .5-3 .5z"
			/>
		</svg>
	);
};
