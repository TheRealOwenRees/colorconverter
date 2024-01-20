export interface ColorConverterInterface {
  getInput: () => string;
  getColorObj: () => ColorObjType;
  getRgbObj: () => RgbObject;
  setColor: (color: string) => void;
  isValid: () => boolean;
  toRgb: () => RgbObject;
  toRgbString: () => string;
  toNormalizedRgb: () => RgbObject;
  toNormalizedRgbString: () => string;
  toHsv: () => HsvObject;
  toHsvString: () => string;
  toHsl: () => HslObject;
  toHslString: () => string;
  toHex: () => string;
  toHexString: () => string;
  toHex8: () => string;
  toHex8String: () => string;
  toCmy: () => CmykObject;
  toCmyk: () => CmykObject;
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
  setAlpha: (alpha: number) => void;
  toName: () => string | undefined;
  toNearestNamedColor: () => string;
  toPercentageRgb: () => RgbObject;
  toPercentageRgbString: () => string;
  equals: (color: string) => boolean;
  random: () => void;
  clone: () => ColorConverterInterface;
  readability: (color: string) => number;
  isReadable: (color: string) => WcagContrastInterface;
}

export interface ColorConversionInterface {
  toRgbBase: (colorObj: ColorObjType) => RgbObject;
  hexToNormalizedRgb: (hex: string) => RgbObject;
  rgbToNormalizedRgb: (rgb: RgbObject) => RgbObject;
  rgbNormalizedToRgb: (rgb: RgbObject) => RgbObject;
  rgbNormalizedToRgbPercent: (rgb: RgbObject) => RgbObject;
  lrgbToRgb: (lRgb: RgbObject) => RgbObject;
  rgbToHex: (rgb: RgbObject) => string | undefined;
  rgbaToHex8: (rgba: RgbObject) => string;
  rgbNormalizedToHsl: (rgb: RgbObject) => HslObject;
  rgbNormalizedToHsv: (rgb: RgbObject) => HsvObject;
  hslToRgbNormalized: (hsl: HslObject) => RgbObject;
  hsvToRgbNormalized: (hsv: HsvObject) => RgbObject;
  hexToRgb: (hex: string) => RgbObject;
  rgbNormalizedToCmy: (rgb: RgbObject) => CmykObject;
  cmyToCmyk: (cmy: CmykObject) => CmykObject;
  xyzToLab: (xyz: XyzObject) => LabObject;
  labToLch: (lab: LabObject) => LchObject;
  lchToLab: (lch: LchObject) => LabObject;
  labToXyz: (lab: LabObject) => XyzObject;
  xyzToRgbNormalized: (xyz: XyzObject) => RgbObject;
  rgbToXyz: (rgb: RgbObject) => XyzObject;
  xyzToOklab: (xyz: XyzObject) => LabObject;
  okLabToXyz: (lab: LabObject) => XyzObject;
  okLabToLinearRgb: (lab: LabObject) => RgbObject;
  lRgbToNormalizedRgb: (lRgb: RgbObject) => RgbObject;
  findClosestColor: (
    rgb: RgbObject,
    namedColorsRgb: Record<string, RgbObject>,
  ) => string;
}

export interface UtilitiesInterface {
  convertDecimalToHex: (decimal: number) => string;
  calculateBrightness: (rgb: RgbObject) => number;
  calculateLuminance: (rgb: RgbObject) => number;
  truncateHex: (hex: string) => string;
  expandHex: (hex: string) => string;
  labDeltaE: (lab1: LabObject, lab2: LabObject) => number;
  randomRgbColor: () => RgbObject;
  calculateContrastRatio: (luminance1: number, luminance2: number) => number;
  calculateReadability: (contrastRatio: number) => WcagContrastInterface;
}

export interface ColorObjType {
  format: string | undefined;
  value: RgbObject | HslObject | HsvObject | LchObject | string | undefined;
}

export interface RgbObject {
  r: number | undefined;
  g: number | undefined;
  b: number | undefined;
  a?: number | undefined;
}

export interface HsvObject {
  h: number;
  s: number;
  v: number;
}

export interface HslObject {
  h: number;
  s: number;
  l: number;
  a?: number;
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
  alpha?: number;
}

export interface LchObject {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

export interface CmykObject {
  c: number;
  m: number;
  y: number;
  k?: number;
}

export interface WcagContrastInterface {
  AA: {
    large: boolean;
    normal: boolean;
    small: boolean;
  };
  AAA: {
    large: boolean;
    normal: boolean;
    small: boolean;
  };
}
