import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const Separator: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="47" height="14.1" xmlSpace="preserve">
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				fill="#454445"
				d="m43 3.1-4 4 4 4 4-4-4-4zm-43 4 4 4 4-4-4-4-4 4zm16.9 0 7.1 7.1 7.1-7.1L24 0l-7.1 7.1z"
			/>
		</svg>
	);
};
