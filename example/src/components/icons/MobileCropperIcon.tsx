import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const MobileCropperIcon: FC<Props> = ({ className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="-4 -4 24 24"
			xmlSpace="preserve"
		>
			<path
				d="M14.6-.3v17.1c0 1.1-.9 2-2 2H3.4c-1.1 0-2-.9-2-2V-.3c0-1.1.9-2 2-2h9.2c1.1 0 2 .9 2 2zm-5 15c0-.9-.7-1.6-1.6-1.6s-1.6.7-1.6 1.6.7 1.6 1.6 1.6 1.6-.7 1.6-1.6z"
			/>
		</svg>
	);
};
