import {
  rgbToHex,
  hexToRgb,
  rgbaToHex8,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmy, cmyToCmyk
} from '../src/utils/conversions'

describe('color conversions', () => {
  it('should convert rgb to hsl', () => {
    expect(rgbToHsl({ r: 55, g: 32, b: 123 })).toStrictEqual({ h: 255, s: 58.70967741935483, l: 30.3921568627451 })
  })
  it('should convert hsl to rgb', () => {
    expect(hslToRgb({ h: 255, s: 58.7, l: 30.3 })).toStrictEqual({ r: 55, g: 32, b: 123 })
  })
  it('should convert rgb to hsv', () => {
    expect(rgbToHsv({ r: 55, g: 32, b: 123 })).toStrictEqual({ h: 255, s: 73.98373983739837, v: 48.23529411764706 })
  })
  it('should convert hsv to rgb', () => {
    expect(hsvToRgb({ h: 255, s: 74.0, v: 48.2 })).toStrictEqual({ r: 55, g: 32, b: 123 })
  })
  it('should convert rgb to hex', () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('ffffff')
  })
  it('should convert rgba to argb hex', () => {
    expect(rgbaToHex8({ r: 67, g: 255, b: 100, a: 0.8 })).toBe('43ff64cc')
  })
  it('should convert hex to rgb', () => {
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })
  it('should convert 3 digit hex to rgb', () => {
    expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 })
  })
  it('should convert RGB to CMY', () => {
    expect(rgbToCmy({ r: 100, g: 24, b: 99 })).toMatchObject({
      c: expect.closeTo(0.60784, 3),
      m: expect.closeTo(0.90588, 3),
      y: expect.closeTo(0.61176, 3)
    })
  })
  it('should convert CMY to CMYK', () => {
    expect(cmyToCmyk({ c: 0.60784, m: 0.90588, y: 0.61176 })).toMatchObject({
      c: expect.closeTo(0, 3),
      m: expect.closeTo(0.76, 3),
      y: expect.closeTo(0.01, 3),
      k: expect.closeTo(0.60784, 3)
    })
  })
})
