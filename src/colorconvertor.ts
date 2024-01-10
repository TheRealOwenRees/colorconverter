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

ColorConvertor.prototype = {
  getInput: function getInput () {
    return this._colorObj
  },
  toRgb: function toRgb (this: ColorConvertorInstance) {
    return toRgbBase(this.getInput())
  },
  toRgbString: function toRgbString () {
    const { format, value: { r, g, b, a } } = this._rgbObj
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`
  },
  toHsv: function toHsv () {
    return rgbToHsv(this._rgbObj.value as RgbObject)
  },
  toHsvString: function toHsvString () {
    const { h, s, v } = rgbToHsv(this._rgbObj.value as RgbObject)
    return `hsv(${h}, ${s}%, ${v}%)`
  },
  toHsl: function toHsl () {
    return rgbToHsl(this._rgbObj.value as RgbObject)
  },
  toHslString: function toHslString () {
    const { h, s, l } = rgbToHsl(this._rgbObj.value as RgbObject)
    return `hsl(${h}, ${s}%, ${l}%)`
  },
  toHex: function toHex () {
    return rgbToHex(this._rgbObj.value as RgbObject)
  },
  toHexString: function toHexString () {
    return `#${this.toHex()}`
  },
  toHexA: function toHexA () {
    const { r, g, b } = this._rgbObj.value
    const a = this.getAlpha()
    return rgbaToHexA({ r, g, b, a })
  },
  toHexAString: function toHexAString () {
    return `#${this.toHexA()}`
  },
  getBrightness: function getBrightness () {
    return calculateBrightness(this._rgbObj.value as RgbObject)
  },
  getLuminance: function getLuminance () {
    return calculateLuminance(this._rgbObj.value as RgbObject)
  },
  isDark: function isDark () {
    return this.getBrightness() < 128
  },
  isLight: function isLight () {
    return this.getBrightness() >= 128
  },
  getFormat: function getFormat () {
    return this._rgbObj.format
  },
  // TODO get and set alpha for HSLA and HEXA too
  getAlpha: function getAlpha () {
    let { a } = this._rgbObj.value
    a = a === undefined ? 1 : a // 100% alpha if working with rgb values
    return a
  },
  setAlpha: function setAlpha (newAlpha: number) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
    const { r, g, b } = this._rgbObj.value
    const a = newAlpha
    this._rgbObj.value = { r, g, b, a }
    return this._rgbObj
  },
  toNormalizedRgb: function toNormalizedRgb () {
    const { r, g, b } = this._rgbObj.value
    return { r: r / 255, g: g / 255, b: b / 255 }
  },
  toNormalizedRgba: function toNormalizedRgba () {
    const { r, g, b } = this._rgbObj.value
    const a = this.getAlpha()
    return { r: r / 255, g: g / 255, b: b / 255, a }
  },
  toName: function toName (this: ColorConvertorInstance) {
    const hex = truncateHex(this.toHex())
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color
      }
    }
    return undefined
  }
  // getNearestWebSafeColor: function toNearestWebSafe () {
  //   return false
  // },
  // isValid: function isValid () {
  //   return false
  // }
  // toPercentageRgb: function toPercentageRgb () {
  //
  // }
  // toPercentageRgbString: function toPercentageRgbString () {
  // }

}

export default ColorConvertor
