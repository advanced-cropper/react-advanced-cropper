import React, { ReactNode, Component, RefObject, createRef } from 'react';
import { MoveDirections, Point, SimpleTouch } from 'advanced-cropper/types';

interface Props {
	className?: string;
	children?: ReactNode;
	onDrag?: (directions: MoveDirections, nativeEvent?: MouseEvent | TouchEvent) => void;
	onDragEnd?: () => void;
	onLeave?: () => void;
	onEnter?: () => void;
	disabled?: boolean;
}

export class DraggableElement extends Component<Props> {
	touches: SimpleTouch[];
	hovered: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;

	static defaultProps = {
		disabled: false,
	};

	constructor(props) {
		super(props);

		this.touches = [];
		this.hovered = false;
		this.anchor = {
			left: 0,
			top: 0,
		};
		this.container = createRef();
	}

	processMove = (event: MouseEvent | TouchEvent, newTouches: SimpleTouch[]) => {
		const { onDrag } = this.props;
		const container = this.container.current;

		if (container && this.touches.length) {
			if (this.touches.length === 1 && newTouches.length === 1) {
				if (onDrag) {
					const { left, top } = container.getBoundingClientRect();

					const shift = {
						left: newTouches[0].clientX - left - this.anchor.left,
						top: newTouches[0].clientY - top - this.anchor.top,
					};

					onDrag(shift, event);
				}
			}
			this.touches = newTouches;
		}
	};

	processEnd = () => {
		const { onDragEnd, onLeave } = this.props;
		if (this.touches.length) {
			if (onDragEnd) {
				onDragEnd();
			}
		}
		if (this.hovered) {
			if (onLeave) {
				onLeave();
			}
			this.hovered = false;
		}
		this.touches = [];
	};

	initAnchor = (touch: SimpleTouch) => {
		const container = this.container.current;
		if (container) {
			const { left, top } = container.getBoundingClientRect();
			this.anchor = {
				left: touch.clientX - left,
				top: touch.clientY - top,
			};
		}
	};

	onMouseOver = () => {
		const { onEnter } = this.props;
		if (!this.hovered) {
			this.hovered = true;
			if (onEnter) {
				onEnter();
			}
		}
	};
	onMouseLeave = () => {
		const { onLeave } = this.props;
		if (this.hovered && !this.touches.length) {
			this.hovered = false;
			if (onLeave) {
				onLeave();
			}
		}
	};

	onTouchStart = (e: TouchEvent) => {
		const { onEnter, disabled } = this.props;
		if (e.cancelable && !disabled && e.touches.length === 1) {
			this.touches = Array.from(e.touches);

			if (!this.hovered) {
				if (onEnter) {
					onEnter();
				}
				this.hovered = true;
			}

			if (e.touches.length === 1) {
				this.initAnchor(
					this.touches.reduce(
						(mean, touch) => {
							return {
								clientX: mean.clientX + touch.clientX / e.touches.length,
								clientY: mean.clientY + touch.clientY / e.touches.length,
							};
						},
						{ clientX: 0, clientY: 0 },
					),
				);
				if (e.preventDefault) {
					e.preventDefault();
				}
				e.stopPropagation();
			}
		}
	};
	onTouchEnd = () => {
		this.processEnd();
	};
	onTouchMove = (e) => {
		if (this.touches.length) {
			this.processMove(e, [...e.touches]);
			if (e.preventDefault) {
				e.preventDefault();
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
		}
	};
	onMouseDown = (e: MouseEvent) => {
		const { disabled } = this.props;
		if (!disabled && e.button === 0) {
			const touch = {
				clientX: e.clientX,
				clientY: e.clientY,
			};
			this.touches = [touch];
			this.initAnchor(touch);
			e.stopPropagation();
		}
	};
	onMouseMove = (e) => {
		if (this.touches.length) {
			this.processMove(e, [
				{
					clientX: e.clientX,
					clientY: e.clientY,
				},
			]);
			if (e.preventDefault && e.cancelable) {
				e.preventDefault();
			}
			e.stopPropagation();
		}
	};
	onMouseUp = () => {
		this.processEnd();
	};

	shouldComponentUpdate(): boolean {
		return false;
	}

	componentWillUnmount() {
		window.removeEventListener('mouseup', this.onMouseUp);
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('touchmove', this.onTouchMove);
		window.removeEventListener('touchend', this.onTouchEnd);
		const container = this.container.current;
		if (container) {
			container.removeEventListener('touchstart', this.onTouchStart);
			container.removeEventListener('mousedown', this.onMouseDown);
		}
	}

	componentDidMount() {
		window.addEventListener('mouseup', this.onMouseUp, { passive: false });
		window.addEventListener('mousemove', this.onMouseMove, { passive: false });
		window.addEventListener('touchmove', this.onTouchMove, { passive: false });
		window.addEventListener('touchend', this.onTouchEnd, { passive: false });

		const container = this.container.current;
		if (container) {
			// Add event listeners here due to https://github.com/facebook/react/issues/9809#issuecomment-414072263
			container.addEventListener('touchstart', this.onTouchStart, {
				passive: false,
			});
			container.addEventListener('mousedown', this.onMouseDown, {
				passive: false,
			});
		}
	}

	render() {
		const { children, className } = this.props;
		return (
			<div className={className} ref={this.container}>
				{children}
			</div>
		);
	}
}
