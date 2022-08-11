import React, { FC, useMemo, useState } from 'react';
import cn from 'classnames';
import { Cropper, CircleStencil, RectangleStencil, StencilComponent } from 'react-advanced-cropper';
import { RectangleStencilIcon } from '@site/src/components/icons/RectangleStencilIcon';
import { CircleStencilIcon } from '@site/src/components/icons/CircleStencilIcon';
import { SquareButton } from '@site/src/components/examples/components/SquareButton';
import { VerticalButtons } from '@site/src/components/examples/components/VerticalButtons';
import { GridStencilIcon } from '@site/src/components/icons/GridStencilIcon';
import './ThemeExample.scss';

interface ThemeExampleProps {
	theme: 'bubble' | 'classic' | 'compact' | 'corners' | 'default';
	grid?: boolean;
}

export const ThemeExample: FC<ThemeExampleProps> = ({ theme, grid = true }) => {
	const [stencilComponent, setStencilComponent] = useState<StencilComponent>(() => RectangleStencil);
	const [stencilGrid, setStencilGrid] = useState(grid);

	const image = useMemo(() => {
		if (theme === 'bubble') {
			return '/react-advanced-cropper/img/images/photo-1595435934249-5df7ed86e1c0.jpg';
		} else if (theme === 'classic') {
			return '/react-advanced-cropper/img/images/photo-1520927640400-f9e83b1bc43e.jpg';
		} else if (theme === 'compact') {
			return '/react-advanced-cropper/img/images/pexels-photo-573238.jpeg';
		} else if (theme === 'corners') {
			return '/react-advanced-cropper/img/images/adam-flockemann-9j4xyaSQhUQ-unsplash.jpg';
		} else {
			return '/react-advanced-cropper/img/images/photo-1583149577728-9ab503747013.jpg';
		}
	}, [theme]);

	const setRectangleStencil = () => {
		setStencilComponent(RectangleStencil);
	};
	const setCircleStencil = () => {
		setStencilComponent(CircleStencil);
	};
	const toggleGrid = () => {
		setStencilGrid((value) => !value);
	};

	return (
		<div className={cn('theme-example', theme && `theme-example--${theme}`)}>
			<Cropper src={image} stencilComponent={stencilComponent} stencilProps={{ grid: stencilGrid }} />
			<VerticalButtons>
				<SquareButton
					className="theme-example__button"
					title="Set Rectangle Stencil"
					onClick={setRectangleStencil}
				>
					<RectangleStencilIcon />
				</SquareButton>
				<SquareButton className="theme-example__button" title="Set Circle Stencil" onClick={setCircleStencil}>
					<CircleStencilIcon />
				</SquareButton>
				<SquareButton
					title={stencilGrid ? 'Disable Grid' : 'Enable Grid'}
					className={cn('theme-example__button', !stencilGrid && 'theme-example__button--inactive')}
					onClick={toggleGrid}
				>
					<GridStencilIcon />
				</SquareButton>
			</VerticalButtons>
			<div className="theme-example__theme">Theme: {theme}</div>
		</div>
	);
};
