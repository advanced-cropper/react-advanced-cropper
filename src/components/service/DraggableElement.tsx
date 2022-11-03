import React, { ReactNode, Component, RefObject, createRef } from 'react';
import cn from 'classnames';
import { MoveDirections, Point, SimpleTouch, distance } from 'advanced-cropper';

interface Props {
	className?: string;
	children?: ReactNode;
	disabled?: boolean;
	onMove?: (directions: MoveDirections, nativeEvent: MouseEvent | TouchEvent) => void;
	onMoveEnd?: () => void;
	onMoveStart?: () => void;
	onLeave?: () => void;
	onEnter?: () => void;
	useAnchor?: boolean;
	activationDistance?: number;
}

export class DraggableElement extends Component<Props> {
	touches: SimpleTouch[];
	started: boolean;
	hovered: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;

	static defaultProps = {
		disabled: false,
		activationDistance: 30,
		useAnchor: true,
		rerender: true,
	};

	constructor(props: Props) {
		super(props);

		this.touches = [];
		this.hovered = false;
		this.started = false;
		this.anchor = {
			left: 0,
			top: 0,
		};
		this.container = createRef();
	}

	processMove = (e: MouseEvent | TouchEvent, newTouches: SimpleTouch[]) => {
		const container = this.container.current;

		if (container && this.touches.length) {
			const { left, top } = container.getBoundingClientRect();
			if (this.touches.length === 1 && newTouches.length === 1) {
				if (this.props.onMove) {
					const movingToAnchor = {
						left:
							Math.abs(newTouches[0].clientX - this.anchor.left - left) <
							Math.abs(this.touches[0].clientX - this.anchor.left - left),
						top:
							Math.abs(newTouches[0].clientY - this.anchor.top - top) <
							Math.abs(this.touches[0].clientY - this.anchor.top - top),
					};

					const direction = {
						left: 0,
						top: 0,
					};

					if (!this.props.useAnchor || !movingToAnchor.left) {
						direction.left = newTouches[0].clientX - this.touches[0].clientX;
					}

					if (!this.props.useAnchor || !movingToAnchor.top) {
						direction.top = newTouches[0].clientY - this.touches[0].clientY;
					}

					this.props?.onMove(direction, e);

					this.touches = [...newTouches];
				}
			}
		}
	};

	processEnd = () => {
		const { onMoveEnd, onLeave } = this.props;
		if (!this.props.disabled && this.touches.length) {
			onMoveEnd?.();
		}
		if (this.hovered) {
			onLeave?.();
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
		const { onEnter, disabled } = this.props;
		if (!this.hovered && !disabled) {
			this.hovered = true;
			onEnter?.();
		}
	};

	onMouseLeave = () => {
		const { onLeave } = this.props;
		if (this.hovered && !this.touches.length) {
			this.hovered = false;
			onLeave?.();
		}
	};

	onTouchStart = (e: TouchEvent) => {
		const { onEnter, onMoveStart, disabled } = this.props;
		if (e.cancelable) {
			this.touches = Array.from(e.touches);

			const shouldStartMove = !disabled && e.touches.length === 1;
			if (shouldStartMove) {
				this.touches = Array.from(e.touches);
				onMoveStart?.();
			}

			if (!this.hovered && !disabled) {
				this.hovered = true;
				onEnter?.();
			}

			if (this.started || shouldStartMove) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
	};

	onTouchEnd = () => {
		this.started = false;
		this.processEnd();
	};

	onTouchMove = (e: TouchEvent) => {
		if (this.touches.length >= 1) {
			if (this.started) {
				this.processMove(e, Array.from(e.touches));
				e.preventDefault();
				e.stopPropagation();
			} else if (
				distance(
					{ left: this.touches[0].clientX, top: this.touches[0].clientY },
					{ left: e.touches[0].clientX, top: e.touches[0].clientY },
				) > (this.props.activationDistance || 0)
			) {
				this.initAnchor({
					clientX: e.touches[0].clientX,
					clientY: e.touches[0].clientY,
				});
				this.started = true;
			}
		}
	};

	onMouseDown = (e: MouseEvent) => {
		const { onMoveStart, disabled } = this.props;
		if (!disabled && e.button === 0) {
			const touch = {
				clientX: e.clientX,
				clientY: e.clientY,
			};
			this.touches = [touch];
			this.initAnchor(touch);
			e.stopPropagation();
			onMoveStart?.();
		}
	};

	onMouseMove = (e: MouseEvent) => {
		if (!this.props.disabled && this.touches.length) {
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

	componentDidUpdate(prevProps: Readonly<Props>) {
		if (this.props.disabled && !prevProps.disabled) {
			this.touches = [];
		}
	}

	render() {
		const { children, className } = this.props;
		return (
			<div
				className={cn('advanced-cropper-draggable-element', className)}
				ref={this.container}
				onMouseOver={this.onMouseOver}
				onMouseLeave={this.onMouseLeave}
			>
				{children}
			</div>
		);
	}
}
