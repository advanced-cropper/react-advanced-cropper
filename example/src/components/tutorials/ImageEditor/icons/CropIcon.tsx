import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const CropIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M18.2 15.2h-1.5V7.3H8.8V5.8c0-.4-.3-.8-.8-.8s-.7.4-.7.8v1.5H5.8c-.4 0-.8.3-.8.8s.3.8.8.8h1.5v7.8h7.8v1.5c0 .4.3.8.8.8s.8-.3.8-.8v-1.5h1.5c.4 0 .8-.3.8-.8s-.4-.7-.8-.7zM8.8 8.8h6.3v6.3H8.8V8.8z" />
		</svg>
	);
};
