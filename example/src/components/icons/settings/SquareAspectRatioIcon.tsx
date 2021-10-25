import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const SquareAspectRatioIcon: FC<Props> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" xmlSpace="preserve" stroke="none">
			<path d="M33 33H0V0h33v33zM1 32h31V1H1v31z" />
			<path d="M13.5 20.2h-2.2v-5.6c-.1.2-.3.3-.5.5l-.8.8-1.1-1.4 2.7-2.2h1.9v7.9zM15.4 15.1c0-.3.1-.6.3-.8s.5-.3.8-.3c.4 0 .6.1.8.3s.3.4.3.8c0 .3-.1.6-.3.8s-.5.3-.8.3c-.4 0-.6-.1-.8-.3-.2-.2-.3-.5-.3-.8zm0 4.2c0-.3.1-.6.3-.8.2-.2.5-.3.9-.3s.6.1.8.3.3.4.3.8c0 .3-.1.6-.3.8-.2.2-.5.3-.8.3-.4 0-.6-.1-.8-.3-.3-.2-.4-.4-.4-.8zM23.1 20.2H21v-5.6c-.1.2-.3.3-.5.5l-.9.7-1.1-1.4 2.7-2.2h1.9v8z" />
		</svg>
	);
};
