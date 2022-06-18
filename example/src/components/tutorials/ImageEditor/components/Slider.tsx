import React, { PureComponent } from 'react';
import cn from 'classnames';
import './Slider.scss';

interface Props {
	className?: string;
	onChange?: (value: number) => void;
	value?: number;
	showValue?: boolean;
}

export class Slider extends PureComponent<Props> {
	line = React.createRef<HTMLDivElement>();

	state = {
		focus: false,
		width: 0,
	};

	componentDidMount() {
		window.addEventListener('resize', this.recalculateWidth);
		window.addEventListener('orientationchange', this.recalculateWidth);

		window.addEventListener('mouseup', this.onStop, { passive: false });
		window.addEventListener('mousemove', this.onDrag, { passive: false });
		window.addEventListener('touchmove', this.onDrag, { passive: false });
		window.addEventListener('touchend', this.onStop, { passive: false });

		const line = this.line.current;
		if (line) {
			line.addEventListener('mousedown', this.onStart);
			line.addEventListener('touchstart', this.onStart);
		}

		this.recalculateWidth();
	}
	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onStop);
		window.removeEventListener('mousemove', this.onDrag);
		window.removeEventListener('touchmove', this.onDrag);
		window.removeEventListener('touchend', this.onStop);

		window.removeEventListener('resize', this.recalculateWidth);
		window.removeEventListener('orientationchange', this.recalculateWidth);

		const line = this.line.current;
		if (line) {
			line.removeEventListener('mousedown', this.onStart);
			line.removeEventListener('touchstart', this.onStart);
		}
	}
	onDrag = (e: MouseEvent | TouchEvent) => {
		const { onChange } = this.props;
		if (this.state.focus) {
			const position = 'touches' in e ? e.touches[0].clientX : e.clientX;
			const line = this.line.current;

			if (line) {
				const { left, width } = line.getBoundingClientRect();

				if (onChange) {
					onChange(Math.max(-1, Math.min(1, (2 * (position - left - width / 2)) / width)));
				}
			}
			if (e.preventDefault) {
				e.preventDefault();
			}
		}
	};
	onStop = () => {
		this.setState({
			focus: false,
		});
	};
	onStart = (e: MouseEvent | TouchEvent) => {
		this.setState({
			focus: true,
		});
		this.onDrag(e);
	};
	recalculateWidth = () => {
		const line = this.line.current;
		if (line) {
			this.setState({
				width: line.clientWidth,
			});
		}
	};
	render() {
		const { value = 0, className } = this.props;

		const handleInsideDot = this.state.width ? Math.abs(value) <= 16 / this.state.width : true;

		const fillWidth = `${Math.abs(value) * 50}%`;

		const fillLeft = `${50 * (1 - Math.abs(Math.min(0, value)))}%`;

		const formattedValue = `${value > 0 ? '+' : ''}${Math.round(100 * value)}`;

		return (
			<div className={cn('image-editor-slider', className)} ref={this.line}>
				<div className="image-editor-slider__line">
					<div
						className="image-editor-slider__fill"
						style={{
							width: fillWidth,
							left: fillLeft,
						}}
					/>
					<div className="image-editor-slider__dot" />
					<div
						className={cn(
							'image-editor-slider__value',
							handleInsideDot && 'image-editor-slider__value--hidden',
						)}
						style={{
							left: `${Math.abs(value * 50 + 50)}%`,
						}}
					>
						{formattedValue}
					</div>
					<div
						className={cn(
							'image-editor-slider__handler',
							this.state.focus && 'image-editor-slider__handler--focus',
							handleInsideDot && 'image-editor-slider__handler--hidden',
						)}
						style={{
							left: `${value * 50 + 50}%`,
						}}
					/>
				</div>
			</div>
		);
	}
}
