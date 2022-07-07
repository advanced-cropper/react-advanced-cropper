---
title: Utils
sidebar_position: 6
---

:::warning
It's the part of the unstable API. Use it carefully. Everything can be changed in the future.
:::



## Modifiers of state components

### Fit Coordinates

```tsx
function fitCoordinates(state: CropperState, settings: CoreSettings): Coordinates;
```

### Fit Visible Area

```tsx
function fitVisibleArea(state: CropperState, settings: CoreSettings): VisibleArea;
```

### Resize Coordinates Algorithm
```tsx
function resizeCoordinatesAlgorithm(
	coordinates: Coordinates,
	directions: ResizeDirections,
	options: ResizeOptions,
	limitations: ResizeLimitations,
): Coordinates;
```

```tsx
interface ResizeOptions {
	compensate?: boolean;
	preserveRatio?: boolean;
	allowedDirections?: ResizeDirections;
	respectDirection?: 'width' | 'height';
}
```

```tsx
interface ResizeLimitations {
	aspectRatio: AspectRatio;
	sizeRestrictions: SizeRestrictions;
	positionRestrictions: PositionRestrictions;
}
```


### Move Coordinates Algorithm

```tsx
function moveCoordinatesAlgorithm(
	coordinates: Coordinates,
	directions: MoveDirections,
	positionRestrictions: PositionRestrictions,
): Coordinates;
```

### Round Coordinates

```tsx
function roundCoordinates(state: CropperState, settings: CoreSettings): Coordinates;
```


## Touch

### Get a mean touch

```tsx
function getMeanTouch(touches: SimpleTouch[]): SimpleTouch;
```

### Calculate geometric properties

```tsx
function calculateGeometricProperties(touches: SimpleTouch[], container: HTMLElement): GeometricProperties;
```

### Create touch resize event

```tsx
function createTouchResizeEvent(oldProperties: GeometricProperties, newProperties: GeometricProperties): TransformImageEvent
```


### Create touch resize event

```tsx
function createTouchMoveEvent(oldTouches: SimpleTouch[], newTouches: SimpleTouch[]): TransformImageEvent
```

### Create wheel resize event

```tsx
function createWheelResizeEvent(
	event: WheelEvent & { wheelDelta?: number },
	container: HTMLElement,
	ratio = 0.1,
): ResizeEvent;
```


## Canvas

### Draw the cropped area

```tsx
function drawCroppedArea(
	state: CropperState,
	image: HTMLImageElement,
	resultCanvas: HTMLCanvasElement,
	spareCanvas: HTMLCanvasElement,
	options: DrawOptions,
)
```

```tsx
interface DrawOptions {
	width?: number;
	height?: number;
	minWidth?: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	maxArea?: number;
	imageSmoothingQuality?: 'low' | 'medium' | 'high';
	imageSmoothingEnabled?: boolean;
	fillColor?: string;
}
```


## Events

### Normalize transform image event

```tsx
function normalizeTransformImageEvent(state: CropperState, event: TransformImageEvent): TransformImageEvent;
```

### Normalize move event
```tsx
function normalizeMoveEvent(state: CropperState, event: MoveEvent): MoveEvent;
```

### Normalize resize event
```tsx
function normalizeResizeEvent(state: CropperState, event: ResizeEvent): ResizeEvent;
```


## Getters

### Get area size restrictions

```tsx
function getAreaSizeRestrictions(state: CropperState, settings: CoreSettings)
```

### Get area position restrictions

```tsx
function getAreaPositionRestrictions(state: CropperState, settings: CoreSettings)
```

### Get size restrictions

```tsx
function getSizeRestrictions(state: CropperState, settings: CoreSettings)
```

### Get positions restrictions

```tsx
function getPositionRestrictions(state: CropperState, settings: CoreSettings)
```

### Get coefficient

```tsx
function getCoefficient(state: CropperState)
```

### Get stencil coordinates

```tsx
function getStencilCoordinates(state: CropperState | null)
```

### Get aspect ratio

```tsx
function getAspectRatio(state: CropperState, settings: CoreSettings)
```

### Get default coordinates

```tsx
function getDefaultCoordinates(state: CropperState, settings: CoreSettings)
```

### Get default visible area

```tsx
function getDefaultVisibleArea(state: CropperState, settings: CoreSettings)
```

### Get area size restrictions

```tsx
function getTransformedImageSize(state: CropperState)
```

### Get area size restrictions

```tsx
function getComputedTransforms(state: CropperState)
```

```tsx
function getMinimumSize(state: CropperState)
```


## Image

### Load Image

```tsx
function loadImage(src: string, settings: LoadImageSettings = {}): Promise<CropperImage>
```

### Get Preview Style

```tsx
function getImageStyle(image: CropperImage, state: CropperState, transitions: CropperTransitions)
```

### Get Image Style

```tsx
function getPreviewStyle(
	image: CropperImage,
	state: CropperState,
	transitions: CropperTransitions | null,
	size: Size,
)
```

### Get Mime Type

```tsx
function getMimeType(arrayBuffer, fallback = null): string
```

## Size

### Approximate Size

```tsx
function approximateSize(params: {
	width: number;
	height: number;
	sizeRestrictions: SizeRestrictions;
	aspectRatio?: AspectRatio;
}): Size
```

## State

### Compare states

```tsx
function isEqualState(a: CropperState | null, b: CropperState | null): boolean
```

## Restrictions

### Get broken ratio

```tsx
function getBrokenRatio(currentAspectRatio: number, aspectRatio: AspectRatio): number | undefined
```

### Fit to the size restrictions

```tsx
function fitToSizeRestrictions(coordinates: Size, sizeRestrictions: SizeRestrictions)
```

### Resize to the size restrictions

```tsx
function resizeToSizeRestrictions(coordinates: Coordinates, sizeRestrictions: SizeRestrictions)
```

### Convert position restrictions to size restrictions

```tsx
function positionToSizeRestrictions(positionRestrictions: PositionRestrictions): SizeRestrictions
```

### Merge position restrictions

```tsx
function mergePositionRestrictions(a: PositionRestrictions, b: PositionRestrictions): SizeRestrictions;
```

### Fit to position restrictions

```tsx
function fitToPositionRestrictions(coordinates: Coordinates, positionRestrictions: PositionRestrictions): MoveDirections;
```

### Move to position restrictions

```tsx
function moveToPositionRestrictions(coordinates: Coordinates, positionRestrictions: PositionRestrictions): Coordinates;
```

### Convert coordinates to positions restrictions

```tsx
function coordinatesToPositionRestrictions(coordinates: Coordinates): PositionRestrictions
```

## Geometry

### Rotate size

```tsx
function rotateSize(size: Size, angle: number)
```

### Rotate point

```tsx
function rotatePoint(point: Point, angle: number, anchor?: Point)
```

### To limits

```tsx
function toLimits(object: Coordinates): Limits
```

### Diff

```tsx
function diff(firstObject: Point, secondObject: Point): Diff
```

### Distance between sizes

```tsx
function sizeDistance(a: Size, b: Size): number
```

### Get center

```tsx
function getCenter(object: Coordinates): Point
```

### Get intersections

```tsx
function getIntersections(object: Coordinates, limits: Limits): Intersections
```

### Apply directions

```tsx
function applyDirections(coordinates: Coordinates, directions: ResizeDirections): Coordinates
```

### Inverse move

```tsx
function inverseMove(directions: MoveDirections): MoveDirections
```

### Apply move

```tsx
function applyMove(object: Coordinates, move: MoveDirections): Coordinates
```

### Apply scale

```tsx
function applyScale(object: Coordinates, scaleFactor: number, center?: Point, progress?: number): Coordinates
```

### Get ratio

```tsx
function ratio(object: Size): number
```

### Get maximum scale

```tsx
function maxScale(size: Size, restrictions: SizeRestrictions): number
```

### Get minimum scale

```tsx
function minScale(size: Size, restrictions: SizeRestrictions): number
```

## Math

### Is roughly equal

```tsx
function isRoughlyEqual(a: number, b: number, tolerance = 1e-3): boolean;
```

### Is greater

```tsx
function isGreater(a: number, b: number, tolerance?: number): boolean;
```

### Is lower

```tsx
function isLower(a: number, b: number, tolerance?: number): boolean;
```
