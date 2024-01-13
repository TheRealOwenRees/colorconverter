/*
  Color conversion functions. 'Normalized' means 0-1 range.
  Formulae from https://www.easyrgb.com/en/math.php
*/

import {
  type CmykObject,
  type ColorObjType,
  type HslObject,
  type HsvObject,
  type LabObject,
  type LchObject,
  type RgbObject,
  type XyzObject
} from '../types'
import { convertDecimalToHex, expandHex, inverseMatrix } from './utilities'

const referenceWhiteConstants = {
  x: 95.047,
  y: 100,
  z: 108.883
}

/*
   RGB / RGBA conversions
*/

export function toRgbBase (colorObj: ColorObjType): RgbObject {
  if (colorObj.format === 'rgb' || colorObj.format === 'rgba') {
    return rgbToNormalizedRgb(colorObj.value as RgbObject)
  }
  if (colorObj.format === 'hex' && typeof colorObj.value === 'string') {
    return rgbToNormalizedRgb(hexToRgb(colorObj.value))
  }
  if (colorObj.format === 'hsl') {
    return hslToRgbNormalized(colorObj.value as HslObject)
  }
  if (colorObj.format === 'hsv') {
    return hsvToRgbNormalized(colorObj.value as HsvObject)
  }

  return {
    r: undefined,
    g: undefined,
    b: undefined,
    a: undefined
  }
}

export function rgbNormalizedToRgb (rgb: RgbObject): RgbObject {
  return {
    r: (rgb.r !== undefined) ? Math.round(rgb.r * 255) : undefined,
    g: (rgb.g !== undefined) ? Math.round(rgb.g * 255) : undefined,
    b: (rgb.b !== undefined) ? Math.round(rgb.b * 255) : undefined,
    a: rgb.a ?? undefined
  }
}

export function rgbNormalizedToRgbPercent (rgb: RgbObject): RgbObject {
  return {
    r: (rgb.r !== undefined) ? Math.round(rgb.r * 100) : undefined,
    g: (rgb.g !== undefined) ? Math.round(rgb.g * 100) : undefined,
    b: (rgb.b !== undefined) ? Math.round(rgb.b * 100) : undefined,
    a: rgb.a ?? undefined
  }
}

export function rgbToNormalizedRgb (rgb: RgbObject): RgbObject {
  const { r, g, b, a } = rgb
  return {
    r: (r !== undefined) ? r / 255 : undefined,
    g: (g !== undefined) ? g / 255 : undefined,
    b: (b !== undefined) ? b / 255 : undefined,
    a: a ?? undefined
  }
}

export function lrgbToRgb (lrgb: RgbObject): RgbObject {
  if (lrgb.r === undefined || lrgb.g === undefined || lrgb.b === undefined) {
    throw new Error('RGB values must be defined')
  }

  const fn = (c = 0): number => {
    const abs = Math.abs(c)
    return abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs
  }

  return {
    r: fn(lrgb.r),
    g: fn(lrgb.g),
    b: fn(lrgb.b),
    a: lrgb.a ?? undefined
  }
}

/*
  Hex / Hex8 conversions
*/

export function rgbToHex (rgb: RgbObject): string | undefined {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    return undefined
  }
  const binaryRgb = (rgb.r << 16) | (rgb.g << 8) | rgb.b
  return binaryRgb.toString(16).padStart(6, '0')
}

export function rgbaToHex8 (rgba: RgbObject): string {
  const binaryRgb = rgbToHex(rgba)
  if (binaryRgb === undefined) {
    return ''
  }
  const aHex = convertDecimalToHex(rgba.a ?? 1)
  return `${binaryRgb.padStart(6, '0')}${aHex === '0' ? '00' : aHex}`
}

/*
    HSL / HSV conversions
*/

export function rgbNormalizedToHsl (rgb: RgbObject): HslObject {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error('RGB values must be defined')
  }

  const max = Math.max(rgb.r, rgb.g, rgb.b)
  const min = Math.min(rgb.r, rgb.g, rgb.b)

  let h = (max + min) / 2
  let s
  const l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0 // Achromatic
  } else {
    const diff = max - min
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

    switch (max) {
      case rgb.r:
        h = (rgb.g - rgb.b) / diff + (rgb.g < rgb.b ? 6 : 0)
        break
      case rgb.g:
        h = (rgb.b - rgb.r) / diff + 2
        break
      case rgb.b:
        h = (rgb.r - rgb.g) / diff + 4
        break
      default:
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

export function rgbNormalizedToHsv (rgb: RgbObject): HsvObject {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error('RGB values must be defined')
  }

  const max = Math.max(rgb.r, rgb.g, rgb.b)
  const min = Math.min(rgb.r, rgb.g, rgb.b)

  let h = max
  let s = max
  const v = max

  const diff = max - min
  const diffc = (c: number): number => (max - c) / 6 / diff + 1 / 2

  if (diff === 0) {
    h = 0
    s = 0
  } else {
    s = diff / max
    const rr = diffc(rgb.r)
    const gg = diffc(rgb.g)
    const bb = diffc(rgb.b)

    if (rgb.r === max) {
      h = rgb.b - rgb.g
    } else if (rgb.g === max) {
      h = 1 / 3 + rr - bb
    } else if (rgb.b === max) {
      h = 2 / 3 + gg - rr
    }

    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

export function hslToRgbNormalized (hsl: HslObject): RgbObject {
  function hue2rgb (p: number, q: number, t: number): number {
    if (t < 0) {
      t += 1
    }

    if (t > 1) {
      t -= 1
    }

    if (t < 1 / 6) {
      return p + (q - p) * 6 * t
    }

    if (t < 1 / 2) {
      return q
    }

    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6
    }

    return p
  }

  const h = (hsl.h ?? 0) / 360
  const s = (hsl.s ?? 0) / 100
  const l = (hsl.l ?? 0) / 100

  let r
  let g
  let b

  if (s === 0) {
    r = g = b = l // Achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return { r, g, b }
}

export function hsvToRgbNormalized (hsv: HsvObject): RgbObject {
  const h = (hsv.h ?? 0) / 360 * 6
  const s = (hsv.s ?? 0) / 100
  const v = (hsv.v ?? 0) / 100

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  const mod = i % 6

  const r = [v, q, p, p, t, v][mod]
  const g = [t, v, v, q, p, p][mod]
  const b = [p, p, t, v, v, q][mod]
  return { r, g, b }
}

export function hexToRgb (hexColor: string): RgbObject {
  const hex = expandHex(hexColor)
  const rgb = parseInt(hex.replace('#', ''), 16)
  return {
    r: (rgb >> 16) & 0xff,
    g: (rgb >> 8) & 0xff,
    b: rgb & 0xff
  }
}

/*
  CMY / CMYK conversions
*/

export function rgbNormalizedToCmy (rgb: RgbObject): CmykObject {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error('RGB values must be defined')
  }

  return {
    c: 1 - (rgb.r),
    m: 1 - (rgb.g),
    y: 1 - (rgb.b)
  }
}

export function cmyToCmyk (cmy: CmykObject): CmykObject {
  if (cmy.c === undefined || cmy.m === undefined || cmy.y === undefined) {
    throw new Error('CMY values must be defined')
  }

  let k: number = 1
  if (cmy.c < k) k = cmy.c
  if (cmy.m < k) k = cmy.m
  if (cmy.y < k) k = cmy.y
  if (k === 1) return { c: 0, m: 0, y: 0, k: 1 }
  return {
    c: (cmy.c - k) / (1 - k),
    m: (cmy.m - k) / (1 - k),
    y: (cmy.y - k) / (1 - k),
    k
  }
}

/*
  XYZ, CIE-L*ab, CIE-L*Ch(ab) conversions

  X, Y and Z output refers to a D65/2° standard illuminant.

  Reference white constants are based on the standard illuminant D65:
  https://en.wikipedia.org/wiki/Illuminant_D65

  The following is a list of reference white points for various standard illuminants:
  https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants

  Pass in a custom reference white point if you want to use a different one, e.g.:
  { x: 95.047, y: 100, z: 108.883 } for D65
  { x: 96.422, y: 100, z: 82.521 } for D50
  { x: 100, y: 100, z: 100 } for E
*/

// TODO deprecate XYZ, use modern conversions of lRGB instead

export function xyzToLab (xyz: XyzObject): LabObject {
  let { x, y, z } = xyz

  if (x === undefined || y === undefined || z === undefined) {
    throw new Error('XYZ values must be defined')
  }

  x /= 95.047
  y /= 100
  z /= 108.883

  x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116
  y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116
  z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116

  return {
    l: (116 * y) - 16,
    a: 500 * (x - y),
    b: 200 * (y - z)
  }
}

export function labToLch (lab: LabObject): LchObject {
  if (lab.l === undefined || lab.a === undefined || lab.b === undefined) {
    throw new Error('LAB values must be defined')
  }

  let h = Math.atan2(lab.b, lab.a)
  h > 0 ? h = (h / Math.PI) * 180 : h = 360 - (Math.abs(h) / Math.PI) * 180

  return {
    l: lab.l,
    c: Math.sqrt(lab.a * lab.a + lab.b * lab.b),
    h
  }
}

export function lchToLab (lch: LchObject): LabObject {
  if (lch.l === undefined || lch.c === undefined || lch.h === undefined) {
    throw new Error('LCH values must be defined')
  }

  const hr = lch.h * Math.PI / 180

  return {
    l: lch.l,
    a: Math.cos(hr) * lch.c,
    b: Math.sin(hr) * lch.c
  }
}

export function labToXyz (lab: LabObject, referenceWhite: Record<string, number> = referenceWhiteConstants): XyzObject {
  if (lab.l === undefined || lab.a === undefined || lab.b === undefined) {
    throw new Error('LAB values must be defined')
  }

  let y = (lab.l + 16) / 116
  let x = lab.a / 500 + y
  let z = y - lab.b / 200

  const y2 = Math.pow(y, 3)
  const x2 = Math.pow(x, 3)
  const z2 = Math.pow(z, 3)

  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787

  return {
    x: x * referenceWhite.x,
    y: y * referenceWhite.y,
    z: z * referenceWhite.z
  }
}

export function xyzToRgbNormalized (xyz: XyzObject): RgbObject {
  if (xyz.x === undefined || xyz.y === undefined || xyz.z === undefined) {
    return {
      r: undefined,
      g: undefined,
      b: undefined
    }
  }
  let { x, y, z } = xyz
  x /= 100
  y /= 100
  z /= 100

  const r = x * 3.2406 + y * -1.5372 + z * -0.4986
  const g = x * -0.9689 + y * 1.8758 + z * 0.0415
  const b = x * 0.0557 + y * -0.2040 + z * 1.0570

  return {
    r: r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92,
    g: g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92,
    b: b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92
  }
}

export function rgbToXyz (rgb: RgbObject): XyzObject { // TODO work with normalised figures, round to sRGB
  let { r, g, b } = rgb

  if (r === undefined || g === undefined || b === undefined) {
    throw new Error('RGB values must be defined')
  }

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

  r *= 100
  g *= 100
  b *= 100

  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505
  }
}

/*
  OKLAB <- -> XYZ conversions
  Formula from https://bottosson.github.io/posts/oklab/

  OKLAB uses a D65/10° standard illuminant.

  OKLCH uses the same conversion as LCH, but with the OKLAB color space.
*/

const M1 = [
  [0.8189330101, 0.3618667424, -0.1288597137],
  [0.0329845436, 0.9293118715, 0.0361456387],
  [0.0482003018, 0.2643662691, 0.6338517070]
]

const M2 = [
  [0.2104542553, 0.7936177850, -0.0040720468],
  [1.9779984951, -2.4285922050, 0.4505937099],
  [0.0259040371, 0.7827717662, -0.8086757660]
]

export function xyzToOklab (xyz: XyzObject): LabObject {
  const { x, y, z } = xyz

  if (x === undefined || y === undefined || z === undefined) {
    throw new Error('XYZ values must be defined')
  }

  const L = Math.cbrt(x * M1[0][0] + y * M1[0][1] - z * M1[0][2])
  const M = Math.cbrt(x * M1[1][0] + y * M1[1][1] + z * M1[1][2])
  const S = Math.cbrt(x * M1[2][0] + y * M1[2][1] + z * M1[2][2])

  return {
    l: M2[0][0] * L + M2[0][1] * M + M2[0][2] * S,
    a: M2[1][0] * L + M2[1][1] * M + M2[1][2] * S,
    b: M2[2][0] * L + M2[2][1] * M + M2[2][2] * S
  }
}

export function okLabToXyz (oklab: LabObject): XyzObject {
  const { l, a, b } = oklab

  if (l === undefined || a === undefined || b === undefined) {
    throw new Error('OKLAB values must be defined')
  }

  const invM1 = inverseMatrix(M1)
  const invM2 = inverseMatrix(M2)

  const L = Math.pow(l * invM2[0][0] + a * invM2[0][1] - b * invM2[0][2], 3)
  const M = Math.pow(l * invM2[1][0] + a * invM2[1][1] + b * invM2[1][2], 3)
  const S = Math.pow(l * invM2[2][0] + a * invM2[2][1] + b * invM2[2][2], 3)

  return {
    x: L * invM1[0][0] + M * invM1[0][1] + S * invM1[0][2],
    y: L * invM1[1][0] + M * invM1[1][1] + S * invM1[1][2],
    z: L * invM1[2][0] + M * invM1[2][1] + S * invM1[2][2]
  }
}
