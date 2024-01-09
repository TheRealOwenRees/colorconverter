/*
    Based on the following gist:
    https://gist.github.com/avisek/eadfbe7a7a169b1001a2d3affc21052e
*/

import { convertDecimalToHex } from './math'
import { type ColorInfo, type HslObject, type HsvObject, type RgbObject } from '../types'

// any color type to rgb
export function toRgbBase (input: ColorInfo | undefined): ColorInfo | undefined {
  if (input == null) {
    return {
      format: undefined,
      value: undefined
    }
  }
  if (input.format === 'rgb' || input.format === 'rgba') {
    return input
  }
  if (input.format === 'hex') {
    return {
      format: 'rgb',
      value: hexToRgb(input.value as string)
    }
  }
  if (input.format === 'hsl') {
    return {
      format: 'rgb',
      value: hslToRgb(input.value as HslObject)
    }
  }
  if (input.format === 'hsv') {
    return {
      format: 'rgb',
      value: hsvToRgb(input.value as HsvObject)
    }
  }
}

export function rgbToHsl (rgb: Record<string, number>): HslObject {
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
        // eslint-disable-next-line no-mixed-operators
        h = (g - b) / diff + (g < b ? 6 : 0)
        break
      case g:
        // eslint-disable-next-line no-mixed-operators
        h = (b - r) / diff + 2
        break
      case b:
        // eslint-disable-next-line no-mixed-operators
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

export function hslToRgb (hsl: { s: number, h: number, l: number }): RgbObject {
  function hue2rgb (p: number, q: number, t: number): number {
    if (t < 0) {
      t += 1
    }

    if (t > 1) {
      t -= 1
    }

    if (t < 1 / 6) {
      // eslint-disable-next-line no-mixed-operators
      return p + (q - p) * 6 * t
    }

    if (t < 1 / 2) {
      return q
    }

    if (t < 2 / 3) {
      // eslint-disable-next-line no-mixed-operators
      return p + (q - p) * (2 / 3 - t) * 6
    }

    return p
  }

  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r
  let g
  let b

  if (s === 0) {
    // eslint-disable-next-line no-multi-assign
    r = g = b = l // Achromatic
  } else {
    // eslint-disable-next-line no-mixed-operators
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    // eslint-disable-next-line no-mixed-operators
    const p = 2 * l - q

    // eslint-disable-next-line no-mixed-operators
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    // eslint-disable-next-line no-mixed-operators
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export function rgbToHsv (rgb: Record<string, number>): HsvObject {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = max
  let s = max
  const v = max

  const diff = max - min
  // eslint-disable-next-line no-mixed-operators
  const diffc = (c: number) => (max - c) / 6 / diff + 1 / 2

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
      // eslint-disable-next-line no-mixed-operators
      h = 1 / 3 + rr - bb
    } else if (b === max) {
      // eslint-disable-next-line no-mixed-operators
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
  const h = hsv.h / 360 * 6
  const s = hsv.s / 100
  const v = hsv.v / 100

  const i = Math.floor(h)
  const f = h - i
  const p = v * (1 - s)
  // eslint-disable-next-line no-mixed-operators
  const q = v * (1 - f * s)
  // eslint-disable-next-line no-mixed-operators
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

export function rgbToHex (rgb: Record<string, number>): string {
  const binaryRgb = (rgb.r << 16) | (rgb.g << 8) | rgb.b
  return binaryRgb.toString(16).padStart(6, '0')
}

export function rgbaToHexA (rgba: Record<string, number>): string {
  const binaryRgb = rgbToHex({ r: rgba.r, g: rgba.g, b: rgba.b })
  const aHex = rgba.a === 0 ? '00' : convertDecimalToHex(rgba.a)
  return `${binaryRgb.padStart(6, '0')}${aHex}`
}

export function hexToRgb (hex: string): RgbObject {
  const rgb = parseInt(hex.replace('#', ''), 16)
  return {
    r: (rgb >> 16) & 0xff,
    g: (rgb >> 8) & 0xff,
    b: rgb & 0xff
  }
}
