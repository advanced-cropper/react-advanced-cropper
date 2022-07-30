import React, { ReactNode, CSSProperties, Component, RefObject, createRef } from 'react';
import {
	debounce,
	DebouncedFunction,
	ImageTransform,
	Point,
	SimpleTouch,
	touchesToImageTransform,
	wheelEventToImageTransform,
} from 'advanced-cropper';

interface Props {
	onTransform?: (transform: ImageTransform) => void;
	onTransformEnd?: () => void;
	onEvent?: (transformEvent: TransformableImageEvent, nativeEvent: Event) => unknown;
	disabled?: boolean;
	touchMove?: boolean;
	mouseMove?: boolean;
	touchScale?: boolean;
	touchRotate?: boolean;
	wheelScale?:
		| boolean
		| {
				ratio: number;
		  };
	timeout?: number;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
}

export class TransformableImageEvent {
	constructor({ active }: { active: boolean }) {
		this.active = active;
		this.defaultPrevented = false;
	}
	preventDefault() {
		this.defaultPrevented = true;
	}
	defaultPrevented: boolean;
	active: boolean;
}

export class TransformableImage extends Component<Props> {
	touches: (SimpleTouch & { identifier?: number })[];
	transforming: boolean;
	anchor: Point;
	container: RefObject<HTMLDivElement>;
	debouncedProcessEnd: DebouncedFunction<TransformableImage['processEnd']>;

	static defaultProps = {
		touchMove: true,
		mouseMove: true,
		touchScale: true,
		touchRotate: false,
		wheelScale: true,
		timeout: 500,
	};

	constructor(props: Props) {
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

	processMove = (newTouches: SimpleTouch[]) => {
		const { onTransform, touchScale, touchMove, touchRotate } = this.props;
		const container = this.container.current;
		if (container && onTransform) {
			onTransform(
				touchesToImageTransform(newTouches, this.touches, container, {
					scale: touchScale,
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
		const { onEvent, disabled } = this.props;
		const transformEvent = new TransformableImageEvent({ active: this.transforming });

		if (onEvent) {
			onEvent(transformEvent, nativeEvent);
		} else {
			nativeEvent.preventDefault();
			nativeEvent.stopPropagation();
		}

		return !disabled && !transformEvent.defaultPrevented;
	};

	onWheel = (event: WheelEvent) => {
		const { onTransform, wheelScale } = this.props;
		const container = this.container.current;

		if (wheelScale) {
			if (this.processEvent(event)) {
				this.processStart();
				if (onTransform && container) {
					onTransform(
						wheelEventToImageTransform(event, container, wheelScale === true ? 0.1 : wheelScale.ratio),
					);
				}

				if (!this.touches.length) {
					this.debouncedProcessEnd();
				}
			}
		}
	};
	onTouchStart = (event: TouchEvent) => {
		const { touchMove, touchScale, touchRotate } = this.props;
		if (event.cancelable && (touchMove || ((touchScale || touchRotate) && event.touches.length > 1))) {
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
	onTouchEnd = (event: TouchEvent) => {
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

	onMouseMove = (event: MouseEvent) => {
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
