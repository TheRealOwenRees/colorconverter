# ColorConverter
# A zero dependency, lightweight color manipulation library.

'Stolen' from [TinyColor](https://github.com/bgrins/TinyColor), rewritten in TypeScript, and made smaller. Not all features from TinyColor have been implemented, just the ones that I find useful.

## Installation
### Npm
```bash
npm install @owenrees/colorconverter
```

### Yarn
```bash
yarn add @owenrees/colorconverter
```

pnpm
```bash
pnpm add @owenrees/colorconverter
```

[//]: # (or download the [latest release]&#40;&#41; and include the minified UMD file in your HTML. )

## Usage

### Import as ESM module
```js
import ColorConverter from 'colorconverter';

const color = new ColorConverter('red');
```

### Import as CommonJS module
```js
const ColorConverter = require('colorconverter');

const color = new ColorConverter('red');
```

### Import as UMD module
Add the following script tag to your HTML:
```html
<script src="https://unpkg.com/@owenrees/colorconverter/lib/colorconverter.umd.min.js"></script>
```

or point to the file locally:
```html
<script src="path/to/colorconverter.umd.min.js"></script>
```

Then use the global `ColorConverter` variable:

```js
const ColorConverter = window.ColorConverter;

const color = new ColorConverter('red');
```

Colour comparisons and manipulations can be done using the methods on the `ColorConverter` instance.

## Methods
Conversions between colour spaces will never be 100% accurate, therefore are only to be used as a guide or for compatibility with other systems.

### isValid
Returns a boolean indicating whether the parsed color is valid.

```js
const color = new ColorConverter('red');
color.isValid(); // true
```

### toRgb
Returns the RGB values of the color as an object, in range 0-255.

```js
const color = new ColorConverter('red');
color.toRgb(); // { r: 255, g: 0, b: 0 }
```

### toRgbString
Return a string representation of the RGB values.

```js
const color = new ColorConverter('red');
color.toRgbString(); // 'rgb(255, 0, 0)'
```

### toNormalizedRgb
Returns the RGB / RGBA values of the color as an object, in range 0-1.

```js
const color = new ColorConverter('red');
color.toNormalizedRgb(); // { r: 1, g: 0, b: 0 }
```

### toNormalizedRgbString
Return a string representation of the normalized RGB / RGBA values.

```js
const color = new ColorConverter('red');
color.toNormalizedRgbString(); // 'rgb(1, 0, 0)'
```

### toPercentageRgb
Returns the RGB / RGBA values of the color as an object, in range 0-100.

```js
const color = new ColorConverter('red');
color.toPercentageRgb(); // { r: 100, g: 0, b: 0 }

const color = new ColorConverter('rgba(255, 0, 0, 0.5)');
color.toPercentageRgb(); // { r: 100, g: 0, b: 0, a: 0.5 }
```

### toPercentageRgbString
Return a string representation of the percentage RGB / RGBA values.

```js
const color = new ColorConverter('red');
color.toPercentageRgbString(); // 'rgb(100%, 0%, 0%)'

const color = new ColorConverter('rgba(255, 0, 0, 0.5)');
color.toPercentageRgbString(); // 'rgba(100%, 0%, 0%, 0.5)'
```

### toHsv
Returns the HSV values of the color as an object.

```js
const color = new ColorConverter('red');
color.toHsv(); // { h: 0, s: 100, v: 100 }
```

### toHsvString
Return a string representation of the HSV values.

```js
const color = new ColorConverter('red');
color.toHsvString(); // 'hsv(0, 100%, 100%)'
```

### toHsl
Returns the HSL values of the color as an object.

```js
const color = new ColorConverter('red');
color.toHsl(); // { h: 0, s: 100, l: 50 }
```

### toHslString
Return a string representation of the HSL values.

```js
const color = new ColorConverter('red');
color.toHslString(); // 'hsl(0, 100%, 50%)'
```

### toHex
Returns the hex value of the color.

```js
const color = new ColorConverter('red');
color.toHex(); // 'ff0000'
```

### toHexString
Return a string representation of the hex value, with hash.

```js
const color = new ColorConverter('red');
color.toHexString(); // '#ff0000'
```

### toHex8
Returns the hex8 value of the color.

```js
const color = new ColorConverter('red');
color.toHex8(); // 'ffff0000'
```

### toHex8String
Return a string representation of the hex8 value, with hash.

```js
const color = new ColorConverter('red');
color.toHex8String(); // '#ffff0000'
```

### toCmy
Returns the CMY values of the color as an object.

```js
const color = new ColorConverter('red');
color.toCmy(); // { c: 0, m: 100, y: 100 }
```

### toCmyk
Returns the CMYK values of the color as an object.

```js
const color = new ColorConverter('red');
color.toCmyk(); // { c: 0, m: 100, y: 100, k: 0 }
```

### toXyz
Returns the XYZ values of the color as an object.

```js
const color = new ColorConverter('red');
color.toXyz(); // { x: 41.24, y: 21.26, z: 1.93 }
```

### toXyzString
Return a string representation of the XYZ values.

```js
const color = new ColorConverter('red');
color.toXyzString(); // 'xyz(41.24, 21.26, 1.93)'
```

### toLab
Returns the LAB values of the color as an object.

```js
const color = new ColorConverter('red');
color.toLab(); // { l: 53.24, a: 80.09, b: 67.2 }
```

### toLabString
Return a string representation of the LAB values.

```js
const color = new ColorConverter('red');
color.toLabString(); // 'lab(53.24, 80.09, 67.2)'
```

### toLch
Returns the LCH values of the color as an object.

```js
const color = new ColorConverter('red');
color.toLch(); // { l: 53.24, c: 103.54, h: 40.85 }
```

### toLchString
Return a string representation of the LCH values.

```js
const color = new ColorConverter('red');
color.toLchString(); // 'lch(53.24, 103.54, 40.85)'
```

### getBrightness
Returns the perceived brightness of the color, as a number between 0 and 255.

```js
const color = new ColorConverter('red');
color.getBrightness(); // 76.245
```

### getLuminance
Returns the relative luminance of the color, as a number between 0 and 1.

```js
const color = new ColorConverter('red');
color.getLuminance(); // 0.2126
```

### isDark
Returns a boolean indicating whether the color is dark.

```js
const color = new ColorConverter('red');
color.isDark(); // true
```

### isLight
Returns a boolean indicating whether the color is light.

```js
const color = new ColorConverter('red');
color.isLight(); // false
```

### getFormat
Returns the format of the color.

```js
const color = new ColorConverter('fff000');
color.getFormat(); // 'hex'
```

### getAlpha
Returns the alpha value of the color, as a number between 0 and 1.

```js
const color = new ColorConverter('rgba(255, 0, 0, 0.5)');
color.getAlpha(); // 0.5
```

### setAlpha
Sets the alpha value of the color.

```js
const color = new ColorConverter('red');
console.log(color.getAlpha()); // 1

color.setAlpha(0.5);
color.toRgbString(); // 'rgba(255, 0, 0, 0.5)'
```

### toName
Returns the name of the current color if it exists as a named CSS colour, or undefined if it doesn't.

```js
const color = new ColorConverter('rgb(255, 0, 0)');
color.toName(); // 'red'
```

### toNearestNamedColor
Returns the name of the nearest named CSS colour, or undefined if it doesn't exist.

```js
const color = new ColorConverter('rgb(253, 10, 0)');
color.toNearestNamedColor(); // 'red'
```

### equals
Returns a boolean indicating whether the color is equal to the supplied color.

```js
const color = new ColorConverter('hsl(0, 100%, 50%)');
color.equals('red'); // true
```

### random
Returns a random color.

```js
const color = ColorConverter.random();
color.toRgbString(); // 'rgb(252, 27, 65)'
```

### clone
Returns a clone of the current color instance.

```js
const color = new ColorConverter('red');
const clone = color.clone();

color.equals(clone); // true
```

### readability
Returns a WCAG readability score for the color, based on the supplied secondary color.

```js
const color = new ColorConverter('red');
color.readability('white'); // 3.998
```

### isReadable
Returns an object of booleans indicating whether the color is readable against the supplied secondary color.

```js
const color = new ColorConverter('rgb(13, 114, 103)');
color.isReadable('white');
// {
//   AA: {
//      large: true,
//      normal: true,
//      small: false
//   },
//   AAA: {
//      large: true,
//      normal: false,
//      small: false
//   }
// }
```

### complementary
Returns a complementary color based on the current color.

```js
const color = new ColorConverter('red');
color.complementary()
// [
//   { h: 0, s: 100, l: 50 },
//   { h: 180, s: 100, l: 50 },
// ]
```

### complementaryString
Returns a string representation of the complementary color based on the current color.

```js
const color = new ColorConverter('red');
color.complementaryString();
// [
//   'hsl(0, 100%, 50%)',
//   'hsl(180, 100%, 50%)',
// ]
```

### triadic
Returns a triad of colors based on the current color.

```js
const color = new ColorConverter('red');
color.triadic()
// [
//   { h: 0, s: 100, l: 50 },
//   { h: 120, s: 100, l: 50 },
//   { h: 240, s: 100, l: 50 },
// ]
```

### triadicString
Returns a string representation of the triad of colors based on the current color.

```js
const color = new ColorConverter('red');
color.triadicString();
// [
//   'hsl(0, 100%, 50%)',
//   'hsl(120, 100%, 50%)',
//   'hsl(240, 100%, 50%)',
// ]
```

### tetradic
Returns a tetrad of colors based on the current color.

```js
const color = new ColorConverter('red');
color.tetradic()
// [
//   { h: 0, s: 100, l: 50 },
//   { h: 90, s: 100, l: 50 },
//   { h: 180, s: 100, l: 50 },
//   { h: 270, s: 100, l: 50 },
// ]
```

### tetradicString
Returns a string representation of the tetrad of colors based on the current color.

```js
const color = new ColorConverter('red');
color.tetradicString();
// [
//   'hsl(0, 100%, 50%)',
//   'hsl(90, 100%, 50%)',
//   'hsl(180, 100%, 50%)',
//   'hsl(270, 100%, 50%)',
// ]
```

### splitComplementary
Returns a split complementary color based on the current color.

```js
const color = new ColorConverter("rgb(147, 64, 191)");
color.splitComplementary(7) // default parameter is 5
// [
//   { h: 279, s: 50, l: 50 },
//   { h: 330, s: 50, l: 50 },
//   { h: 22, s: 50, l: 50 },
//   { h: 73, s: 50, l: 50 },
//   { h: 125, s: 50, l: 50 },
//   { h: 176, s: 50, l: 50 },
//   { h: 228, s: 50, l: 50 },
// ]
```

### splitComplementaryString
Returns a string representation of the split complementary color based on the current color.

```js
const color = new ColorConverter("rgb(147, 64, 191)");
color.splitComplementaryString(7) // default parameter is 5
// [
//   'hsl(279, 50%, 50%)',
//   'hsl(330, 50%, 50%)',
//   'hsl(22, 50%, 50%)',
//   'hsl(73, 50%, 50%)',
//   'hsl(125, 50%, 50%)',
//   'hsl(176, 50%, 50%)',
//   'hsl(228, 50%, 50%)',
// ]
```

### monochromatic
Returns a monochromatic palette color based on the current color.

```js
const color = new ColorConverter("rgb(214, 92, 92)");
color.monochromatic(5, 10, 10) // (count, lightnessStep, saturationStep), defaults are (3, 100/count, 100/count)
// [
//   { h: 0, s: 20, l: 20 },
//   { h: 0, s: 40, l: 40 },
//   { h: 0, s: 60, l: 60 },
//   { h: 0, s: 80, l: 80 },
//   { h: 0, s: 100, l: 100 },
```

### monochromaticString
Returns a string representation of the monochromatic palette color based on the current color.

```js
const color = new ColorConverter("rgb(214, 92, 92)");
color.monochromaticString(5, 10, 10) // (count, lightnessStep, saturationStep), defaults are (3, 100/count, 100/count)
// [
//   'hsl(0, 20%, 20%)',
//   'hsl(0, 40%, 40%)',
//   'hsl(0, 60%, 60%)',
//   'hsl(0, 80%, 80%)',
//   'hsl(0, 100%, 100%)',
// ]
```

## Acknowledgements
[TinyColor](https://github.com/bgrins/TinyColor) for inspiring this library.
