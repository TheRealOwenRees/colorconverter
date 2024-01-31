/*
    Color Converter
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/
import { namedColors, namedColorsRgb } from "./utils/namedColors.js";
import { inputParser } from "./utils/inputParser.js";
import colorConversion from "./utils/conversions.js";
import utilities from "./utils/utilities.js";
import palettes from "./utils/palettes.js";
class ColorConverter {
  constructor(colorInput) {
    this._colorInput = colorInput ?? undefined; // string input of any color format
    this._colorObj = inputParser(this._colorInput); // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = colorConversion.toRgbBase(this._colorObj); // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
  }
  getInput() {
    return this._colorInput ?? "";
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
    this.setColorObj(inputParser(this.getInput()));
    this.setRbgObj(colorConversion.toRgbBase(this.getColorObj()));
  }

  /**
   * Checks if the parsed color is valid
   * @returns {boolean} - true if the parsed color is valid
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toRgb() // { r: 255, g: 0, b: 0 }
   */
  toRgb() {
    return colorConversion.rgbNormalizedToRgb(this.getRgbObj());
  }

  /**
   * Returns the RGB values in the range 0-255 as a string
   * @returns {string} - RGB values string
   * @memberof ColorConverter
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

  /**
   * Returns the RGB values in the range 0-1
   * @returns {RgbObject} - RGB values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toNormalizedRgb() // { r: 1, g: 0, b: 0 }
   */
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

  /**
   * Converts the current color to  HSV
   * @returns {HsvObject} - HSV values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsv() // { h: 0, s: 100, v: 100 }
   */
  toHsv() {
    return colorConversion.rgbNormalizedToHsv(this.getRgbObj());
  }

  /**
   * Converts the current color to HSV as a string
   * @returns {string} - HSV values as a string
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsl() // { h: 0, s: 100, l: 50 }
   */
  toHsl() {
    const {
      format,
      value
    } = this.getColorObj();
    return format === "hsv" ? value : colorConversion.rgbNormalizedToHsl(this.getRgbObj());
  }

  /**
   * Converts the current color to HSL as a string
   * @returns {string} - HSL values as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHslString() // "hsl(0, 100%, 50%)"
   */
  toHslString() {
    const {
      h,
      s,
      l
    } = colorConversion.rgbNormalizedToHsl(this.getRgbObj());
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  /**
   * Converts the current color to Hex
   * @returns {string} - Hex value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex() // "ff0000"
   */
  toHex() {
    return colorConversion.rgbToHex(colorConversion.rgbNormalizedToRgb(this.getRgbObj())) ?? "";
  }

  /**
   * Converts the current color to Hex as a string
   * @returns {string} - Hex value as a string
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex8() // "ff0000ff"
   */
  toHex8() {
    const {
      r,
      g,
      b
    } = colorConversion.rgbNormalizedToRgb(this.getRgbObj());
    const a = this.getAlpha();
    return colorConversion.rgbaToHex8({
      r,
      g,
      b,
      a
    });
  }

  /**
   * Converts the current color to Hex8 as a string
   * @returns {string} - Hex8 value as a string
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toCmy() // { c: 0, m: 100, y: 100 }
   */
  toCmy() {
    return colorConversion.rgbNormalizedToCmy(this.getRgbObj());
  }

  /** Converts the current color to CMYK
   * @returns {CmykObject} - CMYK values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toCmyk() // { c: 0, m: 100, y: 100, k: 0 }
   */
  toCmyk() {
    return colorConversion.cmyToCmyk(this.toCmy());
  }

  /**
   * Converts the current color to XYZ
   * @returns {XyzObject} - XYZ values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toXyz() // { x: 41.24, y: 21.26, z: 1.93 }
   */
  toXyz() {
    return colorConversion.rgbToXyz(this.getRgbObj());
  }

  /**
   * Converts the current color to XYZ as a string
   * @returns {string} - XYZ values as a string
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toLab() // { l: 53.24, a: 80.09, b: 67.20 }
   */
  toLab() {
    return colorConversion.xyzToLab(this.toXyz());
  }

  /**
   * Converts the current color to LAB as a string
   * @returns {string} - LAB values as a string
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toLch() // { l: 53.24, c: 104.55, h: 40.85 }
   */
  toLch() {
    return colorConversion.labToLch(this.toLab());
  }

  /**
   * Converts the current color to LCH as a string
   * @returns {string} - LCH values as a string
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.getBrightness() // 76.245
   */
  getBrightness() {
    return utilities.calculateBrightness(colorConversion.rgbNormalizedToRgb(this.getRgbObj()));
  }

  /**
   * Returns the luminance of the current color
   * @returns {number} - Luminance value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.getLuminance() // 0.2126
   */
  getLuminance() {
    return utilities.calculateLuminance(this.getRgbObj());
  }

  /**
   * Returns true if the current color is dark
   * @returns {boolean} - true if the current color is dark
   * @memberof ColorConverter
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
   * @memberof ColorConverter
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
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.getAlpha() // 1
   */
  getAlpha() {
    let {
      a
    } = this.getRgbObj();
    a = a ?? 1; // 100% alpha if working with rgb values
    return a;
  }

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
   * @memberof ColorConverter
   * @link https://www.w3.org/TR/css-color-4/#named-colors
   * @example
   * const color = new ColorConvertor("hsl(0, 100%, 50%)")
   * color.toName() // "red"
   */
  toName() {
    const hex = utilities.truncateHex(this.toHex());
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color;
      }
    }
    return undefined;
  }

  /**
   * Returns the closest named CSS color
   * @returns {string} - color name
   * @memberof ColorConverter
   * @link https://www.w3.org/TR/css-color-4/#named-colors
   * @example
   * const color = new ColorConvertor("hsl(0, 92%, 48%)")
   * color.toNearestNamedColor() // "red"
   */
  toNearestNamedColor() {
    const rgb = colorConversion.rgbNormalizedToRgb(this.getRgbObj());
    return colorConversion.findClosestColor(rgb, namedColorsRgb);
  }

  /**
   * Returns the RGB values in the range 0-100
   * @returns {RgbObject} - RGB values object
   * @memberof ColorConverter
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
   * @memberof ColorConverter
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
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor("red")
   * color.equals("#ff0000") // true
   * color.equals("hsl(0, 100%, 50%)") // true
   */
  equals(color2) {
    return this.toRgbString() === new ColorConverter(color2).toRgbString();
  }

  /**
   * Returns a random color in sRGB color space
   * @returns {void}
   * @memberof ColorConverter
   * @remarks Will overwrite the current color
   */
  random() {
    this.setColorObj({
      format: "rgb",
      value: utilities.randomRgbColor()
    });
    this.setRbgObj(colorConversion.toRgbBase(this.getColorObj()));
  }

  /**
   * Returns a clone of the current color instance
   * @returns {ColorConverter} - ColorConvertor instance
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor("red")
   * const color2 = color.clone()
   * color2.toRgbString() // "rgb(255, 0, 0)"
   */
  clone() {
    return new ColorConverter(this.getInput());
  }

  /**
   * Returns the contrast ratio between the current color and the color passed as an argument
   * @param color2 - The color to compare the current color to
   * @returns {number} - The contrast ratio between the current color and the color passed as an argument
   * @memberof ColorConverter
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   */
  readability(color2) {
    const l1 = this.getLuminance();
    const l2 = new ColorConverter(color2).getLuminance();
    return utilities.calculateContrastRatio(l1, l2);
  }

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
  isReadable(color2) {
    return utilities.calculateReadability(this.readability(color2));
  }

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
  complementary() {
    return palettes.analogous(2, this.toHsl());
  }

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
  complementaryString() {
    return this.complementary().map(hsl => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  }

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
  triadic() {
    return palettes.analogous(3, this.toHsl());
  }

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
  triadicString() {
    return this.triadic().map(hsl => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  }

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
  tetradic() {
    return palettes.analogous(4, this.toHsl());
  }

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
  tetradicString() {
    return this.tetradic().map(hsl => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  }

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
  splitComplementary(numOfColors = 5) {
    return palettes.analogous(numOfColors, this.toHsl());
  }

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
  splitComplementaryString(numOfColors = 5) {
    return this.splitComplementary(numOfColors).map(hsl => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  }

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
  monochromatic(numOfColors = 3, deltaS = undefined, deltaL = undefined) {
    return palettes.monochromatic(numOfColors, deltaS, deltaL, this.toHsl());
  }

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
  monochromaticString(numOfColors = 3, deltaS = 33.33, deltaL = 33.33) {
    return this.monochromatic(numOfColors, deltaS, deltaL).map(hsl => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  }
}
export default ColorConverter;
//# sourceMappingURL=colorconverter.js.map