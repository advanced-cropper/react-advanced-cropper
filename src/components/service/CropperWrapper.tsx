import React, { ReactNode, CSSProperties, Component, RefObject, createRef } from 'react';
import debounce from 'debounce';
import {
	calculateGeometricProperties,
	createTouchMoveEvent,
	createTouchResizeEvent,
	createWheelResizeEvent,
	GeometricProperties,
	SimpleTouch,
} from 'advanced-cropper/touch';
import { TransformImageEvent } from 'advanced-cropper/events';
import { Point } from 'advanced-cropper/types';

interface Props {
	touchMove?: boolean;
	mouseMove?: boolean;
	touchResize?: boolean;
	wheelResize?:
		| boolean
		| {
				ratio: number;
		  };
	timeout?: number;
	children?: ReactNode;
	className?: string;
	onMove?: (event: TransformImageEvent) => void;
	onResize?: (event: TransformImageEvent) => void;
	onTransformEnd?: () => void;
	style?: CSSProperties;
}

export class CropperWrapper extends Component<Props> {
	touches: (SimpleTouch & { identifier?: number })[];
	transform: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;
	oldGeometricProperties: GeometricProperties | null;
	debouncedProcessEnd: CropperWrapper['processEnd'] & { clear: () => void };

	static defaultProps = {
		touchMove: true,
		mouseMove: true,
		touchResize: true,
		wheelResize: true,
		timeout: 500,
	};

	constructor(props) {
		super(props);

		this.transform = false;
		this.touches = [];
		this.anchor = {
			left: 0,
			top: 0,
		};
		this.container = createRef();
		this.oldGeometricProperties = null;
		this.debouncedProcessEnd = debounce(this.processEnd, props.timeout);
	}

	processMove = (event, newTouches) => {
		const { onResize, onMove, touchResize } = this.props;
		const container = this.container.current;
		if (container) {
			if (this.touches.length) {
				if (this.touches.length === 1 && newTouches.length === 1) {
					if (onMove) {
						onMove(createTouchMoveEvent(this.touches, newTouches));
					}
				} else if (this.touches.length > 1 && touchResize) {
					const newProperties = calculateGeometricProperties(newTouches, container);
					const oldProperties = this.oldGeometricProperties;

					if (oldProperties.count === newProperties.count && oldProperties.count > 1) {
						if (onResize) {
							onResize(createTouchResizeEvent(oldProperties, newProperties));
						}
					}
					this.oldGeometricProperties = newProperties;
				}
				this.touches = newTouches;
			}
		}
	};

	processEnd = () => {
		const { onTransformEnd } = this.props;
		if (this.transform) {
			this.transform = false;
			if (onTransformEnd) {
				onTransformEnd();
			}
		}
	};

	processStart = () => {
		this.transform = true;
		this.debouncedProcessEnd.clear();
	};

	onWheel = (e: WheelEvent) => {
		const { onResize, wheelResize } = this.props;
		const container = this.container.current;
		if (wheelResize) {
			this.processStart();
			if (onResize && container) {
				onResize(createWheelResizeEvent(e, container, wheelResize === true ? 0.1 : wheelResize.ratio));
			}

			e.preventDefault();
			e.stopPropagation();

			if (!this.touches.length) {
				this.debouncedProcessEnd();
			}
		}
	};
	onTouchStart = (e: TouchEvent) => {
		const { touchMove, touchResize } = this.props;
		if (e.cancelable && (touchMove || (touchResize && e.touches.length > 1))) {
			const container = this.container.current;
			if (container) {
				const { left, top, bottom, right } = container.getBoundingClientRect();
				this.touches = Array.from(e.touches).filter(
					(touch) =>
						touch.clientX > left && touch.clientX < right && touch.clientY > top && touch.clientY < bottom,
				);
				this.oldGeometricProperties = calculateGeometricProperties(this.touches, container);
				if (e.preventDefault) {
					e.preventDefault();
				}
				e.stopPropagation();
			}
		}
	};
	onTouchEnd = (e) => {
		if (e.touches.length === 0) {
			this.touches = [];
			this.processEnd();
		}
	};

	onTouchMove = (e) => {
		if (this.touches.length) {
			const touches = [...e.touches].filter(
				(touch) =>
					!touch.identifier ||
					this.touches.find((anotherTouch) => anotherTouch.identifier === touch.identifier),
			);
			this.processMove(e, touches);
			if (e.preventDefault) {
				e.preventDefault();
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			this.processStart();
		}
	};

	onMouseDown = (e: MouseEvent) => {
		const { mouseMove } = this.props;
		if (mouseMove && 'buttons' in e && e.buttons === 1) {
			const touch = {
				clientX: e.clientX,
				clientY: e.clientY,
			};
			this.touches = [touch];
			e.stopPropagation();
			this.processStart();
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
		}
	};

	onMouseUp = () => {
		this.touches = [];
		this.processEnd();
	};

	shouldComponentUpdate(): boolean {
		return true;
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
			container.removeEventListener('wheel', this.onWheel);
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
			container.addEventListener('wheel', this.onWheel, {
				passive: false,
			});
		}
	}

	render() {
		const { className, children, style } = this.props;
		return (
			<div className={className} style={style} ref={this.container}>
				{children}
			</div>
		);
	}
}
