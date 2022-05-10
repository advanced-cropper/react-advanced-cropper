---
title: Defaults
sidebar_position: 4
---

:::note
This section still in the development. Stay up to date.
:::

## Basic

To use state modifiers in this library you should define all fields of the `settings` object:
```ts
{
	defaultCoordinates,
    defaultVisibleArea,
    areaPositionRestrictions,
    areaSizeRestrictions,
    sizeRestrictions,
    positionRestrictions,
    aspectRatio,
}
```

It's pretty complicated task, however the setting of this limitations can customize the modifiers behavior in a wild
rang.

Hopefully, you can do it only when you need to do it, because this library provides the set of flexible default
functions. They all are exported, but the recommended way to use them is the `createDefaultSettings` function.


###  Default settings

The `createDefaultSettings` function accepts the only one argument: the object. It can be empty or contain fields described above (that will be redefine defaults if you define them) and
new optional properties:
```ts
{
	minWidth?: number;
	minHeight?: number;
	maxWidth?: number;
	maxHeight?: number;
	defaultSize?: DefaultSize;
	defaultPosition?: DefaultPosition;
	defaultVisibleArea: DefaultVisibleArea;
	stencilSize?: StencilSize;
	imageRestriction?: ImageRestriction;
}
```

The using of this function let you forget about the defining `settings` completely.
```ts
const state = createState({
	boundaries: {
		width: 100,
		height: 100
	},
	imageSize: {
		width: 50,
		height: 100,
	},
	settings: createDefaultSettings()
})
```



#### `minWidth`, `minHeight`, `maxWidth`, `maxHeight`

If you didn't redefine `sizeRestrictions` this parameters will define the limitations of the coordinates
size.

#### `defaultSize`

#### `defaultPosition`

#### `defaultVisibleArea`

#### `stencilSize`

#### `imageRestriction`

## Functions

### `defaultAreaPositionRestrictions`

### `defaultAreaSizeRestrictions`

### `defaultBoundaries`

### `defaultPosition`

### `defaultSize`

### `defaultPositionRestrictions`

### `defaultSizeRestrictions`
