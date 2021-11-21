import React, { ReactNode, CSSProperties, Component, RefObject, createRef } from 'react';
import debounce from 'debounce';
import { ImageTransform, Point, SimpleTouch } from 'advanced-cropper/types';
import { touchesToImageTransform, wheelEventToImageTransform } from 'advanced-cropper/transforms';

interface Props {
	onTransform?: (transform: ImageTransform) => void;
	onTransformEnd?: () => void;
	touchMove?: boolean;
	mouseMove?: boolean;
	touchResize?: boolean;
	touchRotate?: boolean;
	wheelResize?:
		| boolean
		| {
				ratio: number;
		  };
	timeout?: number;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	eventsFilter?: (nativeEvent: Event, transforming: boolean) => boolean | void;
}

export type TransformImageType = 'touchTransform' | 'mouseMove' | 'wheelResize';

export class TransformableImage extends Component<Props> {
	touches: (SimpleTouch & { identifier?: number })[];
	transforming: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;
	debouncedProcessEnd: TransformableImage['processEnd'] & { clear: () => void };

	static defaultProps = {
		touchMove: true,
		mouseMove: true,
		touchResize: true,
		touchRotate: false,
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
		this.debouncedProcessEnd = debounce(this.processEnd, props.timeout);
	}

	processMove = (newTouches) => {
		const { onTransform, touchResize, touchMove, touchRotate } = this.props;
		const container = this.container.current;
		if (container && onTransform) {
			onTransform(
				touchesToImageTransform(newTouches, this.touches, container, {
					scale: touchResize,
					rotate: touchRotate,
					move: touchMove,
				}),
			);
			this.touches = newTouches;
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
		const { onTransform, wheelResize } = this.props;
		const container = this.container.current;
		if (wheelResize) {
			if (this.processEvent(event)) {
				this.processStart();
				if (onTransform && container) {
					onTransform(
						wheelEventToImageTransform(event, container, wheelResize === true ? 0.1 : wheelResize.ratio),
					);
				}

				if (!this.touches.length) {
					this.debouncedProcessEnd();
				}
			}
		}
	};
	onTouchStart = (event: TouchEvent) => {
		const { touchMove, touchResize, touchRotate } = this.props;
		if (event.cancelable && (touchMove || ((touchResize || touchRotate) && event.touches.length > 1))) {
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
				this.processMove(touches);
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
				this.processMove([
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
