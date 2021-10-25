import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const DefaultCropperIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="21" xmlSpace="preserve">
			<g>
				<path d="M0 0h5.3v5.3H0zM15.8 15.8h5.3v5.3h-5.3zM5.3 5.3h10.5v10.5H5.3z" />
				<path d="M5.3 5.3h10.5v10.5H5.3z" />
			</g>
		</svg>
	);
};
