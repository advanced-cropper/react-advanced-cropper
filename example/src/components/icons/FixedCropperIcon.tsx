import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const FixedCropperIcon: FC<Props> = ({ className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="21"
			height="21"
			viewBox="-2.5 -2.5 21 21"
			xmlSpace="preserve"
		>
			<path d="M13.9 16.3H2.1c-1.3 0-2.4-1.1-2.4-2.4V2.1C-.3.8.8-.3 2.1-.3h11.8c1.3 0 2.4 1.1 2.4 2.4v11.8c0 1.3-1.1 2.4-2.4 2.4zM2.1 1.7c-.2 0-.4.2-.4.4v11.8c0 .2.2.4.4.4h11.8c.2 0 .4-.2.4-.4V2.1c0-.2-.2-.4-.4-.4H2.1z" />
			<path d="M6.2 6.2h3.7v3.7H6.2z" />
		</svg>
	);
};
