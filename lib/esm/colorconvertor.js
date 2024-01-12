/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import { inputParser } from './utils/inputParser';
import { rgbNormalizedToRgb, rgbNormalizedToHsl, toRgbBase, rgbNormalizedToCmy, cmyToCmyk, rgbNormalizedToHsv, rgbToXyz, xyzToLab, labToLch, rgbToHex, rgbaToHex8 } from './utils/conversions';
import { calculateBrightness, calculateLuminance, findClosestColor, truncateHex } from './utils/utilities';
import namedColors, { namedColorsRgb } from './utils/namedColors';
class ColorConvertor {
  constructor(colorInput) {
    this._colorInput = colorInput ?? undefined; // string input of any color format
    this._colorObj = inputParser(this._colorInput); // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = toRgbBase(this._colorObj); // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
  }
  getInput() {
    return this._colorInput ?? '';
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

  /**
   * Returns the RGB values in the range 0-255
   * @returns {RgbObject} - RGB values in the range 0-255
   * @memberof ColorConvertor
   */
  toRgb() {
    return rgbNormalizedToRgb(this.getRgbObj());
  }

  /**
   * @returns {string} - RGB values in the range 0-255 as a string
   * @memberof ColorConvertor
   * @remarks "rgb(255, 255, 255)"
   */
  toRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.toRgb();
    return `${a !== undefined ? 'rgba' : 'rgb'}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`;
  }

  /**
   * Checks if the parsed color is valid
   * @returns {boolean} - true if the parsed color is valid
   * @memberof ColorConvertor
   */
  isValid() {
    return this.getColorObj().value !== undefined;
  }
  setColor(color) {
    this.setInput(color);
    this.setColorObj(inputParser(this.getInput()));
    this.setRbgObj(toRgbBase(this.getColorObj()));
  }

  // TODO implement
  fromRatio() {
    return 'not implemented';
  }

  // TODO implement
  fromPercentageRgb() {
    return 'not implemented';
  }
  toHsv() {
    return rgbNormalizedToHsv(this.getRgbObj());
  }
  toHsvString() {
    const {
      h,
      s,
      v
    } = this.toHsv();
    return `hsv(${h}, ${s}%, ${v}%)`;
  }
  toHsl() {
    return rgbNormalizedToHsl(this.getRgbObj());
  }
  toHslString() {
    const {
      h,
      s,
      l
    } = rgbNormalizedToHsl(this.getRgbObj());
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  toHex() {
    return rgbToHex(rgbNormalizedToRgb(this.getRgbObj())) ?? '';
  }
  toHexString() {
    return `#${this.toHex()}`;
  }
  toHex8() {
    const {
      r,
      g,
      b
    } = rgbNormalizedToRgb(this.getRgbObj());
    const a = this.getAlpha();
    return rgbaToHex8({
      r,
      g,
      b,
      a
    });
  }
  toHex8String() {
    return `#${this.toHex8()}`;
  }
  toCmy() {
    return rgbNormalizedToCmy(this.getRgbObj());
  }
  toCmyk() {
    return cmyToCmyk(this.toCmy());
  }

  /*
    XYZ, CIE-L*ab, CIE-L*Ch(ab)
    formulae from https://www.easyrgb.com/en/math.php
     X, Y and Z output refers to a D65/2° standard illuminant.
    */

  toXyz() {
    return rgbToXyz(this.getRgbObj());
  }
  toXyzString() {
    const {
      x,
      y,
      z
    } = this.toXyz();
    return `xyz(${x}, ${y}, ${z})`;
  }

  // CIE-L*ab
  toLab() {
    return xyzToLab(this.toXyz());
  }
  toLabString() {
    const {
      l,
      a,
      b
    } = this.toLab();
    return `lab(${l}, ${a}, ${b})`;
  }
  toLch() {
    return labToLch(this.toLab());
  }
  toLchString() {
    const {
      l,
      c,
      h
    } = this.toLch();
    return `lch(${l}, ${c}, ${h})`;
  }
  getBrightness() {
    return calculateBrightness(rgbNormalizedToRgb(this.getRgbObj()));
  }
  getLuminance() {
    return calculateLuminance(this.getRgbObj());
  }
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  getFormat() {
    return this.getColorObj().format;
  }
  getAlpha() {
    let {
      a
    } = this.getRgbObj();
    a = a ?? 1; // 100% alpha if working with rgb values
    return a;
  }
  setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
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
  toName() {
    const hex = truncateHex(this.toHex());
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color;
      }
    }
    return undefined;
  }
  toNearestNamedColor() {
    const rgb = rgbNormalizedToRgb(this.getRgbObj());
    return findClosestColor(rgb, namedColorsRgb);
  }
  toPercentageRgb() {
    const {
      r,
      g,
      b
    } = this.getRgbObj();
    return {
      r: r !== undefined ? r * 100 : undefined,
      g: g !== undefined ? g * 100 : undefined,
      b: b !== undefined ? b * 100 : undefined
    };
  }
  toPercentageRgbString() {
    const {
      r,
      g,
      b
    } = this.toPercentageRgb();
    return `rgb(${r}%, ${g}%, ${b}%)`;
  }
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
      format: 'rgb',
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    });
    this.setRbgObj(toRgbBase(this.getColorObj()));
  }
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
}
export default ColorConvertor;
//# sourceMappingURL=colorconvertor.js.map