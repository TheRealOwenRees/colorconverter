import { type LabObject, type RgbObject } from '../types'
import { rgbToXyz, xyzToLab } from './conversions'

/**
 * Converts a decimal number to a hex value
 * @param d - float between 0 and 1
 * @returns Hex value between 00 and ff as a string
 */
export function convertDecimalToHex (d: number): string {
  return Math.round(d * 255).toString(16)
}

/**
 * Calculates the brightness of a color
 * @param rgb - Color object in sRGB format 0-255
 * @returns Brightness of the color as a number between 0 and 255
 */
export function calculateBrightness (rgb: RgbObject): number {
  const { r, g, b } = rgb
  return (r * 299 + g * 587 + b * 114) / 1000
}

/**
 * Calculates the luminance of a color
 * @param rgb - Color object in sRGB format 0-255
 * @returns Luminance of the color as a number between 0 and 1
 */
export function calculateLuminance (rgb: RgbObject): number {
  // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  const { r, g, b } = rgb
  let R, G, B
  const RsRGB = r / 255
  const GsRGB = g / 255
  const BsRGB = b / 255
  if (RsRGB <= 0.03928) R = RsRGB / 12.92; else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4)
  if (GsRGB <= 0.03928) G = GsRGB / 12.92; else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4)
  if (BsRGB <= 0.03928) B = BsRGB / 12.92; else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

/**
 * Truncates 6 digit hex to 3 digit hex if possible. E.g. #ffffff -> #fff
 *
 * @param hex - 6 digit hex without hash
 * @returns 3 digit hex without hash if possible, otherwise returns the original hex
 */
export function truncateHex (hex: string): string {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2]
    }
  }
  return hex
}

/**
 * Expands 3 digit hex to 6 digit hex. E.g. #fff -> #ffffff
 *
 * @param hex - 3 digit hex without hash
 * @returns 6 digit hex without hash
 */
export function expandHex (hex: string): string {
  if (hex.length === 3) {
    return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2]
  }
  return hex
}

/**
 * Calculates the Euclidean distance between two Lab colors
 * @remarks CIE-L*ab color object { l, a, b }
 * @param lab1 - Color object 1
 * @param lab2 - Color object 2
 * @returns Euclidean distance between the two colors
 */
export function labEuclideanDistance (lab1: LabObject, lab2: LabObject): number {
  return Math.sqrt(Math.pow(lab1.l - lab2.l, 2) + Math.pow(lab1.a - lab2.a, 2) + Math.pow(lab1.b - lab1.b, 2))
}

/**
 * Finds the closest named color to the given color
 * @param rgb - Color to find the closest named color to, in sRGB format 0-255
 * @param namedColorsRgb - Named colors object in sRGB format 0-255
 * @returns Closest named color, e.g. 'red'
 */
export function findClosestColor (rgb: RgbObject, namedColorsRgb: Record<string, RgbObject>): string {
  let minDistance = Infinity
  let closestColor = ''
  const lab1 = xyzToLab(rgbToXyz(rgb))
  for (const color in namedColorsRgb) {
    const lab2 = xyzToLab(rgbToXyz(namedColorsRgb[color]))
    const distance = labEuclideanDistance(lab1, lab2)
    if (distance < minDistance) {
      closestColor = color
      minDistance = distance
    }
  }
  return closestColor
}
