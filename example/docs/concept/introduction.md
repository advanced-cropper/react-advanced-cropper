---
title: Introduction
sidebar_position: 0
---

import { State } from '../../src/components/images/concept/introduction/State';

# Introduction

## State

<State/>

 The basic concept of this library is **[the cropper state](/docs/concept/state)**.
Despite a bunch of components and hooks that this library provided to you, they are just the way to modify the state and display it to the user.

But the state is useless itself. You can use it to display the result to the user, but that's all.


## State Modifiers

**[The state modifiers](/docs/concept/modifiers)** is the general name of functions that change the cropper state (preferably by returning its clone).
Generally, it can be an arbitrary functions, but it's recommended to describe them by the following signature:
```tsx
function stateModifier(state: CropperState, settings: CoreSettings, ...otherArguments): CropperState
```

It accept state, settings and perhaps some arguments and return the updated state. What's **[the settings](/docs/concept/settings)**? This is the another concept that you should know to use this library.

### Settings

**The settings** is a bunch of parameters that used by the state modifiers and the different helpers. Not random one.
It should be the minimal set of parameters that can be used to make the most operations on the cropper state.

The developer of this library summarized them into `CoreSettings`. It contains the following parameters:
- Default coordinates
- Default visible area
- Area position restrictions
- Area size restrictions
- Size restrictions
- Position restrictions
- Aspect ratio

It's recommended to extend this interface to get the possibility to use most helpers and state modifiers in this library.
You can create your own settings set, modifiers and helpers from a scratch, but why do you need this library in this case?

![Settings](/img/concept/introduction/settings.svg)

Some of the default state modifiers requires the extended settings. For example, `transformImage` has the following signature:

```tsx
function transformImage(state: CropperState, settings: CoreSettings & ModifiersSettings, ...otherArguments): CropperState
```

You can create similar modifiers that will require extended settings. It will give you the possibility to use the default modifiers and helpers and
pass some additional parameters in the same time.

When you should pass parameters as additional arguments and when you should pass parameters in the settings? To answer on this question think of settings
as context, global variables.

Will the parameters be used by different modifiers? Are you not able to get access to the called modifier to pass additional arguments? Use the settings!


### Default Settings

The defining of all settings is a tedious task. To make it easier there is the `createDefaultSettings` function that give
you the possibility to create the default settings in a moment.

It returns `DefaultSettings`, the extension of `CoreSettings` that has the following additional parameters:

- Min width
-	Min height
-	Max width
-	Max height
-	Default size
-	Default position
-	Image restriction

First of all, they are used to define the core settings fields, but they can be used on your own.

[Read more here](/docs/concept/defaults).


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
