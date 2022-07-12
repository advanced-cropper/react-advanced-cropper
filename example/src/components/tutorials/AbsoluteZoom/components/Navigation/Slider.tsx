import React, { PureComponent } from 'react';
import cn from 'classnames';
import './Slider.scss';

interface Props {
	className?: string;
	onChange?: (value: number) => void;
	value?: number;
}

export class Slider extends PureComponent<Props> {
	line = React.createRef<HTMLDivElement>();

	state = {
		focus: false,
	};

	componentDidMount() {
		window.addEventListener('mouseup', this.onStop, { passive: false });
		window.addEventListener('mousemove', this.onDrag, { passive: false });
		window.addEventListener('touchmove', this.onDrag, { passive: false });
		window.addEventListener('touchend', this.onStop, { passive: false });

		const line = this.line.current;
		if (line) {
			line.addEventListener('mousedown', this.onStart);
			line.addEventListener('touchstart', this.onStart);
		}
	}
	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onStop);
		window.removeEventListener('mousemove', this.onDrag);
		window.removeEventListener('touchmove', this.onDrag);
		window.removeEventListener('touchend', this.onStop);

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
					onChange(Math.min(1, Math.max(0, position - left) / width));
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
	render() {
		const { value = 0, className } = this.props;
		return (
			<div className={cn('absolute-zoom-cropper-slider', className)} ref={this.line}>
				<div className="absolute-zoom-cropper-slider__line">
					<div
						className="absolute-zoom-cropper-slider__fill"
						style={{
							flexGrow: value,
						}}
					/>
					<div
						className={cn(
							'absolute-zoom-cropper-slider__circle',
							this.state.focus && 'absolute-zoom-cropper-slider__circle--focus',
						)}
						style={{
							left: `${value * 100}%`,
						}}
					>
						<div
							className={cn(
								'absolute-zoom-cropper-slider__inner-circle',
								this.state.focus && 'absolute-zoom-cropper-slider__inner-circle--focus',
							)}
						/>
					</div>
				</div>
			</div>
		);
	}
}
