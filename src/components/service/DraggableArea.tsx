import React, { ReactNode, PureComponent, RefObject, createRef } from 'react';
import { distance } from 'advanced-cropper/utils';
import './DraggableArea.scss';
import cn from 'classnames';
import { MoveDirections, SimpleTouch, Point } from 'advanced-cropper/types';

interface Props {
	className?: string;
	movable?: boolean;
	activationDistance?: number;
	children?: ReactNode;
	onMove?: (directions: MoveDirections) => void;
	onMoveEnd?: () => void;
	onMoveStart?: () => void;
	useAnchor?: boolean;
}

export class DraggableArea extends PureComponent<Props> {
	touches: SimpleTouch[];
	started: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;

	static defaultProps = {
		movable: true,
		activationDistance: 30,
		useAnchor: true,
	};

	constructor(props: Props) {
		super(props);

		this.touches = [];
		this.started = false;
		this.anchor = {
			left: 0,
			top: 0,
		};
		this.container = createRef();
	}

	processMove = (newTouches: SimpleTouch[]) => {
		const container = this.container.current;

		if (container && this.touches.length) {
			const { left, top } = container.getBoundingClientRect();
			if (this.touches.length === 1 && newTouches.length === 1) {
				if (this.props.onMove) {
					this.props.onMove({
						left:
							newTouches[0].clientX -
							(this.props.useAnchor ? left + this.anchor.left : this.touches[0].clientX),
						top:
							newTouches[0].clientY -
							(this.props.useAnchor ? top + this.anchor.top : this.touches[0].clientY),
					});
					this.touches = newTouches;
				}
			}
		}
	};

	processEnd = () => {
		if (this.touches.length) {
			if (this.props.onMoveEnd) {
				this.props.onMoveEnd();
			}
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

	onTouchStart = (e: TouchEvent) => {
		if (e.cancelable) {
			const shouldStartMove = this.props.movable && e.touches.length === 1;
			if (shouldStartMove) {
				this.touches = Array.from(e.touches);
				if (this.props.onMoveStart) {
					this.props.onMoveStart();
				}
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
				this.processMove(Array.from(e.touches));
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
		if (this.props.movable && e.button === 0) {
			const touch = {
				clientX: e.clientX,
				clientY: e.clientY,
			};
			if (this.props.onMoveStart) {
				this.props.onMoveStart();
			}
			this.touches = [touch];
			this.initAnchor(touch);
			e.stopPropagation();
		}
	};

	onMouseMove = (e: MouseEvent) => {
		if (this.touches.length) {
			this.processMove([
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
		if (!this.props.movable && prevProps.movable) {
			this.touches = [];
		}
	}

	render() {
		const { children, className } = this.props;
		return (
			<div className={cn('react-draggable-area', className)} ref={this.container}>
				{children}
			</div>
		);
	}
}
