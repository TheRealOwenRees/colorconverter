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
  getInput: function getInput() {
    return this._colorObj;
  },
  isValid: function isValid() {
    return this._colorObj.value !== undefined;
  },
  toRgb: function toRgb() {
    return (0, _conversions.toRgbBase)(this.getInput());
  },
  toRgbString: function toRgbString() {
    var _this$_rgbObj = this._rgbObj,
      format = _this$_rgbObj.format,
      _this$_rgbObj$value = _this$_rgbObj.value,
      r = _this$_rgbObj$value.r,
      g = _this$_rgbObj$value.g,
      b = _this$_rgbObj$value.b,
      a = _this$_rgbObj$value.a;
    return "".concat(format, "(").concat(r, ", ").concat(g, ", ").concat(b).concat(a !== undefined ? ", ".concat(a) : '', ")");
  },
  toHsv: function toHsv() {
    return (0, _conversions.rgbToHsv)(this._rgbObj.value);
  },
  toHsvString: function toHsvString() {
    var _rgbToHsv = (0, _conversions.rgbToHsv)(this._rgbObj.value),
      h = _rgbToHsv.h,
      s = _rgbToHsv.s,
      v = _rgbToHsv.v;
    return "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)");
  },
  toHsl: function toHsl() {
    return (0, _conversions.rgbToHsl)(this._rgbObj.value);
  },
  toHslString: function toHslString() {
    var _rgbToHsl = (0, _conversions.rgbToHsl)(this._rgbObj.value),
      h = _rgbToHsl.h,
      s = _rgbToHsl.s,
      l = _rgbToHsl.l;
    return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
  },
  toHex: function toHex() {
    return (0, _conversions.rgbToHex)(this._rgbObj.value);
  },
  toHexString: function toHexString() {
    return "#".concat(this.toHex());
  },
  toHexA: function toHexA() {
    var _this$_rgbObj$value2 = this._rgbObj.value,
      r = _this$_rgbObj$value2.r,
      g = _this$_rgbObj$value2.g,
      b = _this$_rgbObj$value2.b;
    var a = this.getAlpha();
    return (0, _conversions.rgbaToHexA)({
      r: r,
      g: g,
      b: b,
      a: a
    });
  },
  toHexAString: function toHexAString() {
    return "#".concat(this.toHexA());
  },
  getBrightness: function getBrightness() {
    return (0, _utilities.calculateBrightness)(this._rgbObj.value);
  },
  getLuminance: function getLuminance() {
    return (0, _utilities.calculateLuminance)(this._rgbObj.value);
  },
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return this.getBrightness() >= 128;
  },
  getFormat: function getFormat() {
    return this._rgbObj.format;
  },
  getAlpha: function getAlpha() {
    var a = this._rgbObj.value.a;
    a = a === undefined ? 1 : a; // 100% alpha if working with rgb values
    return a;
  },
  setAlpha: function setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
    }
    var _this$_rgbObj$value3 = this._rgbObj.value,
      r = _this$_rgbObj$value3.r,
      g = _this$_rgbObj$value3.g,
      b = _this$_rgbObj$value3.b;
    var a = newAlpha;
    this._rgbObj.value = {
      r: r,
      g: g,
      b: b,
      a: a
    };
    return this._rgbObj;
  },
  toNormalizedRgb: function toNormalizedRgb() {
    var _this$_rgbObj$value4 = this._rgbObj.value,
      r = _this$_rgbObj$value4.r,
      g = _this$_rgbObj$value4.g,
      b = _this$_rgbObj$value4.b;
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255
    };
  },
  toNormalizedRgba: function toNormalizedRgba() {
    var _this$_rgbObj$value5 = this._rgbObj.value,
      r = _this$_rgbObj$value5.r,
      g = _this$_rgbObj$value5.g,
      b = _this$_rgbObj$value5.b;
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
  // toNearestNamedColor () {
  //   return 'not implemented'
  // },
  // toNearestWebSafeColor () {
  //   return 'not implemented'
  // },
  toPercentageRgb: function toPercentageRgb() {
    var _this$_rgbObj$value6 = this._rgbObj.value,
      r = _this$_rgbObj$value6.r,
      g = _this$_rgbObj$value6.g,
      b = _this$_rgbObj$value6.b;
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
  }
};
var _default = exports["default"] = ColorConvertor;
//# sourceMappingURL=colorconvertor.js.map