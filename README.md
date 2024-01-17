# ColorConvertor
# A zero dependency, lightweight color manipulation library.

'Stolen' from [TinyColor](https://github.com/bgrins/TinyColor), rewritten in TypeScript, and made smaller. Not all features from TinyColor have been implemented, just the ones that I find useful.

## Installation
### Npm
```bash
npm install color-convertor
```

### Yarn
```bash
yarn add color-convertor
```

pnpm
```bash
pnpm add color-convertor
```

or download the [latest release]() and include the minified UMD file in your HTML. 

## Usage

### Import as ESM module
```js
import ColorConvertor from 'color-convertor';

const color = new ColorConvertor('red');
```

### Import as CommonJS module
```js
const ColorConvertor = require('color-convertor');

const color = new ColorConvertor('red');
```

### Import as UMD module
Add the following script tag to your HTML:
```html
<script src="https://unpkg.com/color-convertor/dist/color-convertor.umd.js"></script>
```

or point to the file locally:
```html
<script src="path/to/color-convertor.umd.js"></script>
```

Then use the global `ColorConvertor` variable:
```js
const ColorConvertor = window.ColorConvertor;

const color = new ColorConvertor('red');
```

Colour comparisons and manipulations can be done using the methods on the `ColorConvertor` instance.

## Methods
Conversions between colour spaces will never be 100% accurate, therefore are only to be used as a guide or for compatibility with other systems.

### isValid
Returns a boolean indicating whether the parsed color is valid.
```js
const color = new ColorConvertor('red');
color.isValid(); // true
```

### toRgb
Returns the RGB values of the color as an object, in range 0-255.
```js
const color = new ColorConvertor('red');
color.toRgb(); // { r: 255, g: 0, b: 0 }
```

### toRgbString
Return a string representation of the RGB values.
```js
const color = new ColorConvertor('red');
color.toRgbString(); // 'rgb(255, 0, 0)'
```

### toNormalizedRgb
Returns the RGB / RGBA values of the color as an object, in range 0-1.
```js
const color = new ColorConvertor('red');
color.toNormalizedRgb(); // { r: 1, g: 0, b: 0 }
```

### toNormalizedRgbString
Return a string representation of the normalized RGB / RGBA values.
```js
const color = new ColorConvertor('red');
color.toNormalizedRgbString(); // 'rgb(1, 0, 0)'
```

### toPercentageRgb
Returns the RGB / RGBA values of the color as an object, in range 0-100.
```js
const color = new ColorConvertor('red');
color.toPercentageRgb(); // { r: 100, g: 0, b: 0 }

const color = new ColorConvertor('rgba(255, 0, 0, 0.5)');
color.toPercentageRgb(); // { r: 100, g: 0, b: 0, a: 0.5 }
```

### toPercentageRgbString
Return a string representation of the percentage RGB / RGBA values.
```js
const color = new ColorConvertor('red');
color.toPercentageRgbString(); // 'rgb(100%, 0%, 0%)'

const color = new ColorConvertor('rgba(255, 0, 0, 0.5)');
color.toPercentageRgbString(); // 'rgba(100%, 0%, 0%, 0.5)'
```

### toHsv
Returns the HSV values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toHsv(); // { h: 0, s: 100, v: 100 }
```

### toHsvString
Return a string representation of the HSV values.
```js
const color = new ColorConvertor('red');
color.toHsvString(); // 'hsv(0, 100%, 100%)'
```

### toHsl
Returns the HSL values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toHsl(); // { h: 0, s: 100, l: 50 }
```

### toHslString
Return a string representation of the HSL values.
```js
const color = new ColorConvertor('red');
color.toHslString(); // 'hsl(0, 100%, 50%)'
```

### toHex
Returns the hex value of the color.
```js
const color = new ColorConvertor('red');
color.toHex(); // 'ff0000'
```

### toHexString
Return a string representation of the hex value, with hash.
```js
const color = new ColorConvertor('red');
color.toHexString(); // '#ff0000'
```

### toHex8
Returns the hex8 value of the color.
```js
const color = new ColorConvertor('red');
color.toHex8(); // 'ffff0000'
```

### toHex8String
Return a string representation of the hex8 value, with hash.
```js
const color = new ColorConvertor('red');
color.toHex8String(); // '#ffff0000'
```

### toCmy
Returns the CMY values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toCmy(); // { c: 0, m: 100, y: 100 }
```

### toCmyk
Returns the CMYK values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toCmyk(); // { c: 0, m: 100, y: 100, k: 0 }
```

### toXyz
Returns the XYZ values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toXyz(); // { x: 41.24, y: 21.26, z: 1.93 }
```

### toXyzString
Return a string representation of the XYZ values.
```js
const color = new ColorConvertor('red');
color.toXyzString(); // 'xyz(41.24, 21.26, 1.93)'
```

### toLab
Returns the LAB values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toLab(); // { l: 53.24, a: 80.09, b: 67.2 }
```

### toLabString
Return a string representation of the LAB values.
```js
const color = new ColorConvertor('red');
color.toLabString(); // 'lab(53.24, 80.09, 67.2)'
```

### toLch
Returns the LCH values of the color as an object.
```js
const color = new ColorConvertor('red');
color.toLch(); // { l: 53.24, c: 103.54, h: 40.85 }
```

### toLchString
Return a string representation of the LCH values.
```js
const color = new ColorConvertor('red');
color.toLchString(); // 'lch(53.24, 103.54, 40.85)'
```

### getBrightness
Returns the perceived brightness of the color, as a number between 0 and 255.
```js
const color = new ColorConvertor('red');
color.getBrightness(); // 76.245
```

### getLuminance
Returns the relative luminance of the color, as a number between 0 and 1.
```js
const color = new ColorConvertor('red');
color.getLuminance(); // 0.2126
```

### isDark
Returns a boolean indicating whether the color is dark.
```js
const color = new ColorConvertor('red');
color.isDark(); // true
```

### isLight
Returns a boolean indicating whether the color is light.
```js
const color = new ColorConvertor('red');
color.isLight(); // false
```

### getFormat
Returns the format of the color.
```js
const color = new ColorConvertor('fff000');
color.getFormat(); // 'hex'
```

### getAlpha
Returns the alpha value of the color, as a number between 0 and 1.
```js
const color = new ColorConvertor('rgba(255, 0, 0, 0.5)');
color.getAlpha(); // 0.5
```

### setAlpha
Sets the alpha value of the color.
```js
const color = new ColorConvertor('red');
console.log(color.getAlpha()); // 1

color.setAlpha(0.5);
color.toRgbString(); // 'rgba(255, 0, 0, 0.5)'
```

### toName
Returns the name of the current color if it exists as a named CSS colour, or undefined if it doesn't.
```js
const color = new ColorConvertor('rgb(255, 0, 0)');
color.toName(); // 'red'
```

### toNearestNamedColor
Returns the name of the nearest named CSS colour, or undefined if it doesn't exist.
```js
const color = new ColorConvertor('rgb(253, 10, 0)');
color.toNearestNamedColor(); // 'red'
```

### equals
Returns a boolean indicating whether the color is equal to the supplied color.
```js
const color = new ColorConvertor('hsl(0, 100%, 50%)');
color.equals('red'); // true
```

### random
Returns a random color.
```js
const color = ColorConvertor.random();
color.toRgbString(); // 'rgb(252, 27, 65)'
```

### clone
Returns a clone of the current color instance.
```js
const color = new ColorConvertor('red');
const clone = color.clone();

color.equals(clone); // true
```

### readability
Returns a WCAG readability score for the color, based on the supplied secondary color.
```js
const color = new ColorConvertor('red');
color.readability('white'); // 3.998
```

### isReadable
Returns an object of booleans indicating whether the color is readable against the supplied secondary color.
```js
const color = new ColorConvertor('rgb(13, 114, 103)');
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

## Acknowledgements
