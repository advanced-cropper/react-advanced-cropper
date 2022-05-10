---
title: State
sidebar_position: 1
---

# Basic

## State

The basic concept of this library is **the cropper state**.
Despite a bunch of components and hooks that this library provided to you, they are just the way to modify the state and display it to the user.

The state consists of five components: boundary, image size, visible area, coordinates and transforms.

Technically, it's the object with the following interface:
```ts
interface CropperState {
	boundary: Boundary;
	imageSize: ImageSize;
	transforms: Transforms;
	visibleArea: VisibleArea | null;
	coordinates: Coordinates | null;
}
```

There is the additional agreement that state can be `null`, if it's not initialized yet.

### Boundary

The boundary is the physical size of the cropper in pixels.

```ts
interface Boundary {
	width: number;
	height: number;
}
```

### Image size

The image size is the natural image size.

```ts
interface ImageSize {
	width: number;
	height: number;
}
```

The ratio of an image width and a boundary width (it can be height alike) plays the important role, because it defines
the ratio between physical cropper size and the internal coordinates sizes. For example, it's used in the event's normalization, because depending on this ratio moving the stencil on 1 pixel
can result in the moving of the coordinates on 0.5 pixels, 2 pixels, 3 pixels.


### Visible area

The visible area is the part of an image that displayed to an user.

```ts
interface VisibleArea {
	top: number;
	left: number;
	width: number;
	height: number;
}
```

Due its nature its aspect ratio should be equal to the aspect ratio of boundary.

### Coordinates

The coordinates represent the cropped part of an image.

```ts
interface Coordinates {
	top: number;
	left: number;
	width: number;
	height: number;
}
```

### Transforms

The transforms define the transforms applied to an image.

```ts
interface Transforms {
	rotate: number;
	flip: {
		horizontal: boolean;
		vertical: boolean;
	};
}
```
They can include flip (horizontal , vertical) and rotate.
