/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import { type ColorConvertorInstance, type ColorType } from './types'
import { inputParser } from './utils/inputParser'
import { rgbaToHexA, rgbToHex, rgbToHsl, rgbToHsv, toRgbBase } from './utils/conversions'
import { calculateBrightness, calculateLuminance } from './utils/utilityMethods'

// eslint-disable-next-line @typescript-eslint/naming-convention
function ColorConvertor (this: ColorConvertorInstance, color: ColorType) {
  // If input is already a ColorConvertor instance, return itself
  if (color instanceof ColorConvertor) {
    return color
  }

  this._color = color
  this._input = inputParser(this._color) // Color info object. E.g. { format: 'hex', value: '#ffffff' }
  this._rgb = toRgbBase(this._input)
}

ColorConvertor.prototype = {
  toRgb: function toRgb () {
    return toRgbBase(this.getInput())
  },
  toRgbString: function toRgbString () {
    const { format, value: { r, g, b, a } } = this._rgb
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`
  },
  toHsv: function toHsv () {
    return rgbToHsv(this._rgb.value)
  },
  toHsvString: function toHsvString () {
    const { h, s, v } = rgbToHsv(this._rgb.value)
    return `hsv(${h}, ${s}%, ${v}%)`
  },
  toHsl: function toHsl () {
    return rgbToHsl(this._rgb.value)
  },
  toHslString: function toHslString () {
    const { h, s, l } = rgbToHsl(this._rgb.value)
    return `hsl(${h}, ${s}%, ${l}%)`
  },
  toHex: function toHex () {
    return rgbToHex(this._rgb.value)
  },
  toHexString: function toHexString () {
    return `#${this.toHex()}`
  },
  toHexA: function toHexA () {
    const { r, g, b } = this._rgb.value
    const a = this.getAlpha()
    return rgbaToHexA({ r, g, b, a })
  },
  toHexAString: function toHexAString () {
    return `#${this.toHexA()}`
  },
  getInput: function getInput () { // TODO is this even used apart from in tests?
    return this._input
  },
  getBrightness: function getBrightness () {
    return calculateBrightness(this._rgb.value)
  },
  getLuminance: function getLuminance () {
    return calculateLuminance(this._rgb.value)
  },
  isDark: function isDark () {
    return this.getBrightness() < 128
  },
  isLight: function isLight () {
    return this.getBrightness() >= 128
  },
  getFormat: function getFormat () {
    return this._rgb.format
  },
  getAlpha: function getAlpha () {
    let { a } = this._rgb.value
    a = a === undefined ? 1 : a // 100% alpha if working with rgb values
    return a
  },
  setAlpha: function setAlpha (newAlpha: number) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
    const { r, g, b } = this._rgb.value
    const a = newAlpha
    this._rgb.value = { r, g, b, a }
    return this._rgb
  }
  // getName: function toName () {
  //   const hex = this.toHex()
  //
  //   return false
  // },
  // getNearestWebSafeColor: function toNearestWebSafe () {
  //   return false
  // },
  // setNearestWebSafeColor: function toNearestWebSafe () {
  //   return false
  // }
  // isValid: function isValid () {
  //   return false
  // }
}

export default ColorConvertor
