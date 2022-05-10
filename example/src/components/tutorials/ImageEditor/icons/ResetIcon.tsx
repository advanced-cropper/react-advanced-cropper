import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const ResetIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M21.2 9c-.3-.2-.8-.1-1 .2l-.8 1.3c-.7-3.4-3.8-6-7.4-6-4.2 0-7.6 3.4-7.6 7.6s3.4 7.6 7.6 7.6c2.3 0 4.5-1.1 6-2.9.3-.3.2-.8-.1-1.1-.3-.3-.8-.2-1.1.1-1.2 1.5-2.9 2.3-4.8 2.3-3.3 0-6.1-2.7-6.1-6.1S8.7 5.9 12 5.9c2.9 0 5.4 2.1 5.9 4.9l-1.3-.8c-.4-.2-.8-.1-1 .3-.2.4-.1.8.3 1l2.9 1.6c.1.1.2.1.4.1.3 0 .5-.1.6-.4l1.7-2.8c.2-.1.1-.6-.3-.8z" />
		</svg>
	);
};
