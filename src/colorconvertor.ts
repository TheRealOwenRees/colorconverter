/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import { type ColorConvertorInstance, type RgbObject, type XyzObject } from './types'
import { inputParser } from './utils/inputParser'
import { labToLch, rgbaToHex8, rgbToHex, rgbToHsl, rgbToHsv, rgbToXyz, toRgbBase, xyzToLab } from './utils/conversions'
import { calculateBrightness, calculateLuminance, truncateHex } from './utils/utilities'
import namedColors from './utils/namedColors'

function ColorConvertor (this: ColorConvertorInstance, colorInput: string): void {
  this._colorInput = colorInput // string input of any color format
  this._colorObj = inputParser(this._colorInput) // Color info object. E.g. { format: 'hex', value: '#ffffff' }
  this._rgbObj = toRgbBase(this._colorObj) // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
}

ColorConvertor.prototype = {
  /*
    General Methods
  */
  getInput () {
    return this._colorInput
  },
  getColorObj () {
    return this._colorObj
  },
  getRgbObj () {
    return this._rgbObj
  },
  isValid () {
    return this.getColorObj().value !== undefined
  },
  setColor (this: ColorConvertorInstance, color: string) {
    this._colorInput = color
    this._colorObj = inputParser(this.getInput())
    this._rgbObj = toRgbBase(this.getColorObj())
  },
  // fromRatio () {
  //   return 'not implemented'
  // },
  toRgb (this: ColorConvertorInstance) {
    return toRgbBase(this.getColorObj())
  },
  toRgbString () {
    const { format, value: { r, g, b, a } } = this.getRgbObj()
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`
  },
  toHsv () {
    return rgbToHsv(this.getRgbObj().value as RgbObject)
  },
  toHsvString () {
    const { h, s, v } = rgbToHsv(this.getRgbObj().value as RgbObject)
    return `hsv(${h}, ${s}%, ${v}%)`
  },
  toHsl () {
    return rgbToHsl(this.getRgbObj().value as RgbObject)
  },
  toHslString () {
    const { h, s, l } = rgbToHsl(this.getRgbObj().value as RgbObject)
    return `hsl(${h}, ${s}%, ${l}%)`
  },
  toHex () {
    return rgbToHex(this.getRgbObj().value as RgbObject)
  },
  toHexString () {
    return `#${this.toHex()}`
  },
  toHex8 () {
    const { r, g, b } = this.getRgbObj().value
    const a = this.getAlpha()
    return rgbaToHex8({ r, g, b, a })
  },
  toHex8String () {
    return `#${this.toHex8()}`
  },
  // XYZ, CIE-L*ab, CIE-L*Ch(ab) from https://www.easyrgb.com/en/math.php
  // X, Y and Z output refer to a D65/2° standard illuminant.
  toXyz (this: ColorConvertorInstance) {
    return rgbToXyz(this.toNormalizedRgb())
  },
  toXyzString () {
    const { x, y, z } = this.toXyz()
    return `xyz(${x}, ${y}, ${z})`
  },
  // CIE-L*ab
  toLab (this: ColorConvertorInstance) {
    return xyzToLab(this.toXyz())
  },
  toLabString () {
    const { l, a, b } = this.toLab()
    return `lab(${l}, ${a}, ${b})`
  },
  toLch (this: ColorConvertorInstance) {
    return labToLch(this.toLab())
  },
  toLchString () {
    const { l, c, h } = this.toLch()
    return `lch(${l}, ${c}, ${h})`
  },
  getBrightness () {
    return calculateBrightness(this.getRgbObj().value as RgbObject)
  },
  getLuminance () {
    return calculateLuminance(this.getRgbObj().value as RgbObject)
  },
  isDark () {
    return this.getBrightness() < 128
  },
  isLight () {
    return this.getBrightness() >= 128
  },
  getFormat () {
    return this.getColorObj().format
  },
  getAlpha () {
    let { a } = this.getRgbObj().value
    a = a === undefined ? 1 : a // 100% alpha if working with rgb values
    return a
  },
  setAlpha (newAlpha: number) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
    const { r, g, b } = this.getRgbObj().value
    const a = newAlpha
    this.getRgbObj().value = { r, g, b, a }
    return this.getRgbObj()
  },
  toNormalizedRgb () {
    const { r, g, b } = this.getRgbObj().value
    return { r: r / 255, g: g / 255, b: b / 255 }
  },
  toNormalizedRgba () {
    const { r, g, b } = this.getRgbObj().value
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
  // toNearestNamedColor (this: ColorConvertorInstance) { // TODO needs to use LAB
  //   const rgb1 = this.getRgbObj().value as RgbObject
  //   console.log(findClosestColor(rgb1, namedColorsRgb))
  // },
  // toNearestWebSafeColor () {
  //   return 'not implemented'
  // },
  toPercentageRgb () {
    const { r, g, b } = this.getRgbObj().value
    return { r: r / 255 * 100, g: g / 255 * 100, b: b / 255 * 100 }
  },
  toPercentageRgbString () {
    const { r, g, b } = this.toPercentageRgb()
    return `rgb(${r}%, ${g}%, ${b}%)`
  },
  equals (color2: string) {
    const { r, g, b } = toRgbBase(inputParser(color2)).value as RgbObject
    return this.getColorObj().value.r === r &&
       this.getColorObj().value.g === g &&
       this.getColorObj().value.b === b
  },
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
  },
  clone (this: ColorConvertorInstance) {
    // @ts-expect-error
    return new ColorConvertor(this.getInput())
  },
  /*
    Readability Methods
    <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
   */

  // Analyze the 2 colors and returns the color contrast defined by WCAG Version 2
  readability (color2: string) {
    const l1: number = this.getLuminance()
    // @ts-expect-error
    const l2: number = new ColorConvertor(color2).getLuminance()
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }
  // isReadable (color2: string) {
  //   const readability = this.readability(color2)
  //   console.log(readability)
  // }
}

// Combination Methods

// Utility Methods

export default ColorConvertor
