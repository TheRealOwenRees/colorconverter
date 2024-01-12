/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

import {
  type CmykObject,
  type ColorObjType,
  type HslObject, type HsvObject, type LabObject, type LchObject,
  type RgbObject, type XyzObject
} from './types'
import { inputParser } from './utils/inputParser'
import {
  rgbNormalizedToRgb,
  rgbNormalizedToHsl,
  toRgbBase,
  rgbNormalizedToCmy,
  cmyToCmyk,
  rgbNormalizedToHsv,
  rgbToXyz,
  xyzToLab,
  labToLch,
  rgbToHex,
  rgbaToHex8
} from './utils/conversions'
import { calculateBrightness, calculateLuminance, findClosestColor, truncateHex } from './utils/utilities'
import namedColors, { namedColorsRgb } from './utils/namedColors'

class ColorConvertor {
  private _colorInput: string | undefined
  private _colorObj: ColorObjType
  private _rgbObj: RgbObject

  constructor (colorInput?: string) {
    this._colorInput = colorInput ?? undefined // string input of any color format
    this._colorObj = inputParser(this._colorInput) // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = toRgbBase(this._colorObj) // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
  }

  getInput (): string {
    return this._colorInput ?? ''
  }

  getColorObj (): ColorObjType {
    return this._colorObj
  }

  getRgbObj (): RgbObject {
    return this._rgbObj
  }

  setInput (colorInput: string): void {
    this._colorInput = colorInput
  }

  setColorObj (colorObj: ColorObjType): void {
    this._colorObj = colorObj
  }

  setRbgObj (rgbObj: RgbObject): void {
    this._rgbObj = rgbObj
  }

  /**
   * Returns the RGB values in the range 0-255
   * @returns {RgbObject} - RGB values in the range 0-255
   * @memberof ColorConvertor
   */
  toRgb (): RgbObject {
    return rgbNormalizedToRgb(this.getRgbObj())
  }

  /**
   * @returns {string} - RGB values in the range 0-255 as a string
   * @memberof ColorConvertor
   * @remarks "rgb(255, 255, 255)"
   */
  toRgbString (): string {
    const { r, g, b, a } = this.toRgb()
    return `${a !== undefined ? 'rgba' : 'rgb'}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`
  }

  /**
   * Checks if the parsed color is valid
   * @returns {boolean} - true if the parsed color is valid
   * @memberof ColorConvertor
   */
  isValid (): boolean {
    return this.getColorObj().value !== undefined
  }

  setColor (color: string): void {
    this.setInput(color)
    this.setColorObj(inputParser(this.getInput()))
    this.setRbgObj(toRgbBase(this.getColorObj()))
  }

  // TODO implement
  fromRatio (): string {
    return 'not implemented'
  }

  // TODO implement
  fromPercentageRgb (): string {
    return 'not implemented'
  }

  toHsv (): HsvObject {
    return rgbNormalizedToHsv(this.getRgbObj())
  }

  toHsvString (): string {
    const { h, s, v } = this.toHsv()
    return `hsv(${h}, ${s}%, ${v}%)`
  }

  toHsl (): HslObject {
    return rgbNormalizedToHsl(this.getRgbObj())
  }

  toHslString (): string {
    const { h, s, l } = rgbNormalizedToHsl(this.getRgbObj())
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  toHex (): string {
    return rgbToHex(rgbNormalizedToRgb(this.getRgbObj())) ?? ''
  }

  toHexString (): string {
    return `#${this.toHex()}`
  }

  toHex8 (): string {
    const { r, g, b } = rgbNormalizedToRgb(this.getRgbObj())
    const a = this.getAlpha()
    return rgbaToHex8({ r, g, b, a })
  }

  toHex8String (): string {
    return `#${this.toHex8()}`
  }

  toCmy (): CmykObject {
    return rgbNormalizedToCmy(this.getRgbObj())
  }

  toCmyk (): CmykObject {
    return cmyToCmyk(this.toCmy())
  }

  /*
    XYZ, CIE-L*ab, CIE-L*Ch(ab)
    formulae from https://www.easyrgb.com/en/math.php

    X, Y and Z output refers to a D65/2° standard illuminant.
    */

  toXyz (): XyzObject {
    return rgbToXyz(this.getRgbObj())
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
    return calculateBrightness(rgbNormalizedToRgb(this.getRgbObj()))
  }

  getLuminance (): number {
    return calculateLuminance(this.getRgbObj())
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
    let { a } = this.getRgbObj()
    a = a ?? 1 // 100% alpha if working with rgb values
    return a
  }

  setAlpha (newAlpha: number): void {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1')
    }
    const { r, g, b } = this.getRgbObj()
    const a = newAlpha
    this.setRbgObj({ r, g, b, a })
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
    const rgb = rgbNormalizedToRgb(this.getRgbObj())
    return findClosestColor(rgb, namedColorsRgb)
  }

  toPercentageRgb (): RgbObject {
    const { r, g, b } = this.getRgbObj()
    return {
      r: r !== undefined ? r * 100 : undefined,
      g: g !== undefined ? g * 100 : undefined,
      b: b !== undefined ? b * 100 : undefined
    }
  }

  toPercentageRgbString (): string {
    const { r, g, b } = this.toPercentageRgb()
    return `rgb(${r}%, ${g}%, ${b}%)`
  }

  equals (color2: string): boolean {
    return this.toRgbString() === new ColorConvertor(color2).toRgbString()
  }

  /**
     * Returns a random color in sRGB color space
     * @returns {void}
     * @memberof ColorConvertor
     * @remarks Will overwrite the current color
     */
  random (): void {
    this.setColorObj({
      format: 'rgb',
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    })
    this.setRbgObj(toRgbBase(this.getColorObj()))
  }

  clone (): ColorConvertor {
    return new ColorConvertor(this.getInput())
  }

  /**
   * Returns the contrast ratio between the current color and the color passed as an argument
   * @param color2 - The color to compare the current color to
   * @returns {number} - The contrast ratio between the current color and the color passed as an argument
   * @memberof ColorConvertor
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   */
  readability (color2: string): number {
    const l1: number = this.getLuminance()
    const l2: number = new ColorConvertor(color2).getLuminance()
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }
}

export default ColorConvertor
