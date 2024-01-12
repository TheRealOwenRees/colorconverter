import { type CmykObject, type ColorObjType, type HslObject, type HsvObject, type LabObject, type LchObject, type RgbObject, type XyzObject } from './types';
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
    /**
     * Returns the RGB values in the range 0-255
     * @returns {RgbObject} - RGB values in the range 0-255
     * @memberof ColorConvertor
     */
    toRgb(): RgbObject;
    /**
     * @returns {string} - RGB values in the range 0-255 as a string
     * @memberof ColorConvertor
     * @remarks "rgb(255, 255, 255)"
     */
    toRgbString(): string;
    /**
     * Checks if the parsed color is valid
     * @returns {boolean} - true if the parsed color is valid
     * @memberof ColorConvertor
     */
    isValid(): boolean;
    setColor(color: string): void;
    fromRatio(): string;
    fromPercentageRgb(): string;
    toHsv(): HsvObject;
    toHsvString(): string;
    toHsl(): HslObject;
    toHslString(): string;
    toHex(): string;
    toHexString(): string;
    toHex8(): string;
    toHex8String(): string;
    toCmy(): CmykObject;
    toCmyk(): CmykObject;
    toXyz(): XyzObject;
    toXyzString(): string;
    toLab(): LabObject;
    toLabString(): string;
    toLch(): LchObject;
    toLchString(): string;
    getBrightness(): number;
    getLuminance(): number;
    isDark(): boolean;
    isLight(): boolean;
    getFormat(): string | undefined;
    getAlpha(): number | undefined;
    setAlpha(newAlpha: number): void;
    toName(): string | undefined;
    toNearestNamedColor(): string;
    toPercentageRgb(): RgbObject;
    toPercentageRgbString(): string;
    equals(color2: string): boolean;
    /**
       * Returns a random color in sRGB color space
       * @returns {void}
       * @memberof ColorConvertor
       * @remarks Will overwrite the current color
       */
    random(): void;
    clone(): ColorConvertor;
    /**
     * Returns the contrast ratio between the current color and the color passed as an argument
     * @param color2 - The color to compare the current color to
     * @returns {number} - The contrast ratio between the current color and the color passed as an argument
     * @memberof ColorConvertor
     * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
     */
    readability(color2: string): number;
}
export default ColorConvertor;
//# sourceMappingURL=colorconvertor.d.ts.map