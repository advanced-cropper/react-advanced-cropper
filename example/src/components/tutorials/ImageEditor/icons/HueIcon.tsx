import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const HueIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M12 19.6c-4.2 0-7.6-3.4-7.6-7.6S7.8 4.4 12 4.4s7.6 3.4 7.6 7.6-3.4 7.6-7.6 7.6zm0-13.7c-3.3 0-6.1 2.7-6.1 6.1s2.7 6.1 6.1 6.1 6.1-2.7 6.1-6.1-2.8-6.1-6.1-6.1z" />
			<path d="M12 15.3c-1.8 0-3.3-1.5-3.3-3.3 0-1.8 1.5-3.3 3.3-3.3 1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3zm0-5.1c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8z" />
		</svg>
	);
};
