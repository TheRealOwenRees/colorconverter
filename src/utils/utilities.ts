import { type RgbObject } from '../types'

export function convertDecimalToHex (d: number): string {
  return Math.round(d * 255).toString(16)
}

export function calculateBrightness (rgb: RgbObject): number {
  const { r, g, b } = rgb
  return (r * 299 + g * 587 + b * 114) / 1000
}

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

// e.g. turn #ffffff into #fff
export function truncateHex (hex: string): string {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2]
    }
  }
  return hex
}

// e.g. turn #fff into #ffffff
export function expandHex (hex: string): string {
  if (hex.length === 3) {
    return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2]
  }
  return hex
}

// export function labEuclideanDistance (rgb1: RgbObject, rgb2: RgbObject): number {
//   return Math.sqrt(Math.pow(rgb1.r - rgb2.r, 2) + Math.pow(rgb1.g - rgb2.g, 2) + Math.pow(rgb1.b - rgb2.b, 2))
// }
//
// export function findClosestColor (rgb: RgbObject, namedColorsRgb: Record<string, RgbObject>): string {
//   let minDistance = Infinity
//   let closestColor = ''
//   // const lab1 = convert to lab
//   for (const color in namedColorsRgb) {
//     // const lab2 = convert namedColorsRgb[color] to lab
//     const distance = labEuclideanDistance(lab1, lab2)
//     if (distance < minDistance) {
//       closestColor = color
//       minDistance = distance
//     }
//   }
//   return closestColor
// }
