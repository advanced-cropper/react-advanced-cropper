import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const CloseIcon: FC<Props> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-4 -4 24 24" xmlSpace="preserve">
			<path
				fill="#FFF"
				d="M15.9 16.3c-.3 0-.5-.1-.7-.3L8.6 9.3 1.9 16c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l6.7-6.7L.5 1.2C.1.8.1.2.5-.2s1-.4 1.4 0l6.7 6.7 6.7-6.7c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10 7.9l6.7 6.7c.4.4.4 1 0 1.4-.3.2-.5.3-.8.3z"
			/>
		</svg>
	);
};
