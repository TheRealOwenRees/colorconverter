import { type LabObject, type RgbObject } from '../types'
import { rgbToXyz, xyzToLab } from './conversions'

export function convertDecimalToHex (d: number): string {
  return Math.round(d * 255).toString(16)
}

export function calculateBrightness (rgb: RgbObject): number {
  const { r, g, b } = rgb
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error('RGB values must be defined')
  }
  return (r * 299 + g * 587 + b * 114) / 1000
}

// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
export function calculateLuminance (rgb: RgbObject): number {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error('RGB values must be defined')
  }

  let R, G, B
  if (rgb.r <= 0.03928) R = rgb.r / 12.92; else R = Math.pow((rgb.r + 0.055) / 1.055, 2.4)
  if (rgb.g <= 0.03928) G = rgb.g / 12.92; else G = Math.pow((rgb.g + 0.055) / 1.055, 2.4)
  if (rgb.b <= 0.03928) B = rgb.b / 12.92; else B = Math.pow((rgb.b + 0.055) / 1.055, 2.4)
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

export function truncateHex (hex: string): string {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2]
    }
  }
  return hex
}

export function expandHex (hex: string): string {
  if (hex.length === 3) {
    return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2]
  }
  return hex
}

// √((L₀-L₁)²+(a₀-a₁)²+(b₀-b₁)²
export function labDeltaE (lab1: LabObject, lab2: LabObject): number {
  if (lab1.l === undefined || lab1.a === undefined || lab1.b === undefined || lab2.l === undefined || lab2.a === undefined || lab2.b === undefined) {
    throw new Error('Lab values must be defined')
  }
  return Math.sqrt(Math.pow(lab1.l - lab2.l, 2) + Math.pow(lab1.a - lab2.a, 2) + Math.pow(lab1.b - lab1.b, 2))
}

export function findClosestColor (rgb: RgbObject, namedColorsRgb: Record<string, RgbObject>): string {
  let minDistance = Infinity
  let closestColor = ''
  const lab1 = xyzToLab(rgbToXyz(rgb))
  for (const color in namedColorsRgb) {
    const lab2 = xyzToLab(rgbToXyz(namedColorsRgb[color]))
    const distance = labDeltaE(lab1, lab2)
    if (distance < minDistance) {
      closestColor = color
      minDistance = distance
    }
  }
  return closestColor
}

// inverse 3x3 matrix
export function inverseMatrix (matrix: number[][]): number[][] {
  // Calculate the determinant of the matrix
  const det = matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
                matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
                matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])

  // Check if the determinant is non-zero
  if (det === 0) {
    throw new Error('Matrix is not invertible.')
  }

  // Calculate the inverse of the matrix
  const invDet = 1 / det
  return [
    [(matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) * invDet,
      (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) * invDet,
      (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) * invDet],
    [(matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) * invDet,
      (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) * invDet,
      (matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2]) * invDet],
    [(matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) * invDet,
      (matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1]) * invDet,
      (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) * invDet]
  ]
}
