---
title: Settings
sidebar_position: 3
---

:::note
This section still in the development. Stay up to date.
:::

## Introduction

To use the state modifiers in this library you should define all fields of the settings object:
```tsx
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


## Fields


### Default coordinates

The `defaultCoordinates` is the flexible way to set the initial stencil coordinates.

It has the following typing:
```ts
type DefaultCoordinates<Settings = CoreSettings> =
	| (Transform | Transform[])
	| ((state: CropperState, settings: Settings) => Transform | Transform[]);
```
```ts
type Transform = ((state: CropperState) => Partial<Coordinates>) | Partial<Coordinates>;
```

I.e., you can pass the object with coordinates to this parameter, or the function that returns
default coordinates, or event the array of the functions. This function works just like `setCoordinates` modifier, so you can check its example for details.

### Default visible area

The `defaultVisibleArea` is the flexible way to set the initial visible area value.

```ts
type DefaultVisibleArea<Settings = CoreSettings> =
	| VisibleArea
	| ((state: CropperState, props: Settings) => VisibleArea);
```

I.e. it can be the object with visible area coordinates or the function that returns the default visible area.

### Area position restrictions

The `areaPositionRestrictions` is the limitations of the `visibleArea` position. It should have type:
```ts
AreaPositionRestrictions | ((state: CropperState, settings: CoreSettings) => AreaPositionRestrictions);
```

Where `AreaPositionRestrictions` is:
```ts
{
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}
```

If you don't need any restrictions, pass the empty object `{}`

### Area size restrictions

The `areaSizeRestrictions` is the limitations of the `visibleArea` size. It should have type:
```ts
AreaSizeRestrictions | ((state: CropperState, settings: CoreSettings) => AreaSizeRestrictions);
```

Where `AreaSizeRestrictions` is:
```ts
{
	minWidth: number;
	maxWidth: number;
	minHeight: number;
	maxHeight: number;
}
```

If you don't need any restrictions, pass the following object:
```
{
	minWidth: 0,
	minHeight: 0,
	maxWidth: Infinity,
	maxHeight: Infinity
}
```

### Positions restrictions

The `positionRestrictions` is the limitations of the `coordinates` position. It should have type:
```ts
PositionRestrictions | ((state: CropperState, settings: CoreSettings) => PositionRestrictions);
```

Where `PositionRestrictions` is:
```ts
{
	top?: number;
	left?: number;
	right?: number;
	bottom?: number;
}
```

If you don't need any restrictions, pass the empty object `{}`

### Size restrictions


The `sizeRestrictions` is the limitations of the `coordinates` size. It should have type:
```ts
SizeRestrictions | ((state: CropperState, settings: CoreSettings) => SizeRestrictions);
```

Where `SizeRestrictions` is:
```ts
{
	minWidth: number;
	maxWidth: number;
	minHeight: number;
	maxHeight: number;
}
```

If you don't need any restrictions, pass the following object:
```
{
	minWidth: 0,
	minHeight: 0,
	maxWidth: Infinity,
	maxHeight: Infinity
}
```

### Aspect ratio

The `aspectRatio` is the limitations for aspect ratio of the coordinates. It has the following type:
```ts
AspectRatio | ((state: CropperState, setting: CoreSettings) => AspectRatio)
```

Where `AspectRatio` is:
```ts
	minimum?: number;
	maximum?: number;
```

If you don't need any restrictions, pass the empty object `{}`
