import React, { ReactNode, CSSProperties, Component, RefObject, createRef } from 'react';
import debounce from 'debounce';
import { calculateGeometricProperties, GeometricProperties, SimpleTouch } from 'advanced-cropper/touch';
import {
	TransformImageEvent,
	createTouchMoveEvent,
	createTouchResizeEvent,
	createWheelResizeEvent,
} from 'advanced-cropper/events';
import { CropperState, Point } from 'advanced-cropper/types';

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
	state?: CropperState | null;
	eventsFilter?: (nativeEvent: Event, transforming: boolean) => boolean | void;
}

export type TransformImageType = 'touchTransform' | 'mouseMove' | 'wheelResize';

export class TransformableImage extends Component<Props> {
	touches: (SimpleTouch & { identifier?: number })[];
	transforming: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;
	oldGeometricProperties: GeometricProperties | null;
	debouncedProcessEnd: TransformableImage['processEnd'] & { clear: () => void };

	static defaultProps = {
		touchMove: true,
		mouseMove: true,
		touchResize: true,
		wheelResize: true,
		timeout: 500,
	};

	constructor(props) {
		super(props);

		this.transforming = false;

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
		if (this.transforming) {
			this.transforming = false;
			if (onTransformEnd) {
				onTransformEnd();
			}
		}
	};

	processStart = () => {
		this.transforming = true;
		this.debouncedProcessEnd.clear();
	};

	processEvent = (nativeEvent: Event) => {
		const { eventsFilter } = this.props;
		if (eventsFilter) {
			return eventsFilter(nativeEvent, this.transforming) !== false;
		} else {
			nativeEvent.preventDefault();
			nativeEvent.stopPropagation();
			return true;
		}
	};

	onWheel = (event: WheelEvent) => {
		const { onResize, wheelResize } = this.props;
		const container = this.container.current;
		if (wheelResize) {
			if (this.processEvent(event)) {
				this.processStart();
				if (onResize && container) {
					onResize(createWheelResizeEvent(event, container, wheelResize === true ? 0.1 : wheelResize.ratio));
				}

				if (!this.touches.length) {
					this.debouncedProcessEnd();
				}
			}
		}
	};
	onTouchStart = (event: TouchEvent) => {
		const { touchMove, touchResize } = this.props;
		if (event.cancelable && (touchMove || (touchResize && event.touches.length > 1))) {
			if (this.processEvent(event)) {
				const container = this.container.current;
				if (container) {
					const { left, top, bottom, right } = container.getBoundingClientRect();
					this.touches = Array.from(event.touches).filter(
						(touch) =>
							touch.clientX > left &&
							touch.clientX < right &&
							touch.clientY > top &&
							touch.clientY < bottom,
					);
					this.oldGeometricProperties = calculateGeometricProperties(this.touches, container);
				}
			}
		}
	};
	onTouchEnd = (event) => {
		if (event.touches.length === 0) {
			this.touches = [];
			this.processEnd();
		}
	};

	onTouchMove = (event: TouchEvent) => {
		if (this.touches.length) {
			const touches = [...event.touches].filter(
				(touch) =>
					!touch.identifier ||
					this.touches.find((anotherTouch) => anotherTouch.identifier === touch.identifier),
			);

			if (this.processEvent(event)) {
				this.processMove(event, touches);
				this.processStart();
			}
		}
	};

	onMouseDown = (event: MouseEvent) => {
		const { mouseMove } = this.props;
		if (mouseMove && 'buttons' in event && event.buttons === 1) {
			if (this.processEvent(event)) {
				const touch = {
					clientX: event.clientX,
					clientY: event.clientY,
				};
				this.touches = [touch];
				this.processStart();
			}
		}
	};

	onMouseMove = (event) => {
		if (this.touches.length) {
			if (this.processEvent(event)) {
				this.processMove(event, [
					{
						clientX: event.clientX,
						clientY: event.clientY,
					},
				]);
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
