import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const RotateLeftIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="15.45" viewBox="0 0 16 16">
			<path d="M1.12 6.622H.829A.826.826 0 0 1 0 5.794V1.381A.826.826 0 0 1 1.414.794L2.848 2.23a7.722 7.722 0 0 1 10.89.034 7.723 7.723 0 0 1 0 10.924 7.723 7.723 0 0 1-10.924 0 1.105 1.105 0 0 1 1.562-1.562 5.517 5.517 0 1 0 7.803-7.803 5.516 5.516 0 0 0-7.769-.035l1.417 1.42a.829.829 0 0 1-.586 1.415z" />
		</svg>
	);
};
