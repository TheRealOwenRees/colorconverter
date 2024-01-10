export interface ColorObjType {
  format: string | undefined
  value: RgbObject | HslObject | HsvObject | string | undefined
}

export interface RgbObject {
  r: number
  g: number
  b: number
  a?: number
}
//
export interface HsvObject {
  h: number | undefined
  s: number | undefined
  v: number | undefined
}

export interface HslObject {
  h: number | undefined
  s: number | undefined
  l: number | undefined
  a?: number | undefined
}

export interface ColorConvertorInstance {
  _colorInput: string
  _colorObj: ColorObjType
  _rgbObj: ColorObjType

  getInput: () => ColorObjType
  isValid: () => boolean
  toRgb: (this: ColorConvertorInstance) => ColorObjType
  toRgbString: () => string
  toHsv: (this: ColorConvertorInstance) => HsvObject
  toHsvString: () => string
  toHsl: (this: ColorConvertorInstance) => HslObject
  toHslString: () => string
  toHex: () => string
  toHexString: () => string
  toHexA: () => string
  toHexAString: () => string
  getBrightness: () => number
  getLuminance: () => number
  isDark: () => boolean
  isLight: () => boolean
  getFormat: () => string | undefined
  getAlpha: () => number | undefined
  setAlpha: (newAlpha: number) => RgbObject
  toNormalizedRgb: () => RgbObject
  toNormalizedRgba: () => RgbObject
  toName: (this: ColorConvertorInstance) => string | undefined
  // toNearedNamesColor: () => string
  // toNearestWebSafeColor: () => string
  toPercentageRgb: () => RgbObject
  toPercetangeRgbString: () => string
  // equals: (color: string) => boolean
  // random: () => RgbObject
}
