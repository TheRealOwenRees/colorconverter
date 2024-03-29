import { type CmykObject, type ColorConverterInterface, type ColorObjType, type HslObject, type HsvObject, type LabObject, type LchObject, type RgbObject, type WcagContrastInterface, type XyzObject } from "./types";
declare class ColorConverter implements ColorConverterInterface {
    private _colorInput;
    private _colorObj;
    private _rgbObj;
    constructor(colorInput?: string);
    getInput(): string;
    getColorObj(): ColorObjType;
    getRgbObj(): RgbObject;
    protected setInput(colorInput: string): void;
    protected setColorObj(colorObj: ColorObjType): void;
    protected setRbgObj(rgbObj: RgbObject): void;
    setColor(color: string): void;
    /**
     * Checks if the parsed color is valid
     * @returns {boolean} - true if the parsed color is valid
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.isValid() // true
     */
    isValid(): boolean;
    /**
     * Returns the RGB values in the range 0-255
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toRgb() // { r: 255, g: 0, b: 0 }
     */
    toRgb(): RgbObject;
    /**
     * Returns the RGB values in the range 0-255 as a string
     * @returns {string} - RGB values string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toRgbString() // "rgb(255, 0, 0)"
     */
    toRgbString(): string;
    /**
     * Returns the RGB values in the range 0-1
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toNormalizedRgb() // { r: 1, g: 0, b: 0 }
     */
    toNormalizedRgb(): RgbObject;
    toNormalizedRgbString(): string;
    /**
     * Converts the current color to  HSV
     * @returns {HsvObject} - HSV values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsv() // { h: 0, s: 100, v: 100 }
     */
    toHsv(): HsvObject;
    /**
     * Converts the current color to HSV as a string
     * @returns {string} - HSV values as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsvString() // "hsv(0, 100%, 100%)"
     */
    toHsvString(): string;
    /**
     * Converts the current color to HSL
     * @returns {HslObject} - HSL values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsl() // { h: 0, s: 100, l: 50 }
     */
    toHsl(): HslObject;
    /**
     * Converts the current color to HSL as a string
     * @returns {string} - HSL values as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHslString() // "hsl(0, 100%, 50%)"
     */
    toHslString(): string;
    /**
     * Converts the current color to Hex
     * @returns {string} - Hex value
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex() // "ff0000"
     */
    toHex(): string;
    /**
     * Converts the current color to Hex as a string
     * @returns {string} - Hex value as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex() // "#ff0000"
     */
    toHexString(): string;
    /**
     * Converts the current color to Hex8
     * @returns {string} - Hex8 value
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex8() // "ff0000ff"
     */
    toHex8(): string;
    /**
     * Converts the current color to Hex8 as a string
     * @returns {string} - Hex8 value as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex8String() // "#ff0000ff"
     */
    toHex8String(): string;
    /**
     * Converts the current color to CMY
     * @returns {CmykObject} - CMYK values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toCmy() // { c: 0, m: 100, y: 100 }
     */
    toCmy(): CmykObject;
    /** Converts the current color to CMYK
     * @returns {CmykObject} - CMYK values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toCmyk() // { c: 0, m: 100, y: 100, k: 0 }
     */
    toCmyk(): CmykObject;
    /**
     * Converts the current color to XYZ
     * @returns {XyzObject} - XYZ values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toXyz() // { x: 41.24, y: 21.26, z: 1.93 }
     */
    toXyz(): XyzObject;
    /**
     * Converts the current color to XYZ as a string
     * @returns {string} - XYZ values as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toXyzString() // "xyz(41.24, 21.26, 1.93)"
     */
    toXyzString(): string;
    /**
     * Converts the current color to LAB
     * @returns {LabObject} - LAB values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toLab() // { l: 53.24, a: 80.09, b: 67.20 }
     */
    toLab(): LabObject;
    /**
     * Converts the current color to LAB as a string
     * @returns {string} - LAB values as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toLabString() // "lab(53.24, 80.09, 67.20)"
     */
    toLabString(): string;
    /**
     * Converts the current color to LCH
     * @returns {LchObject} - LCH values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toLch() // { l: 53.24, c: 104.55, h: 40.85 }
     */
    toLch(): LchObject;
    /**
     * Converts the current color to LCH as a string
     * @returns {string} - LCH values as a string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toLchString() // "lch(53.24, 104.55, 40.85)"
     */
    toLchString(): string;
    /**
     * Returns the brightness of the current color
     * @returns {number} - Brightness value
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.getBrightness() // 76.245
     */
    getBrightness(): number;
    /**
     * Returns the luminance of the current color
     * @returns {number} - Luminance value
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.getLuminance() // 0.2126
     */
    getLuminance(): number;
    /**
     * Returns true if the current color is dark
     * @returns {boolean} - true if the current color is dark
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.isDark() // true
     */
    isDark(): boolean;
    /**
     * Returns true if the current color is light
     * @returns {boolean} - true if the current color is light
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.isLight() // false
     */
    isLight(): boolean;
    /**
     * Returns the format of the current color
     * @returns {string} - Color format
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('#ff0000')
     * color.getFormat() // "hex"
     */
    getFormat(): string | undefined;
    /**
     * Returns the alpha value of the current color
     * @returns {number} - Alpha value
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.getAlpha() // 1
     */
    getAlpha(): number | undefined;
    /**
     * Sets the alpha value of the current color
     * @param {number} newAlpha - Alpha value
     * @returns {void}
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.setAlpha(0.5)
     * color.getAlpha() // 0.5
     */
    setAlpha(newAlpha: number): void;
    /**
     * Returns a matching named CSS color if one exists
     * @returns {string} - color name
     * @memberof ColorConverter
     * @link https://www.w3.org/TR/css-color-4/#named-colors
     * @example
     * const color = new ColorConvertor("hsl(0, 100%, 50%)")
     * color.toName() // "red"
     */
    toName(): string | undefined;
    /**
     * Returns the closest named CSS color
     * @returns {string} - color name
     * @memberof ColorConverter
     * @link https://www.w3.org/TR/css-color-4/#named-colors
     * @example
     * const color = new ColorConvertor("hsl(0, 92%, 48%)")
     * color.toNearestNamedColor() // "red"
     */
    toNearestNamedColor(): string;
    /**
     * Returns the RGB values in the range 0-100
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toPercentageRgb() // { r: 100, g: 0, b: 0 }
     */
    toPercentageRgb(): RgbObject;
    /**
     * Returns the RGB values in the range 0-100% as a string
     * @returns {string} - RGB values string
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor('red')
     * color.toPercentageRgbString() // "rgb(100%, 0%, 0%)"
     */
    toPercentageRgbString(): string;
    /**
     * Checks if the current color is equal to the color passed as an argument
     * @param color2
     * @returns {boolean} - true if the current color is equal to the color passed as an argument
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.equals("#ff0000") // true
     * color.equals("hsl(0, 100%, 50%)") // true
     */
    equals(color2: string): boolean;
    /**
     * Returns a random color in sRGB color space
     * @returns {void}
     * @memberof ColorConverter
     * @remarks Will overwrite the current color
     */
    random(): void;
    /**
     * Returns a clone of the current color instance
     * @returns {ColorConverter} - ColorConvertor instance
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * const color2 = color.clone()
     * color2.toRgbString() // "rgb(255, 0, 0)"
     */
    clone(): ColorConverterInterface;
    /**
     * Returns the contrast ratio between the current color and the color passed as an argument
     * @param color2 - The color to compare the current color to
     * @returns {number} - The contrast ratio between the current color and the color passed as an argument
     * @memberof ColorConverter
     * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     */
    readability(color2: string): number;
    /**
     * Returns whether WCAG2 guidelines say that the current color is readable on the color passed as an argument
     * @param color2 - The color to compare the current color to
     * @returns {Record<string, Record<string, boolean>>} - Object containing the results of the readability tests
     * @memberof ColorConverter
     * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     * @example
     * const color = new ColorConvertor("red")
     * color.isReadable("#ffffff")
     * // { AA: { large: true, normal: true, small: true }, AAA: { large: true, normal: true, small: true } }
     */
    isReadable(color2: string): WcagContrastInterface;
    /** Returns a complementary color based on the current color
     * @returns {HslObject[]} - Array of HSL objects
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.complementary()
     * // [
     * //   { h: 0, s: 100, l: 50 },
     * //   { h: 180, s: 100, l: 50 },
     * // ]
     */
    complementary(): HslObject[];
    /** Returns a complementary color based on the current color, as an array of strings
     * @returns {string[]} - Array of HSL strings
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.complementaryString()
     * // [
     * //   "hsl(0, 100%, 50%)",
     * //   "hsl(180, 100%, 50%)",
     * // ]
     */
    complementaryString(): string[];
    /**
     * Returns a triad of colors based on the current color, spaced evenly around the color wheel
     * @returns {HslObject[]} - Array of HSL objects
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.triadic()
     * // [
     * //   { h: 0, s: 100, l: 50 },
     * //   { h: 120, s: 100, l: 50 },
     * //   { h: 240, s: 100, l: 50 },
     * // ]
     */
    triadic(): HslObject[];
    /**
     * Returns a triad of colors based on the current color, as an array of strings\
     * @returns {string[]} - Array of HSL strings
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.triadicString()
     * // [
     * //   "hsl(0, 100%, 50%)",
     * //   "hsl(120, 100%, 50%)",
     * //   "hsl(240, 100%, 50%)",
     * // ]
     */
    triadicString(): string[];
    /**
     * Returns a tetrad of colors based on the current color, spaced evenly around the color wheel
     * @returns {HslObject[]} - Array of HSL objects
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.tetradic()
     * // [
     * //   { h: 0, s: 100, l: 50 },
     * //   { h: 90, s: 100, l: 50 },
     * //   { h: 180, s: 100, l: 50 },
     * //   { h: 270, s: 100, l: 50 },
     * // ]
     */
    tetradic(): HslObject[];
    /**
     * Returns a tetrad of colors based on the current color, as an array of strings
     * @returns {string[]} - Array of HSL strings
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.tetradicString()
     * // [
     * //   "hsl(0, 100%, 50%)",
     * //   "hsl(90, 100%, 50%)",
     * //   "hsl(180, 100%, 50%)",
     * //   "hsl(270, 100%, 50%)",
     * // ]
     */
    tetradicString(): string[];
    /**
     * Returns a split-complementary color based on the current color
     * @param numOfColors - number of colors to return
     * @returns {HslObject[]} - Array of HSL objects
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.splitComplementary(5)
     * // [
     * //   { h: 0, s: 100, l: 50 },
     * //   { h: 150, s: 100, l: 50 },
     * //   { h: 210, s: 100, l: 50 },
     * //   { h: 270, s: 100, l: 50 },
     * //   { h: 330, s: 100, l: 50 },
     * // ]
     */
    splitComplementary(numOfColors?: number): HslObject[];
    /**
     * Returns a split-complementary color based on the current color, as an array of strings
     * @param numOfColors - number of colors to return
     * @returns {string[]} - Array of HSL strings
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.splitComplementaryString(5)
     * // [
     * //   "hsl(0, 100%, 50%)",
     * //   "hsl(150, 100%, 50%)",
     * //   "hsl(210, 100%, 50%)",
     * //   "hsl(270, 100%, 50%)",
     * //   "hsl(330, 100%, 50%)",
     * // ]
     */
    splitComplementaryString(numOfColors?: number): string[];
    /**
     * Creates a monochromatic palette based on the current color
     * @param numOfColors - number of colors to return
     * @param deltaS - difference in saturation between each color
     * @param deltaL - difference in lightness between each color
     * @returns {HslObject[]} - Array of HSL objects
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.monochromatic(5, 10, 10)
     * // [
     * //   { h: 0, s: 80, l: 30 },
     * //   { h: 0, s: 90, l: 40 },
     * //   { h: 0, s: 100, l: 50 },
     * //   { h: 0, s: 100, l: 60 },
     * //   { h: 0, s: 100, l: 70 },
     * // ]
     */
    monochromatic(numOfColors?: number, deltaS?: number | undefined, deltaL?: number | undefined): HslObject[];
    /**
     * Creates a monochromatic palette based on the current color, as an array of strings
     * @param numOfColors - number of colors to return
     * @param deltaS - difference in saturation between each color
     * @param deltaL - difference in lightness between each color
     * @returns {string[]} - Array of HSL strings
     * @memberof ColorConverter
     * @example
     * const color = new ColorConvertor("red")
     * color.monochromaticString(5, 10, 10)
     * // [
     * //   "hsl(0, 80%, 30%)",
     * //   "hsl(0, 90%, 40%)",
     * //   "hsl(0, 100%, 50%)",
     * //   "hsl(0, 100%, 60%)",
     * //   "hsl(0, 100%, 70%)",
     * // ]
     */
    monochromaticString(numOfColors?: number, deltaS?: number, deltaL?: number): string[];
}
export default ColorConverter;
