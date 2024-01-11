/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import {
  type CmykObject,
  type ColorObjType,
  type HslObject,
  type HsvObject, type LabObject, type LchObject,
  type RgbObject, type XyzObject
} from './types'
import { inputParser } from './utils/inputParser'
import {
  cmyToCmyk,
  labToLch,
  rgbaToHex8,
  rgbToCmy,
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToXyz,
  toRgbBase,
  xyzToLab
} from './utils/conversions'
import { calculateBrightness, calculateLuminance, findClosestColor, truncateHex } from './utils/utilities'
import namedColors, { namedColorsRgb } from './utils/namedColors'

class ColorConvertor {
  private _colorInput: string | undefined
  private _colorObj: ColorObjType
  private _rgbObj: ColorObjType

  constructor (colorInput?: string) {
    this._colorInput = colorInput ?? undefined // string input of any color format
    this._colorObj = inputParser(this._colorInput) // Color info object. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = toRgbBase(this._colorObj) // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
  }

  /*
    General Methods
  */
  getInput (): string {
    return this._colorInput ?? ''
  }

  getColorObj (): ColorObjType {
    return this._colorObj
  }

  getRgbObj (): ColorObjType {
    return this._rgbObj
  }

  isValid (): boolean {
    return this.getColorObj().value !== undefined
  }

  setColor (color: string): void {
    this._colorInput = color
    this._colorObj = inputParser(this.getInput())
    this._rgbObj = toRgbBase(this.getColorObj())
  }

  // fromRatio () {
  //   return 'not implemented'
  // },

  toRgb (): ColorObjType {
    return toRgbBase(this.getColorObj())
  }

  toRgbString (): string {
    const { format, value } = this.getRgbObj()
    const { r, g, b, a } = value as RgbObject
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`
  }

  toHsv (): HsvObject {
    return rgbToHsv(this.getRgbObj().value as RgbObject)
  }

  toHsvString (): string {
    const { h, s, v } = rgbToHsv(this.getRgbObj().value as RgbObject)
    return `hsv(${h}, ${s}%, ${v}%)`
  }

  toHsl (): HslObject {
    return rgbToHsl(this.getRgbObj().value as RgbObject)
  }

  toHslString (): string {
    const { h, s, l } = rgbToHsl(this.getRgbObj().value as RgbObject)
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  toHex (): string {
    return rgbToHex(this.getRgbObj().value as RgbObject)
  }

  toHexString (): string {
    return `#${this.toHex()}`
  }

  toHex8 (): string {
    const { r, g, b } = this.getRgbObj().value as RgbObject
    const a = this.getAlpha()
    return rgbaToHex8({ r, g, b, a })
  }

  toHex8String (): string {
    return `#${this.toHex8()}`
  }

  toCmy (): CmykObject {
    return rgbToCmy(this.getRgbObj().value as RgbObject)
  }

  toCmyk (): CmykObject {
    return cmyToCmyk(this.toCmy())
  }

  /*
    XYZ, CIE-L*ab, CIE-L*Ch(ab)
    formulae from https://www.easyrgb.com/en/math.php
  */

  // X, Y and Z output refers to a D65/2° standard illuminant.
  toXyz (): XyzObject {
    return rgbToXyz(this.toNormalizedRgb())
  }

  toXyzString (): string {
    const { x, y, z } = this.toXyz()
    return `xyz(${x}, ${y}, ${z})`
  }

  // CIE-L*ab
  toLab (): LabObject {
    return xyzToLab(this.toXyz())
  }

  toLabString (): string {
    const { l, a, b } = this.toLab()
    return `lab(${l}, ${a}, ${b})`
  }

  toLch (): LchObject {
    return labToLch(this.toLab())
  }

  toLchString (): string {
    const { l, c, h } = this.toLch()
    return `lch(${l}, ${c}, ${h})`
  }

  getBrightness (): number {
    return calculateBrightness(this.getRgbObj().value as RgbObject)
  }

  getLuminance (): number {
    return calculateLuminance(this.getRgbObj().value as RgbObject)
  }

  isDark (): boolean {
    return this.getBrightness() < 128
  }

  isLight (): boolean {
    return this.getBrightness() >= 128
  }

  getFormat (): string | undefined {
    return this.getColorObj().format
  }

  getAlpha (): number | undefined {
    let { a } = this.getRgbObj().value as RgbObject
    a = a ?? 1 // 100% alpha if working with rgb values
    return a
  }

  setAlpha (newAlpha: number): void {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
    const { r, g, b } = this.getRgbObj().value as RgbObject
    const a = newAlpha
    this.getRgbObj().value = { r, g, b, a }
  }

  toNormalizedRgb (): RgbObject {
    const { r, g, b } = this.getRgbObj().value as RgbObject
    return { r: r / 255, g: g / 255, b: b / 255 }
  }

  toNormalizedRgba (): RgbObject {
    const { r, g, b } = this.getRgbObj().value as RgbObject
    const a = this.getAlpha()
    return { r: r / 255, g: g / 255, b: b / 255, a }
  }

  toName (): string | undefined {
    const hex = truncateHex(this.toHex())
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color
      }
    }
    return undefined
  }

  toNearestNamedColor (): string {
    const rgb = this.getRgbObj().value as RgbObject
    return findClosestColor(rgb, namedColorsRgb)
  }

  toPercentageRgb (): RgbObject {
    const { r, g, b } = this.getRgbObj().value as RgbObject
    return { r: r / 255 * 100, g: g / 255 * 100, b: b / 255 * 100 }
  }

  toPercentageRgbString (): string {
    const { r, g, b } = this.toPercentageRgb()
    return `rgb(${r}%, ${g}%, ${b}%)`
  }

  equals (color2: string): boolean {
    const { r, g, b } = this.getRgbObj().value as RgbObject
    const color2RgbObj = toRgbBase(inputParser(color2)).value as RgbObject
    return color2RgbObj.r === r && color2RgbObj.g === g && color2RgbObj.b === b
  }

  random (): ColorObjType {
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

  clone (): ColorConvertor {
    return new ColorConvertor(this.getInput())
  }

  /*
    Readability Methods
      <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
  */

  // Analyze the 2 colors and returns the color contrast defined by WCAG Version 2
  readability (color2: string): number {
    const l1: number = this.getLuminance()
    const l2: number = new ColorConvertor(color2).getLuminance()
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  // isReadable (color2: string) {
  //   const readability = this.readability(color2)
  //   console.log(readability)
  // }

  // Combination Methods

  // Utility Methods
}

export default ColorConvertor
