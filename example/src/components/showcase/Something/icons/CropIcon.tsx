import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const CropIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
			<path d="M4 1a.999.999 0 1 0-2 0v1H1a.999.999 0 1 0 0 2h1v8c0 1.103.897 2 2 2h7v-2H4Zm8 14a.999.999 0 1 0 2 0v-1h1a.999.999 0 1 0 0-2h-1V4c0-1.103-.897-2-2-2H5v2h7z" />
		</svg>
	);
};
