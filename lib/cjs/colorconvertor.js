"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _inputParser = require("./utils/inputParser");
var _conversions = require("./utils/conversions");
var _utilities = require("./utils/utilities");
var _namedColors = _interopRequireDefault(require("./utils/namedColors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

function ColorConvertor(colorInput) {
  this._colorInput = colorInput; // string input of any color format
  this._colorObj = (0, _inputParser.inputParser)(this._colorInput); // Color info object. E.g. { format: 'hex', value: '#ffffff' }
  this._rgbObj = (0, _conversions.toRgbBase)(this._colorObj); // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
}
ColorConvertor.prototype = {
  /*
    General Methods
  */
  getInput: function getInput() {
    return this._colorInput;
  },
  getColorObj: function getColorObj() {
    return this._colorObj;
  },
  getRgbObj: function getRgbObj() {
    return this._rgbObj;
  },
  isValid: function isValid() {
    return this.getColorObj().value !== undefined;
  },
  setColor: function setColor(color) {
    this._colorInput = color;
    this._colorObj = (0, _inputParser.inputParser)(this.getInput());
    this._rgbObj = (0, _conversions.toRgbBase)(this.getColorObj());
  },
  // fromRatio () {
  //   return 'not implemented'
  // },
  toRgb: function toRgb() {
    return (0, _conversions.toRgbBase)(this.getColorObj());
  },
  toRgbString: function toRgbString() {
    var _this$getRgbObj = this.getRgbObj(),
      format = _this$getRgbObj.format,
      _this$getRgbObj$value = _this$getRgbObj.value,
      r = _this$getRgbObj$value.r,
      g = _this$getRgbObj$value.g,
      b = _this$getRgbObj$value.b,
      a = _this$getRgbObj$value.a;
    return "".concat(format, "(").concat(r, ", ").concat(g, ", ").concat(b).concat(a !== undefined ? ", ".concat(a) : '', ")");
  },
  toHsv: function toHsv() {
    return (0, _conversions.rgbToHsv)(this.getRgbObj().value);
  },
  toHsvString: function toHsvString() {
    var _rgbToHsv = (0, _conversions.rgbToHsv)(this.getRgbObj().value),
      h = _rgbToHsv.h,
      s = _rgbToHsv.s,
      v = _rgbToHsv.v;
    return "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)");
  },
  toHsl: function toHsl() {
    return (0, _conversions.rgbToHsl)(this.getRgbObj().value);
  },
  toHslString: function toHslString() {
    var _rgbToHsl = (0, _conversions.rgbToHsl)(this.getRgbObj().value),
      h = _rgbToHsl.h,
      s = _rgbToHsl.s,
      l = _rgbToHsl.l;
    return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
  },
  toHex: function toHex() {
    return (0, _conversions.rgbToHex)(this.getRgbObj().value);
  },
  toHexString: function toHexString() {
    return "#".concat(this.toHex());
  },
  toHex8: function toHex8() {
    var _this$getRgbObj$value2 = this.getRgbObj().value,
      r = _this$getRgbObj$value2.r,
      g = _this$getRgbObj$value2.g,
      b = _this$getRgbObj$value2.b;
    var a = this.getAlpha();
    return (0, _conversions.rgbaToHex8)({
      r: r,
      g: g,
      b: b,
      a: a
    });
  },
  toHex8String: function toHex8String() {
    return "#".concat(this.toHex8());
  },
  // XYZ, CIE-L*ab, CIE-L*Ch(ab) from https://www.easyrgb.com/en/math.php
  // X, Y and Z output refer to a D65/2° standard illuminant.
  toXyz: function toXyz() {
    return (0, _conversions.rgbToXyz)(this.toNormalizedRgb());
  },
  toXyzString: function toXyzString() {
    var _this$toXyz = this.toXyz(),
      x = _this$toXyz.x,
      y = _this$toXyz.y,
      z = _this$toXyz.z;
    return "xyz(".concat(x, ", ").concat(y, ", ").concat(z, ")");
  },
  // CIE-L*ab
  toLab: function toLab() {
    return (0, _conversions.xyzToLab)(this.toXyz());
  },
  toLabString: function toLabString() {
    var _this$toLab = this.toLab(),
      l = _this$toLab.l,
      a = _this$toLab.a,
      b = _this$toLab.b;
    return "lab(".concat(l, ", ").concat(a, ", ").concat(b, ")");
  },
  toLch: function toLch() {
    return (0, _conversions.labToLch)(this.toLab());
  },
  toLchString: function toLchString() {
    var _this$toLch = this.toLch(),
      l = _this$toLch.l,
      c = _this$toLch.c,
      h = _this$toLch.h;
    return "lch(".concat(l, ", ").concat(c, ", ").concat(h, ")");
  },
  getBrightness: function getBrightness() {
    return (0, _utilities.calculateBrightness)(this.getRgbObj().value);
  },
  getLuminance: function getLuminance() {
    return (0, _utilities.calculateLuminance)(this.getRgbObj().value);
  },
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return this.getBrightness() >= 128;
  },
  getFormat: function getFormat() {
    return this.getColorObj().format;
  },
  getAlpha: function getAlpha() {
    var a = this.getRgbObj().value.a;
    a = a === undefined ? 1 : a; // 100% alpha if working with rgb values
    return a;
  },
  setAlpha: function setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
    }
    var _this$getRgbObj$value3 = this.getRgbObj().value,
      r = _this$getRgbObj$value3.r,
      g = _this$getRgbObj$value3.g,
      b = _this$getRgbObj$value3.b;
    var a = newAlpha;
    this.getRgbObj().value = {
      r: r,
      g: g,
      b: b,
      a: a
    };
    return this.getRgbObj();
  },
  toNormalizedRgb: function toNormalizedRgb() {
    var _this$getRgbObj$value4 = this.getRgbObj().value,
      r = _this$getRgbObj$value4.r,
      g = _this$getRgbObj$value4.g,
      b = _this$getRgbObj$value4.b;
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255
    };
  },
  toNormalizedRgba: function toNormalizedRgba() {
    var _this$getRgbObj$value5 = this.getRgbObj().value,
      r = _this$getRgbObj$value5.r,
      g = _this$getRgbObj$value5.g,
      b = _this$getRgbObj$value5.b;
    var a = this.getAlpha();
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a: a
    };
  },
  toName: function toName() {
    var hex = (0, _utilities.truncateHex)(this.toHex());
    for (var color in _namedColors["default"]) {
      if (_namedColors["default"][color] === hex) {
        return color;
      }
    }
    return undefined;
  },
  // toNearestNamedColor (this: ColorConvertorInstance) { // TODO needs to use LAB
  //   const rgb1 = this.getRgbObj().value as RgbObject
  //   console.log(findClosestColor(rgb1, namedColorsRgb))
  // },
  // toNearestWebSafeColor () {
  //   return 'not implemented'
  // },
  toPercentageRgb: function toPercentageRgb() {
    var _this$getRgbObj$value6 = this.getRgbObj().value,
      r = _this$getRgbObj$value6.r,
      g = _this$getRgbObj$value6.g,
      b = _this$getRgbObj$value6.b;
    return {
      r: r / 255 * 100,
      g: g / 255 * 100,
      b: b / 255 * 100
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    var _this$toPercentageRgb = this.toPercentageRgb(),
      r = _this$toPercentageRgb.r,
      g = _this$toPercentageRgb.g,
      b = _this$toPercentageRgb.b;
    return "rgb(".concat(r, "%, ").concat(g, "%, ").concat(b, "%)");
  },
  equals: function equals(color2) {
    var _ref = (0, _conversions.toRgbBase)((0, _inputParser.inputParser)(color2)).value,
      r = _ref.r,
      g = _ref.g,
      b = _ref.b;
    return this.getColorObj().value.r === r && this.getColorObj().value.g === g && this.getColorObj().value.b === b;
  },
  random: function random() {
    this._rgbObj = {
      format: 'rgb',
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    };
    return this._rgbObj;
  },
  clone: function clone() {
    // @ts-expect-error
    return new ColorConvertor(this.getInput());
  },
  /*
    Readability Methods
    <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
   */
  // Analyze the 2 colors and returns the color contrast defined by WCAG Version 2
  readability: function readability(color2) {
    var l1 = this.getLuminance();
    // @ts-expect-error
    var l2 = new ColorConvertor(color2).getLuminance();
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  } // isReadable (color2: string) {
  //   const readability = this.readability(color2)
  //   console.log(readability)
  // }
};

// Combination Methods

// Utility Methods
var _default = exports["default"] = ColorConvertor;
//# sourceMappingURL=colorconvertor.js.map