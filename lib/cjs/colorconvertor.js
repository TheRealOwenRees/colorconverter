"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _conversions = require("./utils/conversions");
var _inputParser = require("./utils/inputParser");
var _utilities = require("./utils/utilities");
var _namedColors = _interopRequireWildcard(require("./utils/namedColors"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/
var ColorConvertor = /*#__PURE__*/function () {
  function ColorConvertor(colorInput) {
    _classCallCheck(this, ColorConvertor);
    _defineProperty(this, "_colorInput", void 0);
    _defineProperty(this, "_colorObj", void 0);
    _defineProperty(this, "_rgbObj", void 0);
    this._colorInput = colorInput !== null && colorInput !== void 0 ? colorInput : undefined; // string input of any color format
    this._colorObj = (0, _inputParser.inputParser)(this._colorInput); // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = (0, _conversions.toRgbBase)(this._colorObj); // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
  }
  _createClass(ColorConvertor, [{
    key: "getInput",
    value: function getInput() {
      var _this$_colorInput;
      return (_this$_colorInput = this._colorInput) !== null && _this$_colorInput !== void 0 ? _this$_colorInput : "";
    }
  }, {
    key: "getColorObj",
    value: function getColorObj() {
      return this._colorObj;
    }
  }, {
    key: "getRgbObj",
    value: function getRgbObj() {
      return this._rgbObj;
    }
  }, {
    key: "setInput",
    value: function setInput(colorInput) {
      this._colorInput = colorInput;
    }
  }, {
    key: "setColorObj",
    value: function setColorObj(colorObj) {
      this._colorObj = colorObj;
    }
  }, {
    key: "setRbgObj",
    value: function setRbgObj(rgbObj) {
      this._rgbObj = rgbObj;
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.setInput(color);
      this.setColorObj((0, _inputParser.inputParser)(this.getInput()));
      this.setRbgObj((0, _conversions.toRgbBase)(this.getColorObj()));
    }

    /**
     * Returns the RGB values in the range 0-255
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toRgb() // { r: 255, g: 0, b: 0 }
     */
  }, {
    key: "toRgb",
    value: function toRgb() {
      return (0, _conversions.rgbNormalizedToRgb)(this.getRgbObj());
    }

    /**
     * Returns the RGB values in the range 0-255 as a string
     * @returns {string} - RGB values string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toRgbString() // "rgb(255, 0, 0)"
     */
  }, {
    key: "toRgbString",
    value: function toRgbString() {
      var _this$toRgb = this.toRgb(),
        r = _this$toRgb.r,
        g = _this$toRgb.g,
        b = _this$toRgb.b,
        a = _this$toRgb.a;
      return "".concat(a !== undefined ? "rgba" : "rgb", "(").concat(r, ", ").concat(g, ", ").concat(b).concat(a !== undefined ? ", ".concat(a) : "", ")");
    }

    /**
     * Checks if the parsed color is valid
     * @returns {boolean} - true if the parsed color is valid
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.isValid() // true
     */
  }, {
    key: "isValid",
    value: function isValid() {
      return this.getColorObj().value !== undefined;
    }

    // TODO implement
  }, {
    key: "fromRatio",
    value: function fromRatio() {
      return "not implemented";
    }

    // TODO implement
  }, {
    key: "fromPercentageRgb",
    value: function fromPercentageRgb() {
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
  }, {
    key: "toHsv",
    value: function toHsv() {
      return (0, _conversions.rgbNormalizedToHsv)(this.getRgbObj());
    }

    /**
     * Converts the current color to HSV as a string
     * @returns {string} - HSV values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsvString() // "hsv(0, 100%, 100%)"
     */
  }, {
    key: "toHsvString",
    value: function toHsvString() {
      var _this$toHsv = this.toHsv(),
        h = _this$toHsv.h,
        s = _this$toHsv.s,
        v = _this$toHsv.v;
      return "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)");
    }

    /**
     * Converts the current color to HSL
     * @returns {HslObject} - HSL values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHsl() // { h: 0, s: 100, l: 50 }
     */
  }, {
    key: "toHsl",
    value: function toHsl() {
      return (0, _conversions.rgbNormalizedToHsl)(this.getRgbObj());
    }

    /**
     * Converts the current color to HSL as a string
     * @returns {string} - HSL values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHslString() // "hsl(0, 100%, 50%)"
     */
  }, {
    key: "toHslString",
    value: function toHslString() {
      var _rgbNormalizedToHsl = (0, _conversions.rgbNormalizedToHsl)(this.getRgbObj()),
        h = _rgbNormalizedToHsl.h,
        s = _rgbNormalizedToHsl.s,
        l = _rgbNormalizedToHsl.l;
      return "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
    }

    /**
     * Converts the current color to Hex
     * @returns {string} - Hex value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex() // "ff0000"
     */
  }, {
    key: "toHex",
    value: function toHex() {
      var _rgbToHex;
      return (_rgbToHex = (0, _conversions.rgbToHex)((0, _conversions.rgbNormalizedToRgb)(this.getRgbObj()))) !== null && _rgbToHex !== void 0 ? _rgbToHex : "";
    }

    /**
     * Converts the current color to Hex as a string
     * @returns {string} - Hex value as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex() // "#ff0000"
     */
  }, {
    key: "toHexString",
    value: function toHexString() {
      return "#".concat(this.toHex());
    }

    /**
     * Converts the current color to Hex8
     * @returns {string} - Hex8 value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toHex8() // "ff0000ff"
     */
  }, {
    key: "toHex8",
    value: function toHex8() {
      var _rgbNormalizedToRgb = (0, _conversions.rgbNormalizedToRgb)(this.getRgbObj()),
        r = _rgbNormalizedToRgb.r,
        g = _rgbNormalizedToRgb.g,
        b = _rgbNormalizedToRgb.b;
      var a = this.getAlpha();
      return (0, _conversions.rgbaToHex8)({
        r: r,
        g: g,
        b: b,
        a: a
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
  }, {
    key: "toHex8String",
    value: function toHex8String() {
      return "#".concat(this.toHex8());
    }

    /**
     * Converts the current color to CMY
     * @returns {CmykObject} - CMYK values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toCmy() // { c: 0, m: 100, y: 100 }
     */
  }, {
    key: "toCmy",
    value: function toCmy() {
      return (0, _conversions.rgbNormalizedToCmy)(this.getRgbObj());
    }

    /** Converts the current color to CMYK
     * @returns {CmykObject} - CMYK values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toCmyk() // { c: 0, m: 100, y: 100, k: 0 }
     */
  }, {
    key: "toCmyk",
    value: function toCmyk() {
      return (0, _conversions.cmyToCmyk)(this.toCmy());
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
  }, {
    key: "toXyz",
    value: function toXyz() {
      return (0, _conversions.rgbToXyz)(this.getRgbObj());
    }

    /**
     * Converts the current color to XYZ as a string
     * @returns {string} - XYZ values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toXyzString() // "xyz(41.24, 21.26, 1.93)"
     */
  }, {
    key: "toXyzString",
    value: function toXyzString() {
      var _this$toXyz = this.toXyz(),
        x = _this$toXyz.x,
        y = _this$toXyz.y,
        z = _this$toXyz.z;
      return "xyz(".concat(x, ", ").concat(y, ", ").concat(z, ")");
    }

    /**
     * Converts the current color to LAB
     * @returns {LabObject} - LAB values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLab() // { l: 53.24, a: 80.09, b: 67.20 }
     */
  }, {
    key: "toLab",
    value: function toLab() {
      return (0, _conversions.xyzToLab)(this.toXyz());
    }

    /**
     * Converts the current color to LAB as a string
     * @returns {string} - LAB values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLabString() // "lab(53.24, 80.09, 67.20)"
     */
  }, {
    key: "toLabString",
    value: function toLabString() {
      var _this$toLab = this.toLab(),
        l = _this$toLab.l,
        a = _this$toLab.a,
        b = _this$toLab.b;
      return "lab(".concat(l, ", ").concat(a, ", ").concat(b, ")");
    }

    /**
     * Converts the current color to LCH
     * @returns {LchObject} - LCH values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLch() // { l: 53.24, c: 104.55, h: 40.85 }
     */
  }, {
    key: "toLch",
    value: function toLch() {
      return (0, _conversions.labToLch)(this.toLab());
    }

    /**
     * Converts the current color to LCH as a string
     * @returns {string} - LCH values as a string
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toLchString() // "lch(53.24, 104.55, 40.85)"
     */
  }, {
    key: "toLchString",
    value: function toLchString() {
      var _this$toLch = this.toLch(),
        l = _this$toLch.l,
        c = _this$toLch.c,
        h = _this$toLch.h;
      return "lch(".concat(l, ", ").concat(c, ", ").concat(h, ")");
    }

    /**
     * Returns the brightness of the current color
     * @returns {number} - Brightness value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.getBrightness() // 76.245
     */
  }, {
    key: "getBrightness",
    value: function getBrightness() {
      return (0, _utilities.calculateBrightness)((0, _conversions.rgbNormalizedToRgb)(this.getRgbObj()));
    }

    /**
     * Returns the luminance of the current color
     * @returns {number} - Luminance value
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.getLuminance() // 0.2126
     */
  }, {
    key: "getLuminance",
    value: function getLuminance() {
      return (0, _utilities.calculateLuminance)(this.getRgbObj());
    }

    /**
     * Returns true if the current color is dark
     * @returns {boolean} - true if the current color is dark
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.isDark() // true
     */
  }, {
    key: "isDark",
    value: function isDark() {
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
  }, {
    key: "isLight",
    value: function isLight() {
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
  }, {
    key: "getFormat",
    value: function getFormat() {
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
  }, {
    key: "getAlpha",
    value: function getAlpha() {
      var _a;
      var _this$getRgbObj = this.getRgbObj(),
        a = _this$getRgbObj.a;
      a = (_a = a) !== null && _a !== void 0 ? _a : 1; // 100% alpha if working with rgb values
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
  }, {
    key: "setAlpha",
    value: function setAlpha(newAlpha) {
      if (newAlpha < 0 || newAlpha > 1) {
        throw new Error("Alpha value must be between 0 and 1");
      }
      var _this$getRgbObj2 = this.getRgbObj(),
        r = _this$getRgbObj2.r,
        g = _this$getRgbObj2.g,
        b = _this$getRgbObj2.b;
      var a = newAlpha;
      this.setRbgObj({
        r: r,
        g: g,
        b: b,
        a: a
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
  }, {
    key: "toName",
    value: function toName() {
      var hex = (0, _utilities.truncateHex)(this.toHex());
      for (var color in _namedColors["default"]) {
        if (_namedColors["default"][color] === hex) {
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
  }, {
    key: "toNearestNamedColor",
    value: function toNearestNamedColor() {
      var rgb = (0, _conversions.rgbNormalizedToRgb)(this.getRgbObj());
      return (0, _utilities.findClosestColor)(rgb, _namedColors.namedColorsRgb);
    }

    /**
     * Returns the RGB values in the range 0-100
     * @returns {RgbObject} - RGB values object
     * @memberof ColorConvertor
     * @example
     * const color = new ColorConvertor('red')
     * color.toPercentageRgb() // { r: 100, g: 0, b: 0 }
     */
  }, {
    key: "toPercentageRgb",
    value: function toPercentageRgb() {
      var _this$getRgbObj3 = this.getRgbObj(),
        r = _this$getRgbObj3.r,
        g = _this$getRgbObj3.g,
        b = _this$getRgbObj3.b;
      return {
        r: r !== undefined ? r * 100 : undefined,
        g: g !== undefined ? g * 100 : undefined,
        b: b !== undefined ? b * 100 : undefined
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
  }, {
    key: "toPercentageRgbString",
    value: function toPercentageRgbString() {
      var _this$toPercentageRgb = this.toPercentageRgb(),
        r = _this$toPercentageRgb.r,
        g = _this$toPercentageRgb.g,
        b = _this$toPercentageRgb.b;
      return "rgb(".concat(r, "%, ").concat(g, "%, ").concat(b, "%)");
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
  }, {
    key: "equals",
    value: function equals(color2) {
      return this.toRgbString() === new ColorConvertor(color2).toRgbString();
    }

    /**
     * Returns a random color in sRGB color space
     * @returns {void}
     * @memberof ColorConvertor
     * @remarks Will overwrite the current color
     */
  }, {
    key: "random",
    value: function random() {
      this.setColorObj({
        format: "rgb",
        value: {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256)
        }
      });
      this.setRbgObj((0, _conversions.toRgbBase)(this.getColorObj()));
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
  }, {
    key: "clone",
    value: function clone() {
      return new ColorConvertor(this.getInput());
    }

    /**
     * Returns the contrast ratio between the current color and the color passed as an argument
     * @param color2 - The color to compare the current color to
     * @returns {number} - The contrast ratio between the current color and the color passed as an argument
     * @memberof ColorConvertor
     * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     */
  }, {
    key: "readability",
    value: function readability(color2) {
      var l1 = this.getLuminance();
      var l2 = new ColorConvertor(color2).getLuminance();
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
  }, {
    key: "isReadable",
    value: function isReadable(color2) {
      var readability = this.readability(color2);
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
  }]);
  return ColorConvertor;
}();
var _default = exports["default"] = ColorConvertor;
//# sourceMappingURL=colorconvertor.js.map