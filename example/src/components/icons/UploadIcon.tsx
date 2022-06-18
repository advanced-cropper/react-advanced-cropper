import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const UploadIcon: FC<Props> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" xmlSpace="preserve">
			<path d="M14.2 8.1c-.4 0-.8.3-.8.8v4.7H2.6V8.8c0-.4-.3-.8-.8-.8s-.7.4-.7.8v4.7c0 .8.7 1.5 1.5 1.5h10.9c.8 0 1.5-.7 1.5-1.5V8.8c-.1-.4-.4-.7-.8-.7z" />
			<path d="M8.5.9C8.3.8 8.2.7 8 .7s-.4.1-.6.2L4.6 3.6c-.3.3-.3.8 0 1.1.3.3.8.3 1.1 0l1.6-1.5v7.1c0 .4.3.7.7.7s.8-.3.8-.8v-7l1.5 1.5c.3.3.7.3 1 0 .3-.3.3-.8 0-1.1L8.5.9z" />
		</svg>
	);
};
