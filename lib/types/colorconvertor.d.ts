import { type CmykObject, type ColorObjType, type HslObject, type HsvObject, type LabObject, type LchObject, type RgbObject, type XyzObject } from "./types";
declare class ColorConvertor {
    private _colorInput;
    private _colorObj;
    private _rgbObj;
    constructor(colorInput?: string);
    getInput(): string;
    getColorObj(): ColorObjType;
    getRgbObj(): RgbObject;
    setInput(colorInput: string): void;
    setColorObj(colorObj: ColorObjType): void;
    setRbgObj(rgbObj: RgbObject): void;
    setColor(color: string): void;
    /**
     * Checks if the parsed color is valid
     * @returns {boolean} - true if the parsed color is valid
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.isValid() // true
     */
    isValid(): boolean;
    /**
     * Returns the RGB values in the range 0-255
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toRgb() // { r: 255, g: 0, b: 0 }
     */
    toRgb(): RgbObject;
    /**
     * Returns the RGB values in the range 0-255 as a string
     * @returns {string} - RGB values string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toRgbString() // "rgb(255, 0, 0)"
     */
    toRgbString(): string;
    toNormalizedRgb(): RgbObject;
    toNormalizedRgbString(): string;
    fromRatio(): string;
    fromPercentageRgb(): string;
    /**
     * Converts the current color to  HSV
     * @returns {HsvObject} - HSV values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsv() // { h: 0, s: 100, v: 100 }
     */
    toHsv(): HsvObject;
    /**
     * Converts the current color to HSV as a string
     * @returns {string} - HSV values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsvString() // "hsv(0, 100%, 100%)"
     */
    toHsvString(): string;
    /**
     * Converts the current color to HSL
     * @returns {HslObject} - HSL values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsl() // { h: 0, s: 100, l: 50 }
     */
    toHsl(): HslObject;
    /**
     * Converts the current color to HSL as a string
     * @returns {string} - HSL values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHslString() // "hsl(0, 100%, 50%)"
     */
    toHslString(): string;
    /**
     * Converts the current color to Hex
     * @returns {string} - Hex value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex() // "ff0000"
     */
    toHex(): string;
    /**
     * Converts the current color to Hex as a string
     * @returns {string} - Hex value as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex() // "#ff0000"
     */
    toHexString(): string;
    /**
     * Converts the current color to Hex8
     * @returns {string} - Hex8 value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex8() // "ff0000ff"
     */
    toHex8(): string;
    /**
     * Converts the current color to Hex8 as a string
     * @returns {string} - Hex8 value as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex8String() // "#ff0000ff"
     */
    toHex8String(): string;
    /**
     * Converts the current color to CMY
     * @returns {CmykObject} - CMYK values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toCmy() // { c: 0, m: 100, y: 100 }
     */
    toCmy(): CmykObject;
    /** Converts the current color to CMYK
     * @returns {CmykObject} - CMYK values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toCmyk() // { c: 0, m: 100, y: 100, k: 0 }
     */
    toCmyk(): CmykObject;
    /**
     * Converts the current color to XYZ
     * @returns {XyzObject} - XYZ values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toXyz() // { x: 41.24, y: 21.26, z: 1.93 }
     */
    toXyz(): XyzObject;
    /**
     * Converts the current color to XYZ as a string
     * @returns {string} - XYZ values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toXyzString() // "xyz(41.24, 21.26, 1.93)"
     */
    toXyzString(): string;
    /**
     * Converts the current color to LAB
     * @returns {LabObject} - LAB values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLab() // { l: 53.24, a: 80.09, b: 67.20 }
     */
    toLab(): LabObject;
    /**
     * Converts the current color to LAB as a string
     * @returns {string} - LAB values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLabString() // "lab(53.24, 80.09, 67.20)"
     */
    toLabString(): string;
    /**
     * Converts the current color to LCH
     * @returns {LchObject} - LCH values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLch() // { l: 53.24, c: 104.55, h: 40.85 }
     */
    toLch(): LchObject;
    /**
     * Converts the current color to LCH as a string
     * @returns {string} - LCH values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLchString() // "lch(53.24, 104.55, 40.85)"
     */
    toLchString(): string;
    /**
     * Returns the brightness of the current color
     * @returns {number} - Brightness value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.getBrightness() // 76.245
     */
    getBrightness(): number;
    /**
     * Returns the luminance of the current color
     * @returns {number} - Luminance value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.getLuminance() // 0.2126
     */
    getLuminance(): number;
    /**
     * Returns true if the current color is dark
     * @returns {boolean} - true if the current color is dark
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.isDark() // true
     */
    isDark(): boolean;
    /**
     * Returns true if the current color is light
     * @returns {boolean} - true if the current color is light
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.isLight() // false
     */
    isLight(): boolean;
    /**
     * Returns the format of the current color
     * @returns {string} - Color format
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('#ff0000')
     * color.getFormat() // "hex"
     */
    getFormat(): string | undefined;
    /**
     * Returns the alpha value of the current color
     * @returns {number} - Alpha value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.getAlpha() // 1
     */
    getAlpha(): number | undefined;
    /**
     * Sets the alpha value of the current color
     * @param {number} newAlpha - Alpha value
     * @returns {void}
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.setAlpha(0.5)
     * color.getAlpha() // 0.5
     */
    setAlpha(newAlpha: number): void;
    /**
     * Returns a matching named CSS color if one exists
     * @returns {string} - color name
     * @memberof ColorConvertor
     * @link https://www.w3.org/TR/css-color-4/#named-colors
     * @example
     * const color = new ColorConvertor("hsl(0, 100%, 50%)")
     * color.toName() // "red"
     */
    toName(): string | undefined;
    /**
     * Returns the closest named CSS color
     * @returns {string} - color name
     * @memberof ColorConvertor
     * @link https://www.w3.org/TR/css-color-4/#named-colors
     * @example
     * const color = new ColorConvertor("hsl(0, 92%, 48%)")
     * color.toNearestNamedColor() // "red"
     */
    toNearestNamedColor(): string;
    /**
     * Returns the RGB values in the range 0-100
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toPercentageRgb() // { r: 100, g: 0, b: 0 }
     */
    toPercentageRgb(): RgbObject;
    /**
     * Returns the RGB values in the range 0-100% as a string
     * @returns {string} - RGB values string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toPercentageRgbString() // "rgb(100%, 0%, 0%)"
     */
    toPercentageRgbString(): string;
    /**
     * Checks if the current color is equal to the color passed as an argument
     * @param color2
     * @returns {boolean} - true if the current color is equal to the color passed as an argument
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor("red")
     * color.equals("#ff0000") // true
     * color.equals("hsl(0, 100%, 50%)") // true
     */
    equals(color2: string): boolean;
    /**
     * Returns a random color in sRGB color space
     * @returns {void}
     * @memberof ColorConvertor
     * @remarks Will overwrite the current color
     */
    random(): void;
    /**
     * Returns a clone of the current color instance
     * @returns {ColorConvertor} - ColorConvertor instance
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor("red")
     * const color2 = color.clone()
     * color2.toRgbString() // "rgb(255, 0, 0)"
     */
    clone(): ColorConvertor;
    /**
     * Returns the contrast ratio between the current color and the color passed as an argument
     * @param color2 - The color to compare the current color to
     * @returns {number} - The contrast ratio between the current color and the color passed as an argument
     * @memberof ColorConvertor
     * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     */
    readability(color2: string): number;
    /**
     * Returns whether WCAG2 guidelines say that the current color is readable on the color passed as an argument
     * @param color2 - The color to compare the current color to
     * @returns {Record<string, Record<string, boolean>>} - Object containing the results of the readability tests
     * @memberof ColorConvertor
     * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     * @example
     * const color = new ColorConvertor("red")
     * color.isReadable("#ffffff")
     * // { AA: { large: true, normal: true, small: true }, AAA: { large: true, normal: true, small: true } }
     */
    isReadable(color2: string): Record<string, Record<string, boolean>>;
}
export default ColorConvertor;
