import React, { FC, ReactNode, useState } from 'react';
import cn from 'classnames';
import { useUpdateEffect } from '../../hooks/useUpdateEffect';

export interface StencilGridProps {
	visible?: boolean;
	columns?: number;
	rows?: number;
	className?: string;
}

export const StencilGrid: FC<StencilGridProps> = ({ columns = 3, rows = 3, visible = false, className }) => {
	const nodes: ReactNode[] = [];

	const [currentColumns, setCurrentColumns] = useState(columns);
	const [currentRows, setCurrentRows] = useState(rows);

	useUpdateEffect(() => {
		if (visible) {
			setCurrentRows(rows);
			setCurrentColumns(columns);
		}
	}, [visible, columns, rows]);

	for (let i = 0; i < currentRows; i++) {
		const cells: ReactNode[] = [];
		for (let j = 0; j < currentColumns; j++) {
			cells.push(
				<div
					key={j}
					className={cn(
						'advanced-cropper-stencil-grid__cell',
						i === 0 && 'advanced-cropper-stencil-grid__cell--top',
						i === currentRows - 1 && 'advanced-cropper-stencil-grid__cell--bottom',
						j === 0 && 'advanced-cropper-stencil-grid__cell--left',
						j === currentColumns - 1 && 'advanced-cropper-stencil-grid__cell--right',
					)}
				/>,
			);
		}
		nodes.push(
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
			{nodes}
		</div>
	);
};
