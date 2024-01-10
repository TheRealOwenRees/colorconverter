/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import { inputParser } from './utils/inputParser';
import { rgbaToHexA, rgbToHex, rgbToHsl, rgbToHsv, toRgbBase } from './utils/conversions';
import { calculateBrightness, calculateLuminance, truncateHex } from './utils/utilities';
import namedColors from './utils/namedColors';
function ColorConvertor(colorInput) {
  this._colorInput = colorInput; // string input of any color format
  this._colorObj = inputParser(this._colorInput); // Color info object. E.g. { format: 'hex', value: '#ffffff' }
  this._rgbObj = toRgbBase(this._colorObj); // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
}
ColorConvertor.prototype = {
  getInput() {
    return this._colorObj;
  },
  isValid() {
    return this._colorObj.value !== undefined;
  },
  toRgb() {
    return toRgbBase(this.getInput());
  },
  toRgbString() {
    const {
      format,
      value: {
        r,
        g,
        b,
        a
      }
    } = this._rgbObj;
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`;
  },
  toHsv() {
    return rgbToHsv(this._rgbObj.value);
  },
  toHsvString() {
    const {
      h,
      s,
      v
    } = rgbToHsv(this._rgbObj.value);
    return `hsv(${h}, ${s}%, ${v}%)`;
  },
  toHsl() {
    return rgbToHsl(this._rgbObj.value);
  },
  toHslString() {
    const {
      h,
      s,
      l
    } = rgbToHsl(this._rgbObj.value);
    return `hsl(${h}, ${s}%, ${l}%)`;
  },
  toHex() {
    return rgbToHex(this._rgbObj.value);
  },
  toHexString() {
    return `#${this.toHex()}`;
  },
  toHexA() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    const a = this.getAlpha();
    return rgbaToHexA({
      r,
      g,
      b,
      a
    });
  },
  toHexAString() {
    return `#${this.toHexA()}`;
  },
  getBrightness() {
    return calculateBrightness(this._rgbObj.value);
  },
  getLuminance() {
    return calculateLuminance(this._rgbObj.value);
  },
  isDark() {
    return this.getBrightness() < 128;
  },
  isLight() {
    return this.getBrightness() >= 128;
  },
  getFormat() {
    return this._rgbObj.format;
  },
  getAlpha() {
    let {
      a
    } = this._rgbObj.value;
    a = a === undefined ? 1 : a; // 100% alpha if working with rgb values
    return a;
  },
  setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
    }
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    const a = newAlpha;
    this._rgbObj.value = {
      r,
      g,
      b,
      a
    };
    return this._rgbObj;
  },
  toNormalizedRgb() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255
    };
  },
  toNormalizedRgba() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    const a = this.getAlpha();
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a
    };
  },
  toName() {
    const hex = truncateHex(this.toHex());
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color;
      }
    }
    return undefined;
  },
  // toNearestNamedColor () {
  //   return 'not implemented'
  // },
  // toNearestWebSafeColor () {
  //   return 'not implemented'
  // },
  toPercentageRgb() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    return {
      r: r / 255 * 100,
      g: g / 255 * 100,
      b: b / 255 * 100
    };
  },
  toPercentageRgbString() {
    const {
      r,
      g,
      b
    } = this.toPercentageRgb();
    return `rgb(${r}%, ${g}%, ${b}%)`;
  }
};
export default ColorConvertor;
//# sourceMappingURL=colorconvertor.js.map