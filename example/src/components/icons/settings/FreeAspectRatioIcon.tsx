import React, { FC } from 'react';

interface Props {
	className?: string;
}

export const FreeAspectRatioIcon: FC<Props> = ({ className }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="43" height="33" xmlSpace="preserve" stroke="none">
			<path d="M43 33H0V0h43v33zM1 32h41V1H1v31z" />
			<path d="M11.7 20.2H9.6v-7.9h4.6V14h-2.6v1.5H14v1.7h-2.4v3zM17.7 17.4v2.9h-2.1v-7.9h2.6c2.1 0 3.2.8 3.2 2.3 0 .9-.4 1.6-1.3 2.1l2.3 3.4H20l-1.7-2.9h-.6zm0-1.6h.4c.7 0 1.1-.3 1.1-1 0-.5-.4-.8-1.1-.8h-.4v1.8zM27.7 20.2H23v-7.9h4.7V14h-2.5v1.2h2.4V17h-2.4v1.5h2.5v1.7zM33.7 20.2H29v-7.9h4.7V14h-2.5v1.2h2.4V17h-2.4v1.5h2.5v1.7z" />
		</svg>
	);
};
