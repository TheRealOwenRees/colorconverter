import {
  rgbToHex,
  hexToRgb,
  rgbaToHex8,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToCmy, cmyToCmyk, lchToLab, labToXyz, xyzToRgb, xyzToRgbNormalized
} from '../src/utils/conversions'

describe('color conversions', () => {
  it('rgb -> hsl', () => {
    expect(rgbToHsl({ r: 55, g: 32, b: 123 })).toStrictEqual({ h: 255, s: 58.70967741935483, l: 30.3921568627451 })
  })
  it('hsl -> rgb', () => {
    expect(hslToRgb({ h: 255, s: 58.7, l: 30.3 })).toStrictEqual({ r: 55, g: 32, b: 123 })
  })
  it('rgb -> hsv', () => {
    expect(rgbToHsv({ r: 55, g: 32, b: 123 })).toStrictEqual({ h: 255, s: 73.98373983739837, v: 48.23529411764706 })
  })
  it('hsv -> rgb', () => {
    expect(hsvToRgb({ h: 255, s: 74.0, v: 48.2 })).toStrictEqual({ r: 55, g: 32, b: 123 })
  })
  it('rgb -> hex', () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('ffffff')
  })
  it('rgba -> hex8', () => {
    expect(rgbaToHex8({ r: 67, g: 255, b: 100, a: 0.8 })).toBe('43ff64cc')
  })
  it('hex -> rgb', () => {
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255 })
  })
  it('3 digit hex -> rgb', () => {
    expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255 })
  })
  it('RGB -> CMY', () => {
    expect(rgbToCmy({ r: 100, g: 24, b: 99 })).toMatchObject({
      c: expect.closeTo(0.60784, 3),
      m: expect.closeTo(0.90588, 3),
      y: expect.closeTo(0.61176, 3)
    })
  })
  it('CMY -> CMYK', () => {
    expect(cmyToCmyk({ c: 0.60784, m: 0.90588, y: 0.61176 })).toMatchObject({
      c: expect.closeTo(0, 3),
      m: expect.closeTo(0.76, 3),
      y: expect.closeTo(0.01, 3),
      k: expect.closeTo(0.60784, 3)
    })
  })
  it('LCH -> LAB', () => {
    expect(lchToLab({ l: 54.5, c: 49, h: 96 })).toMatchObject({
      l: expect.closeTo(54.5, 2),
      a: expect.closeTo(-5.122, 2),
      b: expect.closeTo(48.732, 2)
    })
  })
  it('LAB -> XYZ', () => {
    expect(labToXyz({ l: 54.5, a: -5.122, b: 48.732 })).toMatchObject({
      x: expect.closeTo(20.276, 1),
      y: expect.closeTo(22.449, 1),
      z: expect.closeTo(5.2356, 1)
    })
  })
  it('XYZ -> RGB', () => {
    expect(xyzToRgb({ x: 20.276, y: 22.449, z: 5.2356 })).toMatchObject({
      r: 146,
      g: 131,
      b: 40
    })
  })
  it('XYZ -> RGB%', () => {
    expect(xyzToRgbNormalized({ x: 20.276, y: 22.449, z: 5.2356 })).toMatchObject({
      r: expect.closeTo(0.57102, 2),
      g: expect.closeTo(0.51355, 2),
      b: expect.closeTo(0.15614, 2)
    })
  })
})
