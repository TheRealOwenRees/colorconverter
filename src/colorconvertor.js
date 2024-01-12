"use strict";
/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inputParser_1 = require("./utils/inputParser");
const conversions_1 = require("./utils/conversions");
const utilities_1 = require("./utils/utilities");
const namedColors_1 = __importStar(require("./utils/namedColors"));
class ColorConvertor {
    constructor(colorInput) {
        this._colorInput = colorInput !== null && colorInput !== void 0 ? colorInput : undefined; // string input of any color format
        this._colorObj = (0, inputParser_1.inputParser)(this._colorInput); // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
        this._rgbObj = (0, conversions_1.toRgbBase)(this._colorObj); // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
    }
    getInput() {
        var _a;
        return (_a = this._colorInput) !== null && _a !== void 0 ? _a : '';
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
        return (0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj());
    }
    /**
     * @returns {string} - RGB values in the range 0-255 as a string
     * @memberof ColorConvertor
     * @remarks "rgb(255, 255, 255)"
     */
    toRgbString() {
        const { r, g, b, a } = this.toRgb();
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
        this.setColorObj((0, inputParser_1.inputParser)(this.getInput()));
        this.setRbgObj((0, conversions_1.toRgbBase)(this.getColorObj()));
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
        return (0, conversions_1.rgbNormalizedToHsv)(this.getRgbObj());
    }
    toHsvString() {
        const { h, s, v } = this.toHsv();
        return `hsv(${h}, ${s}%, ${v}%)`;
    }
    toHsl() {
        return (0, conversions_1.rgbNormalizedToHsl)(this.getRgbObj());
    }
    toHslString() {
        const { h, s, l } = (0, conversions_1.rgbNormalizedToHsl)(this.getRgbObj());
        return `hsl(${h}, ${s}%, ${l}%)`;
    }
    toHex() {
        var _a;
        return (_a = (0, conversions_1.rgbToHex)((0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj()))) !== null && _a !== void 0 ? _a : '';
    }
    toHexString() {
        return `#${this.toHex()}`;
    }
    toHex8() {
        const { r, g, b } = (0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj());
        const a = this.getAlpha();
        return (0, conversions_1.rgbaToHex8)({ r, g, b, a });
    }
    toHex8String() {
        return `#${this.toHex8()}`;
    }
    toCmy() {
        return (0, conversions_1.rgbNormalizedToCmy)(this.getRgbObj());
    }
    toCmyk() {
        return (0, conversions_1.cmyToCmyk)(this.toCmy());
    }
    /*
      XYZ, CIE-L*ab, CIE-L*Ch(ab)
      formulae from https://www.easyrgb.com/en/math.php
  
      X, Y and Z output refers to a D65/2° standard illuminant.
      */
    toXyz() {
        return (0, conversions_1.rgbToXyz)(this.getRgbObj());
    }
    toXyzString() {
        const { x, y, z } = this.toXyz();
        return `xyz(${x}, ${y}, ${z})`;
    }
    // CIE-L*ab
    toLab() {
        return (0, conversions_1.xyzToLab)(this.toXyz());
    }
    toLabString() {
        const { l, a, b } = this.toLab();
        return `lab(${l}, ${a}, ${b})`;
    }
    toLch() {
        return (0, conversions_1.labToLch)(this.toLab());
    }
    toLchString() {
        const { l, c, h } = this.toLch();
        return `lch(${l}, ${c}, ${h})`;
    }
    getBrightness() {
        return (0, utilities_1.calculateBrightness)((0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj()));
    }
    getLuminance() {
        return (0, utilities_1.calculateLuminance)(this.getRgbObj());
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
        let { a } = this.getRgbObj();
        a = a !== null && a !== void 0 ? a : 1; // 100% alpha if working with rgb values
        return a;
    }
    setAlpha(newAlpha) {
        if (newAlpha < 0 || newAlpha > 1) {
            throw new Error('Alpha value must be between 0 and 1');
        }
        const { r, g, b } = this.getRgbObj();
        const a = newAlpha;
        this.setRbgObj({ r, g, b, a });
    }
    toName() {
        const hex = (0, utilities_1.truncateHex)(this.toHex());
        for (const color in namedColors_1.default) {
            if (namedColors_1.default[color] === hex) {
                return color;
            }
        }
        return undefined;
    }
    toNearestNamedColor() {
        const rgb = (0, conversions_1.rgbNormalizedToRgb)(this.getRgbObj());
        return (0, utilities_1.findClosestColor)(rgb, namedColors_1.namedColorsRgb);
    }
    toPercentageRgb() {
        const { r, g, b } = this.getRgbObj();
        return {
            r: r !== undefined ? r * 100 : undefined,
            g: g !== undefined ? g * 100 : undefined,
            b: b !== undefined ? b * 100 : undefined
        };
    }
    toPercentageRgbString() {
        const { r, g, b } = this.toPercentageRgb();
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
        this.setRbgObj((0, conversions_1.toRgbBase)(this.getColorObj()));
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
exports.default = ColorConvertor;
