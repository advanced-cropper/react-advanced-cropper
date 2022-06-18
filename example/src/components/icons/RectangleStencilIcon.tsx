import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const RectangleStencilIcon: FC<Props> = ({ className }) => {
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width="21.5"
			height="21.5"
			viewBox="-36.6 -2.3 21.5 21.5"
		>
			<path
				fill="none"
				stroke="#FFF"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeMiterlimit="10"
				strokeDasharray="3"
				d="M-35.8-1.5h20v20h-20z"
			/>
		</svg>
	);
};
