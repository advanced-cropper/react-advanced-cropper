import React, { FC } from 'react';
import Link from '@docusaurus/Link';
import './HierarchyElement.scss';

interface ItemProps {
	title: string;
	to?: string;
	type?: 'hook' | 'component' | 'custom-component';
}

export const HierarchyElement: FC<ItemProps> = ({ type, title, to, children }) => {
	return (
		<div className="hierarchy-element">
			<Link to={to} className="hierarchy-element__title">
				{type === 'hook' ? (
					<div title={'Hook'} className="hierarchy-element__icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" xmlSpace="preserve">
							<path d="M15.1 5.3c0 1.4-1 2.7-2.4 3.1V14c0 2.2-1.8 4-4 4s-4-1.8-4-4v-4l4 4H6.4c0 1.3 1.1 2.4 2.4 2.4s2.4-1.1 2.4-2.4V8.3c-1.4-.4-2.4-1.6-2.4-3.1 0-1.7 1.4-3.1 3.2-3.1 1.7 0 3.1 1.4 3.1 3.2M12 6.8c.9 0 1.6-.7 1.6-1.6s-.7-1.5-1.6-1.5-1.6.7-1.6 1.6.7 1.5 1.6 1.5z" />
						</svg>
					</div>
				) : type === 'component' ? (
					<div title={'Component'} className="hierarchy-element__icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" xmlSpace="preserve">
							<path d="M10 18.3 1.7 10 10 1.7l8.3 8.3-8.3 8.3zM3.1 10l6.9 6.9 6.9-6.9L10 3.1 3.1 10z" />
							<path d="M10 14.5 5.5 10 10 5.5l4.5 4.5-4.5 4.5zM6.9 10l3.1 3.1 3.1-3.1L10 6.9 6.9 10z" />
						</svg>
					</div>
				) : type === 'custom-component' ? (
					<div title={'Replaceable component'} className="hierarchy-element__icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" xmlSpace="preserve">
							<path d="m10 18.3-2.5-2.5.7-.7 1.8 1.8 1.8-1.8.7.7zM4.2 12.5 1.7 10l2.5-2.5.7.7L3.1 10l1.8 1.8zM11.8 4.9 10 3.1 8.2 4.9l-.7-.7L10 1.7l2.5 2.5zM15.8 12.5l-.7-.7 1.8-1.8-1.8-1.8.7-.7 2.5 2.5z" />
							<g>
								<path d="M10 14.5 5.5 10 10 5.5l4.5 4.5-4.5 4.5zM6.9 10l3.1 3.1 3.1-3.1L10 6.9 6.9 10z" />
							</g>
						</svg>
					</div>
				) : null}
				{title}
			</Link>
			<div className="hierarchy-element__children">{children}</div>
		</div>
	);
};
