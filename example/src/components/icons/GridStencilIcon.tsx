import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const GridStencilIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="21.5" height="21.5" xmlSpace="preserve">
			<path d="M14.6.3H.3v21.1h21.1V.3h-6.8zm-6.7 1h5.7V7H7.9V1.3zm5.7 12.3H7.9V7.9h5.7v5.7zM1.3 1.3H7V7H1.3V1.3zm0 6.6H7v5.7H1.3V7.9zm5.6 12.4H1.3v-5.7H7v5.7zm6.7 0H7.9v-5.7h5.7v5.7zm6.7 0h-5.7v-5.7h5.7v5.7zm0-6.7h-5.7V7.9h5.7v5.7zm-5.7-6.7V1.3h5.7V7h-5.7z" />
		</svg>
	);
};
