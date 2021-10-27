---
title: Basic
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


## State Modifiers

The state is useless itself. It just a bunch of data. To make it useful there are plenty of different
[modifiers](/docs/concept/modifiers):
- transform image
- flip image
- rotate image
- set boundary
- set coordinates
- set visible area
- move coordinates
- resize coordinates

They are [pure functions](https://en.wikipedia.org/wiki/Pure_function) that receives the `state` and the cropper `settings` and
return the new `state` value.

Also, there are two auxiliary functions: [`createState`](/docs/concept/modifiers/#createstate) and [`copyState`](/docs/concept/modifiers/#copystate) that in some sense similar to modifiers.

## Settings

To use  [the default modifiers](/docs/concept/modifiers) described above you should define `settings` before.
This object may be considered as props in a some component framework.

[The settings](/docs/concept/settings) are the most basic constraints that applies to the state, they includes:
- default coordinates
- default visible area
- area position restrictions
- area size restrictions
- size restrictions
- positions restrictions
- aspect ratio

By defining this settings in different ways you can create a lot of different cropper behaviors without even creating your own
modifiers. However, it's pretty complicated to define them all on your own, so this library provides special
function `withDefaults` that add to  an object all that methods. They are described in [the corresponding section](/docs/concept/defaults).


## Image

Image is the another basic concept of this library. According to the convention it should have `CropperImage` type:
```tsx
interface CropperImage {
	src: string;
	revoke: boolean;
	transforms: Transforms;
	arrayBuffer: ArrayBuffer | null;
	width: number;
	height: number;
}
```

The meaning of the fields are the following:

- `src` - the link to the image
- `width` - the image width
- `height` - the image height
- `transforms` - the transforms applied to the image
- `revoke` - flag that indicates should be the image revoked (by `window/revokeObjectURL`)
- `arrayBuffer` - the content of the image in bytes


Usually, it's gotten by [`loadImage`](/docs/concept/utils#load-image) function.

## Transitions

Transitions is the object describes the current transitions.
According to the convention it should have `CropperTransitions` type:
```tsx
interface CropperTransitions {
	timingFunction: string;
	duration: number;
	active: boolean;
}
```
