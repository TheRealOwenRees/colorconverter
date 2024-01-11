import { type CmykObject, type ColorObjType, type HslObject, type HsvObject, type LabObject, type LchObject, type RgbObject, type XyzObject } from '../types';
export declare function toRgbBase(colorObj: ColorObjType): ColorObjType;
export declare function rgbToHsl(rgb: RgbObject): HslObject;
export declare function hslToRgb(hsl: HslObject): RgbObject;
export declare function rgbToHsv(rgb: RgbObject): HsvObject;
export declare function hsvToRgb(hsv: HsvObject): RgbObject;
export declare function rgbToHex(rgb: RgbObject): string;
export declare function rgbaToHex8(rgba: RgbObject): string;
export declare function hexToRgb(hexInput: string): RgbObject;
export declare function rgbToXyz(rgb: RgbObject): XyzObject;
export declare function xyzToLab(xyz: XyzObject): LabObject;
export declare function labToLch(lab: LabObject): LchObject;
export declare function rgbToCmy(rgb: RgbObject): CmykObject;
export declare function cmyToCmyk(cmy: CmykObject): CmykObject;
//# sourceMappingURL=conversions.d.ts.map