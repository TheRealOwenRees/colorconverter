/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
const tslib_1 = require("tslib");
const conversions_1 = require("./utils/conversions");
const inputParser_1 = require("./utils/inputParser");
const utilities_1 = require("./utils/utilities");
const namedColors_1 = tslib_1.__importStar(require("./utils/namedColors"));
class ColorConvertor {
  constructor(colorInput) {
    this._colorInput = colorInput !== null && colorInput !== void 0 ? colorInput : undefined; // string input of any color format
    this._colorObj = (0, inputParser_1.inputParser)(this._colorInput); // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = (0, conversions_1.toRgbBase)(this._colorObj); // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
  }
  getInput() {
    var _a;
    return (_a = this._colorInput) !== null && _a !== void 0 ? _a : "";
  }
  getColorObj() {
    return this._colorObj;
  }
  getRgbObj() {
    return this._rgbObj;
  }
  setInput(colorInput) {
    this._colorInput = colorInput;
  }
  setColorObj(colorObj) {
    this._colorObj = colorObj;
  }
  setRbgObj(rgbObj) {
    this._rgbObj = rgbObj;
  }
  setColor(color) {
    this.setInput(color);
    this.setColorObj((0, inputParser_1.inputParser)(this.getInput()));
    this.setRbgObj((0, conversions_1.toRgbBase)(this.getColorObj()));
  }
  /**
   * Checks if the parsed color is valid
   * @returns {boolean} - true if the parsed color is valid
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.isValid() // true
   */
  isValid() {
    return this.getColorObj().value !== undefined;
  }
  /**
   * Returns the RGB values in the range 0-255
   * @returns {RgbObject} - RGB values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toRgb() // { r: 255, g: 0, b: 0 }
   */
  toRgb() {
    return (0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj());
  }
  /**
   * Returns the RGB values in the range 0-255 as a string
   * @returns {string} - RGB values string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toRgbString() // "rgb(255, 0, 0)"
   */
  toRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.toRgb();
    return `${a !== undefined ? "rgba" : "rgb"}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ""})`;
  }
  toNormalizedRgb() {
    return this.getRgbObj();
  }
  toNormalizedRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.getRgbObj();
    return `${a !== undefined ? "rgba" : "rgb"}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ""})`;
  }
  // TODO implement
  fromRatio() {
    return "not implemented";
  }
  // TODO implement
  fromPercentageRgb() {
    return "not implemented";
  }
  /**
   * Converts the current color to  HSV
   * @returns {HsvObject} - HSV values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsv() // { h: 0, s: 100, v: 100 }
   */
  toHsv() {
    return (0, conversions_1.rgbNormalizedToHsv)(this.getRgbObj());
  }
  /**
   * Converts the current color to HSV as a string
   * @returns {string} - HSV values as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsvString() // "hsv(0, 100%, 100%)"
   */
  toHsvString() {
    const {
      h,
      s,
      v
    } = this.toHsv();
    return `hsv(${h}, ${s}%, ${v}%)`;
  }
  /**
   * Converts the current color to HSL
   * @returns {HslObject} - HSL values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsl() // { h: 0, s: 100, l: 50 }
   */
  toHsl() {
    return (0, conversions_1.rgbNormalizedToHsl)(this.getRgbObj());
  }
  /**
   * Converts the current color to HSL as a string
   * @returns {string} - HSL values as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHslString() // "hsl(0, 100%, 50%)"
   */
  toHslString() {
    const {
      h,
      s,
      l
    } = (0, conversions_1.rgbNormalizedToHsl)(this.getRgbObj());
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  /**
   * Converts the current color to Hex
   * @returns {string} - Hex value
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex() // "ff0000"
   */
  toHex() {
    var _a;
    return (_a = (0, conversions_1.rgbToHex)((0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj()))) !== null && _a !== void 0 ? _a : "";
  }
  /**
   * Converts the current color to Hex as a string
   * @returns {string} - Hex value as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex() // "#ff0000"
   */
  toHexString() {
    return `#${this.toHex()}`;
  }
  /**
   * Converts the current color to Hex8
   * @returns {string} - Hex8 value
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex8() // "ff0000ff"
   */
  toHex8() {
    const {
      r,
      g,
      b
    } = (0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj());
    const a = this.getAlpha();
    return (0, conversions_1.rgbaToHex8)({
      r,
      g,
      b,
      a
    });
  }
  /**
   * Converts the current color to Hex8 as a string
   * @returns {string} - Hex8 value as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex8String() // "#ff0000ff"
   */
  toHex8String() {
    return `#${this.toHex8()}`;
  }
  /**
   * Converts the current color to CMY
   * @returns {CmykObject} - CMYK values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toCmy() // { c: 0, m: 100, y: 100 }
   */
  toCmy() {
    return (0, conversions_1.rgbNormalizedToCmy)(this.getRgbObj());
  }
  /** Converts the current color to CMYK
   * @returns {CmykObject} - CMYK values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toCmyk() // { c: 0, m: 100, y: 100, k: 0 }
   */
  toCmyk() {
    return (0, conversions_1.cmyToCmyk)(this.toCmy());
  }
  /*
    XYZ, CIE-L*ab, CIE-L*Ch(ab)
    formulae from https://www.easyrgb.com/en/math.php
       X, Y and Z output refers to a D65/2° standard illuminant.
    */
  /**
   * Converts the current color to XYZ
   * @returns {XyzObject} - XYZ values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toXyz() // { x: 41.24, y: 21.26, z: 1.93 }
   */
  toXyz() {
    return (0, conversions_1.rgbToXyz)(this.getRgbObj());
  }
  /**
   * Converts the current color to XYZ as a string
   * @returns {string} - XYZ values as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toXyzString() // "xyz(41.24, 21.26, 1.93)"
   */
  toXyzString() {
    const {
      x,
      y,
      z
    } = this.toXyz();
    return `xyz(${x}, ${y}, ${z})`;
  }
  /**
   * Converts the current color to LAB
   * @returns {LabObject} - LAB values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toLab() // { l: 53.24, a: 80.09, b: 67.20 }
   */
  toLab() {
    return (0, conversions_1.xyzToLab)(this.toXyz());
  }
  /**
   * Converts the current color to LAB as a string
   * @returns {string} - LAB values as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toLabString() // "lab(53.24, 80.09, 67.20)"
   */
  toLabString() {
    const {
      l,
      a,
      b
    } = this.toLab();
    return `lab(${l}, ${a}, ${b})`;
  }
  /**
   * Converts the current color to LCH
   * @returns {LchObject} - LCH values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toLch() // { l: 53.24, c: 104.55, h: 40.85 }
   */
  toLch() {
    return (0, conversions_1.labToLch)(this.toLab());
  }
  /**
   * Converts the current color to LCH as a string
   * @returns {string} - LCH values as a string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toLchString() // "lch(53.24, 104.55, 40.85)"
   */
  toLchString() {
    const {
      l,
      c,
      h
    } = this.toLch();
    return `lch(${l}, ${c}, ${h})`;
  }
  /**
   * Returns the brightness of the current color
   * @returns {number} - Brightness value
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.getBrightness() // 76.245
   */
  getBrightness() {
    return (0, utilities_1.calculateBrightness)((0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj()));
  }
  /**
   * Returns the luminance of the current color
   * @returns {number} - Luminance value
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.getLuminance() // 0.2126
   */
  getLuminance() {
    return (0, utilities_1.calculateLuminance)(this.getRgbObj());
  }
  /**
   * Returns true if the current color is dark
   * @returns {boolean} - true if the current color is dark
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.isDark() // true
   */
  isDark() {
    return this.getBrightness() < 128;
  }
  /**
   * Returns true if the current color is light
   * @returns {boolean} - true if the current color is light
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.isLight() // false
   */
  isLight() {
    return this.getBrightness() >= 128;
  }
  /**
   * Returns the format of the current color
   * @returns {string} - Color format
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('#ff0000')
   * color.getFormat() // "hex"
   */
  getFormat() {
    return this.getColorObj().format;
  }
  /**
   * Returns the alpha value of the current color
   * @returns {number} - Alpha value
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.getAlpha() // 1
   */
  getAlpha() {
    let {
      a
    } = this.getRgbObj();
    a = a !== null && a !== void 0 ? a : 1; // 100% alpha if working with rgb values
    return a;
  }
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
  setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error("Alpha value must be between 0 and 1");
    }
    const {
      r,
      g,
      b
    } = this.getRgbObj();
    const a = newAlpha;
    this.setRbgObj({
      r,
      g,
      b,
      a
    });
  }
  /**
   * Returns a matching named CSS color if one exists
   * @returns {string} - color name
   * @memberof ColorConvertor
   * @link https://www.w3.org/TR/css-color-4/#named-colors
   * @example
   * const color = new ColorConvertor("hsl(0, 100%, 50%)")
   * color.toName() // "red"
   */
  toName() {
    const hex = (0, utilities_1.truncateHex)(this.toHex());
    for (const color in namedColors_1.default) {
      if (namedColors_1.default[color] === hex) {
        return color;
      }
    }
    return undefined;
  }
  /**
   * Returns the closest named CSS color
   * @returns {string} - color name
   * @memberof ColorConvertor
   * @link https://www.w3.org/TR/css-color-4/#named-colors
   * @example
   * const color = new ColorConvertor("hsl(0, 92%, 48%)")
   * color.toNearestNamedColor() // "red"
   */
  toNearestNamedColor() {
    const rgb = (0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj());
    return (0, utilities_1.findClosestColor)(rgb, namedColors_1.namedColorsRgb);
  }
  /**
   * Returns the RGB values in the range 0-100
   * @returns {RgbObject} - RGB values object
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toPercentageRgb() // { r: 100, g: 0, b: 0 }
   */
  toPercentageRgb() {
    const {
      r,
      g,
      b,
      a
    } = this.getRgbObj();
    return {
      r: r !== undefined ? r * 100 : undefined,
      g: g !== undefined ? g * 100 : undefined,
      b: b !== undefined ? b * 100 : undefined,
      a: a !== undefined ? this.getAlpha() : undefined
    };
  }
  /**
   * Returns the RGB values in the range 0-100% as a string
   * @returns {string} - RGB values string
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor('red')
   * color.toPercentageRgbString() // "rgb(100%, 0%, 0%)"
   */
  toPercentageRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.toPercentageRgb();
    return `${a !== undefined ? "rgba" : "rgb"}(${r}%, ${g}%, ${b}%${a !== undefined ? `, ${a}` : ""})`;
  }
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
  equals(color2) {
    return this.toRgbString() === new ColorConvertor(color2).toRgbString();
  }
  /**
   * Returns a random color in sRGB color space
   * @returns {void}
   * @memberof ColorConvertor
   * @remarks Will overwrite the current color
   */
  random() {
    this.setColorObj({
      format: "rgb",
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    });
    this.setRbgObj((0, conversions_1.toRgbBase)(this.getColorObj()));
  }
  /**
   * Returns a clone of the current color instance
   * @returns {ColorConvertor} - ColorConvertor instance
   * @memberof ColorConvertor
   * @example
   * const color = new ColorConvertor("red")
   * const color2 = color.clone()
   * color2.toRgbString() // "rgb(255, 0, 0)"
   */
  clone() {
    return new ColorConvertor(this.getInput());
  }
  /**
   * Returns the contrast ratio between the current color and the color passed as an argument
   * @param color2 - The color to compare the current color to
   * @returns {number} - The contrast ratio between the current color and the color passed as an argument
   * @memberof ColorConvertor
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   */
  readability(color2) {
    const l1 = this.getLuminance();
    const l2 = new ColorConvertor(color2).getLuminance();
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
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
  isReadable(color2) {
    const readability = this.readability(color2);
    return {
      AA: {
        large: readability >= 3,
        normal: readability >= 4.5,
        small: readability >= 7
      },
      AAA: {
        large: readability >= 4.5,
        normal: readability >= 7,
        small: readability >= 7
      }
    };
  }
}
exports.default = ColorConvertor;
//# sourceMappingURL=colorconvertor.esm.js.map
