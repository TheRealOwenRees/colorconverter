import ColorConvertor from '../src/colorconvertor'

describe(('to RGB'), () => {
  it('return rgb object when input is rgb string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toRgb()).toMatchObject({ r: 255, g: 255, b: 255, a: undefined })
  })
  it('return rgba object when input is rgba string', () => {
    expect(new ColorConvertor('rgba(255, 255, 255, 0.7)').toRgb()).toMatchObject({ r: 255, g: 255, b: 255, a: 0.7 })
  })
  it('return rgb object when input is hex string', () => {
    expect(new ColorConvertor('#ffffff').toRgb()).toMatchObject({ r: 255, g: 255, b: 255, a: undefined })
  })
  // it('return rgb object when input is hsl string', () => {
  //   expect(new ColorConvertor('hsl(0, 0%, 50%)').toRgb()).toMatchObject({ r: 0.5, g: 0.5, b: 0.5 })
  // })
  //   it('return rgb object when input is hsv string', () => {
  //     expect(new ColorConvertor('hsv(50, 25.5%, 80%)').toRgb()).toMatchObject({ format: 'rgb', value: { r: 204, g: 195, b: 152 } })
  //   })
  //   it('to normalized rgb', () => {
  //     expect(new ColorConvertor('rgb(255, 255, 255)').toNormalizedRgb()).toMatchObject({ r: 1, g: 1, b: 1 })
  //   })
  //   it('to normalized rgba', () => {
  //     expect(new ColorConvertor('rgba(255, 255, 255, 1)').toNormalizedRgba()).toMatchObject({ r: 1, g: 1, b: 1, a: 1 })
  //   })
  it('get percentage rgb', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toPercentageRgb()).toMatchObject({ r: 100, g: 100, b: 100 })
  })
})

describe(('to RGB string'), () => {
  it('return rgb string when input is rgb string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toRgbString()).toBe('rgb(255, 255, 255)')
  })
  it('return rgba string when input is rgba string', () => {
    expect(new ColorConvertor('rgba(255, 255, 255, 0.7)').toRgbString()).toBe('rgba(255, 255, 255, 0.7)')
  })
  it('return rgb string when input is hex string', () => {
    expect(new ColorConvertor('#ffffff').toRgbString()).toBe('rgb(255, 255, 255)')
  })
  //   it('return rgb string when input is hsl string', () => {
  //     expect(new ColorConvertor('hsl(0, 0%, 50%)').toRgbString()).toBe('rgb(128, 128, 128)')
  //   })
  //   it('return rgb string when input is hsv string', () => {
  //     expect(new ColorConvertor('hsv(50, 25.5%, 80%)').toRgbString()).toBe('rgb(204, 195, 152)')
  //   })
  it('get percentage rgb string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toPercentageRgbString()).toBe('rgb(100%, 100%, 100%)')
  })
})
//
describe(('to HSV'), () => {
  it('to HSV', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHsv()).toMatchObject({ h: 0, s: 0, v: 100 })
  })
  it('to HSV string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHsvString()).toBe('hsv(0, 0%, 100%)')
  })
})

describe(('to HSL'), () => {
  it('to HSL', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHsl()).toMatchObject({ h: 0, s: 0, l: 100 })
  })
  it('to HSL string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHslString()).toBe('hsl(0, 0%, 100%)')
  })
})

describe(('to HEX'), () => {
  it('to HEX', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHex()).toBe('ffffff')
  })
  it('to HEX string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHexString()).toBe('#ffffff')
  })
})

describe(('to HEX8'), () => {
  it('to HEX8', () => {
    expect(new ColorConvertor('rgba(255, 255, 255, 0)').toHex8()).toBe('ffffff00')
  })
  it('to HEX8, RGBA alpha missing', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHex8()).toBe('ffffffff')
  })
  it('to HEX8 string', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toHex8String()).toBe('#ffffffff')
  })
})

describe('XYZ, LAB, LCH', () => {
  it('RGB to XYZ', () => {
    expect(new ColorConvertor('rgb(50, 60, 70)').toXyz()).toMatchObject({
      x: expect.closeTo(4.036),
      y: expect.closeTo(4.352),
      z: expect.closeTo(6.420)
    })
  })
  it('RGB to XYZ string', () => {
    expect(new ColorConvertor('rgb(50, 60, 70)').toXyzString()).toBe('xyz(4.036742351643451, 4.352023512348019, 6.421616354823418)')
  })
  it('RGB to LAB', () => {
    expect(new ColorConvertor('rgb(50, 60, 70)').toLab()).toMatchObject({
      l: expect.closeTo(24.802, 1),
      a: expect.closeTo(-1.428, 1),
      b: expect.closeTo(-7.497, 1)
    })
  })
  it('RGB to LAB string', () => {
    expect(new ColorConvertor('rgb(50, 60, 70)').toLabString()).toBe('lab(24.802652838228262, -1.424881508870629, -7.500503791881208)')
  })
  it('RGB to LCH', () => {
    expect(new ColorConvertor('rgb(50, 60, 100)').toLch()).toMatchObject({
      l: expect.closeTo(26.244, 1),
      c: expect.closeTo(26.196, 1),
      h: expect.closeTo(288.014, 1)
    })
  })
  it('RGB to LCH string', () => {
    expect(new ColorConvertor('rgb(50, 60, 100)').toLchString()).toBe('lch(26.244630235083065, 26.202269191846792, 288.02120872573244)')
  })
})

describe('CMYK', () => {
  it('RGB to CMY', () => {
    expect(new ColorConvertor('rgb(100, 24, 99)').toCmy()).toMatchObject({
      c: expect.closeTo(0.60784, 3),
      m: expect.closeTo(0.90588, 3),
      y: expect.closeTo(0.61176, 3)
    })
  })
  it('RGB to CMYK', () => {
    expect(new ColorConvertor('rgb(100, 24, 99)').toCmyk()).toMatchObject({
      c: expect.closeTo(0, 3),
      m: expect.closeTo(0.76, 3),
      y: expect.closeTo(0.01, 3),
      k: expect.closeTo(0.60784, 3)
    })
  })
})

describe(('other methods'), () => {
  it('get brightness', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').getBrightness()).toBe(255)
  })
  it('get luminance', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').getLuminance()).toBe(1)
  })
  it('is dark', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').isDark()).toBe(false)
  })
  it('is light', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').isLight()).toBe(true)
  })
  it('get rgb format', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').getFormat()).toBe('rgb')
  })
  it('get hsl format', () => {
    expect(new ColorConvertor('hsl(0, 100, 50)').getFormat()).toBe('hsl')
  })
  it('get alpha', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').getAlpha()).toBe(1)
  })
  it('set alpha', () => {
    const colorConvertor = new ColorConvertor('rgb(255, 255, 255)')
    colorConvertor.setAlpha(0.5)
    expect(colorConvertor.getAlpha()).toBe(0.5)
  })
  it('get named color', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').toName()).toBe('white')
  })
  it('get undefined named color', () => {
    expect(new ColorConvertor('rgb(255, 255, 254)').toName()).toBe(undefined)
  })
  it('is valid', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').isValid()).toBe(true)
  })
  it('random color', () => {
    const colorConvertor = new ColorConvertor()
    colorConvertor.random()
    expect(colorConvertor.getColorObj()).toMatchObject({ format: 'rgb', value: { r: expect.any(Number), g: expect.any(Number), b: expect.any(Number) } })
  })
  it('compare to colors for equality', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').equals('hsl(0, 0, 100)')).toBe(true)
  })
  it('compare to colors for inequality', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').equals('hsl(60, 100, 99.8)')).toBe(false)
  })
  it('set color', () => {
    const colorConvertor = new ColorConvertor()
    colorConvertor.setColor('rgb(0, 0, 0)')
    expect(colorConvertor.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 0, g: 0, b: 0 } })
  })
  it('overwrite existing color', () => {
    const colorConvertor = new ColorConvertor('rgb(255, 255, 255)')
    colorConvertor.setColor('rgb(0, 0, 0)')
    expect(colorConvertor.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 0, g: 0, b: 0 } })
  })
  it('to nearest named color', () => {
    expect(new ColorConvertor('0000fc').toNearestNamedColor()).toBe('blue')
  })
})
