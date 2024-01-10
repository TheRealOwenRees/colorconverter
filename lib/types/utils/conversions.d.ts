import { type ColorObjType, type HslObject, type HsvObject, type RgbObject } from '../types';
export declare function toRgbBase(colorObj: ColorObjType): ColorObjType;
export declare function rgbToHsl(rgb: RgbObject): HslObject;
export declare function hslToRgb(hsl: HslObject): RgbObject;
export declare function rgbToHsv(rgb: RgbObject): HsvObject;
export declare function hsvToRgb(hsv: HsvObject): RgbObject;
export declare function rgbToHex(rgb: RgbObject): string;
export declare function rgbaToHexA(rgba: RgbObject): string;
export declare function hexToRgb(hex: string): RgbObject;
//# sourceMappingURL=conversions.d.ts.map