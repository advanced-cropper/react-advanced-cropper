<p align="center"><a href="https://advanced-cropper.github.io/react-advanced-cropper/" target="_blank" rel="noopener noreferrer"><img width="133" src="https://github.com/norserium/react-advanced-cropper/blob/master/example/static/img/github-logo.svg?raw=true&timestamp=1608385818575" alt="React Advanced Cropper logo"></a></p>
<p align="center">
  <a href="https://npmcharts.com/compare/react-advanced-cropper?minimal=true"><img src="https://img.shields.io/npm/dm/react-advanced-cropper.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/react-advanced-cropper"><img src="https://img.shields.io/npm/v/react-advanced-cropper?color=6FCFF0" alt="Version"></a>
  <br>
  <a href="https://advanced-cropper.github.io/react-advanced-cropper/">Documentation</a target="_blank" rel="noopener noreferrer"> /
  <a href="https://advanced-cropper.github.io/react-advanced-cropper/docs/guides/recipes">Examples</a target="_blank" rel="noopener noreferrer"> /
  <a href="https://codesandbox.io/s/react-advanced-cropper-kkvbz">Sandbox</a target="_blank" rel="noopener noreferrer">
</p>

<h2 align="center"> </h2>

---

:warning: It's the beta version. The API can be changed in the future. Therefore, it's recommended to fix the version with `~`.

---



**React Advanced Cropper** is the advanced library that gives you opportunity to create your own croppers suited for any website design.
It means that you are able to change not only the cropper appearance, you area able to customize its behavior also.

Features:

- full mobile / desktop support
- support [all three main types of croppers](https://advanced-cropper.github.io/react-advanced-cropper/docs/guides/cropper-types) right out of the box
- support both canvas and coordinates modes, minimum and maximum aspect ratios, custom size restrictions
- zoom, rotate, resize image
- auto-zoom, transitions

![](https://github.com/norserium/vue-advanced-cropper/blob/master/example/readme/example.gif?raw=true)

## Install

```bash
npm install --save react-advanced-cropper
```

```bash
yarn add react-advanced-cropper
```

## Usage

```tsx
import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css'

export const GettingStartedExample = () => {
	const [image, setImage] = useState(
		'https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80',
	);

	const onChange = (cropper: CropperRef) => {
		console.log(cropper.getCoordinates(), cropper.getCanvas());
	};

	return (
		<Cropper
			src={image}
			onChange={onChange}
			className={'cropper'}
		/>
	)
};
```

```
/*
  Maybe you need to set the limits for the cropper sizes or its container sizes
  otherwise a cropping image will try to fill all available space
*/
.cropper {
  height: 600px;
  background: #DDD;
}
```


## Cropper

| Prop                      | Type                 | Description                                                     			      | Default
| ------------------------- | ------------------   | ---------------------------------------------------------------------------      | ---------------
| src                       | `string`             | The cropping image (link / base64)                              			      |
| stencilComponent          | `Component`          | The stencil component                                           			      | `RectangleStencil`
| stencilProps              | `object`             | The props for the stencil component                             			      | `{}`
| className                 | `string`             | The optional class for the root cropper block                   			      |
| imageClassName            | `string`             | The optional class for the cropping image                       			      |
| boundariesClassName       | `string`             | The optional class for the area.                                			      |
| backgroundClassName       | `string`             | The optional class for the background under the image           			      |
| autoZoom                  | `boolean`            | Enable / disable transitions                                     		      | `true`
| transitions               | `boolean`, `object`  | Enable / disable auto zoom                                     			      | `false`
| stencilSize               | `object `            | The size of the stencil in pixels                                          |
| canvas                    | `boolean`            | The flag that indicates if canvas should be used                			      | `true`
| minWidth                  | `number`             | The minimum width of the stencil (percents)                     			      |
| minHeight                 | `number`             | The minimum height of the stencil (percents)                    			      |
| maxWidth                  | `number`             | The maximum width of the stencil (percents)                     			      |
| maxHeight                 | `number`             | The maximum height of the stencil (percents)                    			      |
| checkOrientation          | `boolean`            | Check if EXIF orientation should be checked                     			      | `true`
| resizeImage               | `boolean`, `object`  | The options for the image resizing ([details](https://advanced-cropper.github.io/react-advanced-cropper/docs/components/Cropper#resizeimage)) | `true`
| moveImage                 | `boolean`, `object`  | The options for the image moving ([details](https://advanced-cropper.github.io/react-advanced-cropper/docs/components/Cropper#moveimage))     | `true`
| rotateImage               | `boolean`, `object`  | The options for the image moving ([details](https://advanced-cropper.github.io/react-advanced-cropper/docs/components/Cropper#rotateImage))   | `false`
| imageRestriction          | `string`             | Set restrictions for image position ('fillArea' 'fitArea', 'stencil', 'none')    | `'fillArea'`
| defaultSize               | `object`, `Function` | The function that returns the default size of the stencil or object              |
| defaultPosition           | `object`, `Function` | The function that returns the default position of the stencil or object          |
| defaultTransforms         | `object`, `Function` | The function that returns the default image transforms or object           |
| wrapperComponent          | `Component`          | The wrapper component                                           			      | `CropperWrapper`
| wrapperProps              | `object`             | The props for the wrapper component                             			      | `{}`
| backgroundWrapperComponent| `Component`          | The background wrapper component                                           | `CropperBackgroundWrapper`
| backgroundWrapperProps    | `object`             | The props for the background wrapper component                             | `{}`




See [the documentation](https://advanced-cropper.github.io/react-advanced-cropper/docs/components/Cropper) for more props and details.

## RectangleStencil

| Prop                      | Type                | Description                                                    | Default
| ------------------------  | ------------------- | -------------------------------------------------------------- | ---------------
| aspectRatio               | `number`            | The aspect ratio                                               |
| minAspectRatio            | `number`            | The minimum aspect ratio                                       |
| maxAspectRatio            | `number`            | The maximum aspect ratio                                       |
| className                 | `string`            | The class for root block of the stencil component              |
| previewClassName          | `string`            | The class for the preview component                            |
| movingClassName           | `string`            | The class applied when user drag the stencil                   |
| resizingClassName         | `string`            | The class applied when user resize the stencil                 |
| boundingBoxClass          | `string`            | The class for the bounding box component                       |
| handlerComponent          | `Component`         | The handler component                                          |
| handlers                  | `object`            | The object of handlers that should be visible or hidden.       |
| handlerClassNames         | `object`            | The object of custom handler classes                           |
| handlerWrapperClassNames  | `object`            | The object of custom handler wrapper classes                   |
| lineComponent             | `Component`         | The handler component                                          |
| lines                     | `object`            | The object of lines  that should be visible or hidden.         |
| lineClassNames            | `object`            | The object of custom line classes                              |
| lineWrapperClassNames     | `object`            | The object of custom line wrapper classes                      |

See [the documentation](https://advanced-cropper.github.io/react-advanced-cropper/docs/components/RectangleStencil) for more props and details.

## License

The source code of this library is licensed under MIT, the documentation content belongs to [Norserium](https://github.com/Norserium), except the photos that belong to their respective owners.
