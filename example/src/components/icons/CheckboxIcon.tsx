import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const CheckboxIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
			<path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z" />
		</svg>
	);
};
