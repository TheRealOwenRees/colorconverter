export interface ColorObjType {
    format: string | undefined;
    value: RgbObject | HslObject | HsvObject | string | undefined;
}
export interface RgbObject {
    r: number;
    g: number;
    b: number;
    a?: number;
}
export interface HsvObject {
    h: number | undefined;
    s: number | undefined;
    v: number | undefined;
}
export interface HslObject {
    h: number | undefined;
    s: number | undefined;
    l: number | undefined;
    a?: number | undefined;
}
export interface XyzObject {
    x: number;
    y: number;
    z: number;
}
export interface LabObject {
    l: number;
    a: number;
    b: number;
}
export interface LchObject {
    l: number;
    c: number;
    h: number;
}
export interface ColorConvertorInstance {
    _colorInput: string;
    _colorObj: ColorObjType;
    _rgbObj: ColorObjType;
    getInput: () => string;
    getColorObj: () => ColorObjType;
    getRgbObj: () => ColorObjType;
    isValid: () => boolean;
    setColor: (color: string) => void;
    fromRatio: () => ColorObjType;
    toRgb: (this: ColorConvertorInstance) => ColorObjType;
    toRgbString: () => string;
    toHsv: (this: ColorConvertorInstance) => HsvObject;
    toHsvString: () => string;
    toHsl: (this: ColorConvertorInstance) => HslObject;
    toHslString: () => string;
    toHex: () => string;
    toHexString: () => string;
    toHex8: () => string;
    toHex8String: () => string;
    toXyz: () => XyzObject;
    toXyzString: () => string;
    toLab: () => LabObject;
    toLabString: () => string;
    toLch: () => LchObject;
    toLchString: () => string;
    getBrightness: () => number;
    getLuminance: () => number;
    isDark: () => boolean;
    isLight: () => boolean;
    getFormat: () => string | undefined;
    getAlpha: () => number | undefined;
    setAlpha: (newAlpha: number) => RgbObject;
    toNormalizedRgb: () => RgbObject;
    toNormalizedRgba: () => RgbObject;
    toName: (this: ColorConvertorInstance) => string | undefined;
    toNearedNamesColor: () => string;
    toNearestWebSafeColor: () => string;
    toPercentageRgb: () => RgbObject;
    toPercentageRgbString: () => string;
    equals: (color2: string) => boolean;
    random: () => RgbObject;
    readability: (color2: string) => number;
    isReadable: (color2: string) => boolean;
}
//# sourceMappingURL=types.d.ts.map