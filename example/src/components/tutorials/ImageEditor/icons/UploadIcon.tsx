import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const UploadIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M17.2 12.1c-.4 0-.8.3-.8.8v2.8c0 .6-.4 1-1 1H8.6c-.6 0-1-.4-1-1v-2.8c0-.4-.3-.8-.8-.8s-.8.3-.8.8v2.8c0 1.4 1.1 2.5 2.5 2.5h6.8c1.4 0 2.5-1.1 2.5-2.5v-2.8c.1-.5-.2-.8-.6-.8z" />
			<path d="m10.1 9.4 1.1-1.1V14c0 .4.3.8.8.8s.8-.3.8-.8V8.4l1.1 1c.1.1.3.2.5.2s.4-.1.5-.2c.3-.3.3-.8 0-1.1L12.5 6c-.3-.3-.8-.3-1 0L9.1 8.3c-.3.3-.3.8 0 1.1.3.3.7.3 1 0z" />
		</svg>
	);
};
