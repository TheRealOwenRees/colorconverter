# ColorConvertor
# A zero dependency, lightweight color manipulation library.

'Stolen' from [TinyColor](https://github.com/bgrins/TinyColor), rewritten in TypeScript, and made smaller. Not all features from TinyColor have been implemented, just the ones that I find useful.


## Usage

## Methods

### getInput

### getColorObj

### getRgbObj

### isValid

### setColor
Overwrite the instance's color with a new color.

### fromRatio

### toRgb

### toRgbString

### toHsv

### toHsvString

### toHsl

### toHslString

### toHex

### toHexString

### toHex8

### toHex8String

### getBrightness

### getLuminance

### isDark

### isLight

### getFormat

### getAlpha

### setAlpha

### toNormalizedRgb
Returns the color as an object of normalized RGB values (0-1).

### toNormalizedRgba
Returns the color as an object of normalized RGBA values (0-1).
### toName
Returns the name of the current color if it exists, or undefined if it doesn't.

### toNearestNamedColor

### toNearestWebSafeColor

### toPercentageRgb

### toPercentageRgbString

### equals
Compare the current color to the color passed into the method. Returns a boolean indicating whether the colors match.

### random
Returns a random color in RGB format.

### clone
Copy the current instance.

### readability

### isReadable

## Acknowledgements
