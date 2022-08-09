import React, { FC, ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';

export interface StencilGridProps {
	visible?: boolean;
	division?: number;
	className?: string;
}

export const StencilGrid: FC<StencilGridProps> = ({ division = 3, visible = false, className }) => {
	const rows: ReactNode[] = [];

	const [visibleDivision, setVisibleDivision] = useState(division);

	useEffect(() => {
		if (visible) {
			setVisibleDivision(division);
		}
	}, [visible, division]);

	for (let i = 0; i < visibleDivision; i++) {
		const cells: ReactNode[] = [];
		for (let j = 0; j < visibleDivision; j++) {
			cells.push(<div key={j} className={'advanced-cropper-stencil-grid__cell'} />);
		}
		rows.push(
			<div key={i} className={'advanced-cropper-stencil-grid__row'}>
				{cells}
			</div>,
		);
	}

	return (
		<div
			className={cn(
				'advanced-cropper-stencil-grid',
				visible && 'advanced-cropper-stencil-grid--visible',
				className,
			)}
		>
			{rows}
		</div>
	);
};
