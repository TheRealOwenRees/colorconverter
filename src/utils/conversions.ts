/*
    Based on the following gist:
    https://gist.github.com/avisek/eadfbe7a7a169b1001a2d3affc21052e
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
import { convertDecimalToHex, expandHex } from './utilities'

// any color type to rgb
export function toRgbBase (colorObj: ColorObjType): ColorObjType {
  if (colorObj.format === 'rgb' || colorObj.format === 'rgba') {
    return colorObj
  }
  if (colorObj.format === 'hex' && typeof colorObj.value === 'string') {
    return {
      format: 'rgb',
      value: hexToRgb(colorObj.value)
    }
  }
  if (colorObj.format === 'hsl') {
    return {
      format: 'rgb',
      value: hslToRgb(colorObj.value as HslObject)
    }
  }
  if (colorObj.format === 'hsv') {
    return {
      format: 'rgb',
      value: hsvToRgb(colorObj.value as HsvObject)
    }
  }
  return {
    format: undefined,
    value: undefined
  }
}

// TODO HSLA to RGBA and add to toRgbBase as well, returning RGBA

export function rgbToHsl (rgb: RgbObject): HslObject {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

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
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / diff + 2
        break
      case b:
        h = (r - g) / diff + 4
        break
      default:
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: s * 100,
    l: l * 100
  }
}

export function hslToRgb (hsl: HslObject): RgbObject {
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

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export function rgbToHsv (rgb: RgbObject): HsvObject {
  if (rgb === undefined) {
    return {
      h: undefined,
      s: undefined,
      v: undefined
    }
  }

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

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
    const rr = diffc(r)
    const gg = diffc(g)
    const bb = diffc(b)

    if (r === max) {
      h = b - g
    } else if (g === max) {
      h = 1 / 3 + rr - bb
    } else if (b === max) {
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
    s: s * 100,
    v: v * 100
  }
}

export function hsvToRgb (hsv: HsvObject): RgbObject {
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
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export function rgbToHex (rgb: RgbObject): string {
  const binaryRgb = (rgb.r << 16) | (rgb.g << 8) | rgb.b
  return binaryRgb.toString(16).padStart(6, '0')
}

export function rgbaToHex8 (rgba: RgbObject): string {
  const binaryRgb = rgbToHex({ r: rgba.r, g: rgba.g, b: rgba.b })
  const aHex = convertDecimalToHex(rgba.a ?? 1)
  return `${binaryRgb.padStart(6, '0')}${aHex === '0' ? '00' : aHex}`
}

export function hexToRgb (hexInput: string): RgbObject {
  const hex = expandHex(hexInput)
  const rgb = parseInt(hex.replace('#', ''), 16)
  return {
    r: (rgb >> 16) & 0xff,
    g: (rgb >> 8) & 0xff,
    b: rgb & 0xff
  }
}

export function rgbToXyz (rgb: RgbObject): XyzObject {
  let { r, g, b } = rgb
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

export function xyzToLab (xyz: XyzObject): LabObject {
  let { x, y, z } = xyz
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
  const { l, a, b } = lab
  let h = Math.atan2(b, a)
  h > 0 ? h = (h / Math.PI) * 180 : h = 360 - (Math.abs(h) / Math.PI) * 180

  return {
    l,
    c: Math.sqrt(a * a + b * b),
    h
  }
}

export function rgbToCmy (rgb: RgbObject): CmykObject {
  const { r, g, b } = rgb
  return {
    c: 1 - (r / 255),
    m: 1 - (g / 255),
    y: 1 - (b / 255)
  }
}

export function cmyToCmyk (cmy: CmykObject): CmykObject {
  const { c, m, y } = cmy
  let k: number = 1
  if (c < k) k = c
  if (m < k) k = m
  if (y < k) k = y
  if (k === 1) return { c: 0, m: 0, y: 0, k: 1 }
  return {
    c: (c - k) / (1 - k),
    m: (m - k) / (1 - k),
    y: (y - k) / (1 - k),
    k
  }
}
