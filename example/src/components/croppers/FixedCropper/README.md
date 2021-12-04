# Fixed Cropper

It's the example of the fixed cropper, i.e. cropper with the immovable stencil. The selecting cropped area
is performed by moving and scaling the background image below.

![](https://github.com/norserium/react-advanced-cropper/blob/master/example/static/img/fixed-cropper.png?raw=true)

This example shows how to easily add the custom zoom slider.

## Algorithms

The problem is that there is no absolute zoom in this cropper now due it's flexible nature.
It's not obvious what value it should be in a lot of possible settings combinations.

In this cropper demonstrated one of the possible ways to define absolute zoom and effectively
use it to create the zoom slider.

### Functions


### `getAbsoluteZoom(state, settings)`

This function returns the current absolute visible area size (with respect to different `imageRestrictions` values).
It's belong to `[0, 1]`, where `0` is the minimum size, and `1` is the maximum size.

### `getVisibleAreaSize(state, settings, absoluteZoom`

This function converts some value of absolute zoom that belongs to `[0, 1]` to the actual
visible area size. It's useful to translate the absolute zoom to relative zoom.

### How to use

The using of these functions is pretty straightforward.

#### Getting the current absolute zoom

```tsx
const absoluteZoom = state ? getAbsoluteZoom(state, cropper.getSettings()) : 0;
```

#### Zooming the cropper to specific absolute zoom:

```tsx
const onZoom = (value: number, transitions?: boolean) => {
  if (cropper) {
    cropper.zoomImage(
      getVisibleAreaSize(cropper.getState(), cropper.getSettings(), absoluteZoom) /
        getVisibleAreaSize(cropper.getState(), cropper.getSettings(), value),
      {
        transitions,
      },
    );
  }
};
```

## License

The source code of this example is licensed under MIT. Feel free to use it in your projects.
