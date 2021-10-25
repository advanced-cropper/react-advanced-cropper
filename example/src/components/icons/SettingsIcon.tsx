import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const SettingsIcon: FC<Props> = ({ className }) => {
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
				fill="#FFF"
				d="M1 2.2h-2.9V.6H1v1.6zm8.2 6.6H-1.9V7.2H9.2v1.6zm-6.6 6.6h-4.5v-1.7h4.5v1.7zM6.3-.3V3c0 .5-.4.8-.8.8H2.2c-.4.1-.8-.3-.8-.8V-.3c0-.5.4-.8.8-.8h3.3c.5 0 .8.4.8.8zM8 13v3.3c0 .5-.4.8-.8.8H3.9c-.5 0-.8-.4-.8-.8V13c0-.5.4-.8.8-.8h3.3c.4-.1.8.3.8.8zm9.9-10.8H6.8V.6h11.1v1.6zm0 13.2H8.4v-1.7h9.5v1.7zm-3.3-9.1v3.3c0 .5-.4.8-.8.8h-3.3c-.5 0-.8-.4-.8-.8V6.3c0-.5.4-.8.8-.8h3.3c.4 0 .8.4.8.8zm3.3 2.5H15V7.2h2.9v1.6z"
			/>
		</svg>
	);
};
