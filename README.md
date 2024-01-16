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

### toNormalizedRgbString

### toNormalizedRgba

### toNormalizedRgbaString

### toPercentageRgb

### toPercentageRgbString

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

### getLuminance

### isDark

### isLight

### getFormat

### getAlpha

### setAlpha

### toName
Returns the name of the current color if it exists as a named CSS colour, or undefined if it doesn't.
```js
const color = new ColorConvertor('rgb(255, 0, 0)');
color.toName(); // 'red'
```

### toNearestNamedColor

### toNearestWebSafeColor

### equals

### random

### clone

### readability

### isReadable

## Acknowledgements
