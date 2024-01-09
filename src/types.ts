// Color convertor instance
export interface ColorConvertorInstance {
  _color: ColorType
  _input: ColorInfo | undefined
  _rgb: ColorInfo | undefined

  isValid: () => boolean
  getInput: () => ColorInfo
  getFormat: () => string
  getAlpha: () => number
  getBrightness: () => number
  getLuminance: () => number
  setAlpha: (alpha: number) => void
  toHsv: () => Record<string, unknown>
  toHsvString: () => string
  toHsl: () => Record<string, unknown>
  toHslString: () => string
  toHex: () => string
  toHexString: () => string
  toHexA: () => string
  toHexAString: () => string
  toRgb: (_input: ColorInfo) => Record<string, string>
  toRgbString: () => string
  getName: () => string
  isDark: () => boolean
  isLight: () => boolean
  getNearestWebSafeColor: () => string
  setNearestWebSafeColor: () => void
}

// Color convertor instance arguments
export type ColorType = string | Record<string, unknown>

// Colour info objects
export interface ColorInfo {
  format: string | undefined
  value: string | RgbObject | HslObject | HsvObject | undefined
}

// Named colors
export type NamedColors = Record<string, string>

export interface RgbObject {
  r: number
  g: number
  b: number
  a?: number
}

export interface HslObject {
  h: number
  s: number
  l: number
  a?: number
}

export interface HsvObject {
  h: number
  s: number
  v: number
}
