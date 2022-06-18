import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const SaveIcon: FC<Props> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" xmlSpace="preserve">
			<path
				fill="#FFF"
				d="M.8 5.6c0-.5.3-1.2.6-1.6l2.7-2.7C4.4 1 5.2.7 5.7.7h8.7c.5 0 .9.5.9.9v12.6c0 .5-.5.9-.9.9H1.6c-.5 0-.9-.5-.9-.9V5.6h.1zm2.4 8.5v-3.9c0-.5.5-.9.9-.9h7.8c.5 0 .9.5.9.9v3.9H14V1.9h-1.2v3.9c0 .5-.5.9-.9.9H6.4c-.4 0-.7-.3-.7-.9V1.9c-.4 0-.7.1-.8.3L2.2 4.9c-.1.1-.3.4-.3.7V14h1.3zm8.4 0v-3.7H4.4V14h7.2v.1zM6.8 5.3c0 .2.2.3.3.3H9c.2 0 .3-.2.3-.3V2.2c0-.2-.2-.3-.3-.3H7.1c-.2 0-.3.1-.3.3v3.1z"
			/>
		</svg>
	);
};
