/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import { type ColorConvertorInstance, type RgbObject } from './types'
import { inputParser } from './utils/inputParser'
import { rgbaToHexA, rgbToHex, rgbToHsl, rgbToHsv, toRgbBase } from './utils/conversions'
import { calculateBrightness, calculateLuminance, truncateHex } from './utils/utilities'
import namedColors from './utils/namedColors'

function ColorConvertor (this: ColorConvertorInstance, colorInput: string): void {
  this._colorInput = colorInput // string input of any color format
  this._colorObj = inputParser(this._colorInput) // Color info object. E.g. { format: 'hex', value: '#ffffff' }
  this._rgbObj = toRgbBase(this._colorObj) // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
}

// General Methods
ColorConvertor.prototype = {
  getInput () {
    // TODO allow instance to be created with no input
    return this._colorObj
  },
  isValid () {
    return this._colorObj.value !== undefined
  },
  toRgb (this: ColorConvertorInstance) {
    return toRgbBase(this.getInput())
  },
  toRgbString () {
    const { format, value: { r, g, b, a } } = this._rgbObj
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`
  },
  toHsv () {
    return rgbToHsv(this._rgbObj.value as RgbObject)
  },
  toHsvString () {
    const { h, s, v } = rgbToHsv(this._rgbObj.value as RgbObject)
    return `hsv(${h}, ${s}%, ${v}%)`
  },
  toHsl () {
    return rgbToHsl(this._rgbObj.value as RgbObject)
  },
  toHslString () {
    const { h, s, l } = rgbToHsl(this._rgbObj.value as RgbObject)
    return `hsl(${h}, ${s}%, ${l}%)`
  },
  toHex () {
    return rgbToHex(this._rgbObj.value as RgbObject)
  },
  toHexString () {
    return `#${this.toHex()}`
  },
  toHexA () {
    const { r, g, b } = this._rgbObj.value
    const a = this.getAlpha()
    return rgbaToHexA({ r, g, b, a })
  },
  toHexAString () {
    return `#${this.toHexA()}`
  },
  getBrightness () {
    return calculateBrightness(this._rgbObj.value as RgbObject)
  },
  getLuminance () {
    return calculateLuminance(this._rgbObj.value as RgbObject)
  },
  isDark () {
    return this.getBrightness() < 128
  },
  isLight () {
    return this.getBrightness() >= 128
  },
  getFormat () {
    return this._rgbObj.format
  },
  getAlpha () {
    let { a } = this._rgbObj.value
    a = a === undefined ? 1 : a // 100% alpha if working with rgb values
    return a
  },
  setAlpha (newAlpha: number) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
    const { r, g, b } = this._rgbObj.value
    const a = newAlpha
    this._rgbObj.value = { r, g, b, a }
    return this._rgbObj
  },
  toNormalizedRgb () {
    const { r, g, b } = this._rgbObj.value
    return { r: r / 255, g: g / 255, b: b / 255 }
  },
  toNormalizedRgba () {
    const { r, g, b } = this._rgbObj.value
    const a = this.getAlpha()
    return { r: r / 255, g: g / 255, b: b / 255, a }
  },
  toName (this: ColorConvertorInstance) {
    const hex = truncateHex(this.toHex())
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color
      }
    }
    return undefined
  },
  // toNearestNamedColor () {
  //   return 'not implemented'
  // },
  // toNearestWebSafeColor () {
  //   return 'not implemented'
  // },
  toPercentageRgb () {
    const { r, g, b } = this._rgbObj.value
    return { r: r / 255 * 100, g: g / 255 * 100, b: b / 255 * 100 }
  },
  toPercentageRgbString () {
    const { r, g, b } = this.toPercentageRgb()
    return `rgb(${r}%, ${g}%, ${b}%)`
  },
  // equals () { // TODO accept 2nd color as input and see if they are the same
  //   return 'not implemented'
  // },
  random () {
    this._rgbObj = {
      format: 'rgb',
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    }
    return this._rgbObj
  }
}

// Readability Methods

// Combination Methods

// Utility Methods

export default ColorConvertor
