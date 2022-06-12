---
title: Modifiers
sidebar_position: 2
---

:::note
This section still in the development. Stay up to date.
:::


## Basic

Modifiers is, usually, [pure functions](https://en.wikipedia.org/wiki/Pure_function) that
receives the `state` and the cropper `settings` and return the new `state` value.

## Special Functions

They are not modifiers, but they are very important and they return the state in the same way, so they are described here also.

### CreateState

The recommended way to create the state is `createState` function.
```tsx
function createState(options: CreateStateOptions, settings: CoreSettings): CropperState;
```

It returns the initial state
and accept two arguments: `options` and `settings`. The `settings` is described in the corresponding section, the `options` has the following interface:
```ts
{
	boundaries: Boundaries;
	imageSize: ImageSize;
	transforms?: ImageTransforms;
	priority?: 'visibleArea' | 'coordinates';
}
```

The `boundaries` and `imageSize` are required fields, it's the size of boundaries (e.g. cropper height and width) and
the image size that should be cropped.

The `transforms` is the just initial image transforms. It can be useful, if you get the transforms from EXIF.

The `priority` is the option that defines what will be created first: the coordinates or the visible area.

### Copy state

The function `copyState` just make deep copy of the state. It may be useful to create your own pure modifiers.

```tsx
function copyState(state: CropperState): CropperState;
```

## Default Modifiers

### Set Coordinates

```tsx
function setCoordinates(
	state: CropperState,
	settings: CoreSettings,
	transform: CoordinatesTransform | CoordinatesTransform[],
	safe?: boolean
): CropperState;
```

### Move Coordinates

```tsx
function moveCoordinates(state: CropperState, settings: CoreSettings, directions: MoveDirections ): CropperState;
```

### Resize Coordinates

```tsx
function resizeCoordinates(state: CropperState, settings: CoreSettings, directions: ResizeDirections, options: ResizeOptions): CropperState;
```

```tsx
interface ResizeOptions {
	compensate?: boolean;
	preserveRatio?: boolean;
	allowedDirections?: ResizeDirections;
	respectDirection?: 'width' | 'height';
}
```

### Transform Image
```tsx
function transformImage(
	state: CropperState,
	settings: CoreSettings & {
		adjustStencil?: boolean;
	},
	move: Partial<MoveDirections> = {},
	scale: Scale | number = 1,
): CropperState;
```

### Rotate Image

```tsx
function rotateImage(state: CropperState, settings: CoreSettings, angle: number): CropperState;
```

### Flip Image

```tsx
function flipImage(state: CropperState, settings: CoreSettings, horizontal?: boolean, vertical?: boolean): CropperState;
```

### Set Visible Area

```tsx
function setVisibleArea(state: CropperState, settings: CoreSettings, visibleArea: VisibleArea, safe?: boolean): CropperState;
```

### Set Boundary

```tsx
function setBoundary(state: CropperState, settings: CoreSettings, boundary: Boundary): CropperState;
```

### Reconcile State

```tsx
function reconcileState(state: CropperState, settings: CoreSettings): CropperState;
```
