import ColorConvertor from '../src/colorconvertor'

describe('color convertor instance', () => {
  it('should return a color convertor instance', () => {
    // @ts-expect-error
    expect(new ColorConvertor('#ffffff')).toBeInstanceOf(ColorConvertor)
  })
  describe(('to base RGB'), () => {
    it('return rgb object when input is rgb string', () => {
    // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toRgb()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } })
    })
    it('return rgba object when input is rgba string', () => {
    // @ts-expect-error
      expect(new ColorConvertor('rgba(255, 255, 255, 0.7)').toRgb()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } })
    })
    it('return rgb object when input is hex string', () => {
    // @ts-expect-error
      expect(new ColorConvertor('#ffffff').toRgb()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } })
    })
    it('return rgb object when input is hsl string', () => {
    // @ts-expect-error
      expect(new ColorConvertor('hsl(0, 0%, 50%)').toRgb()).toMatchObject({ format: 'rgb', value: { r: 128, g: 128, b: 128 } })
    })
    it('return rgb object when input is hsv string', () => {
    // @ts-expect-error
      expect(new ColorConvertor('hsv(50, 25.5%, 80%)').toRgb()).toMatchObject({ format: 'rgb', value: { r: 204, g: 195, b: 152 } })
    })
  })
  describe(('to RGB string'), () => {
    it('return rgb string when input is rgb string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toRgbString()).toBe('rgb(255, 255, 255)')
    })
    it('return rgba string when input is rgba string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgba(255, 255, 255, 0.7)').toRgbString()).toBe('rgba(255, 255, 255, 0.7)')
    })
    it('return rgb string when input is hex string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('#ffffff').toRgbString()).toBe('rgb(255, 255, 255)')
    })
    it('return rgb string when input is hsl string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('hsl(0, 0%, 50%)').toRgbString()).toBe('rgb(128, 128, 128)')
    })
    it('return rgb string when input is hsv string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('hsv(50, 25.5%, 80%)').toRgbString()).toBe('rgb(204, 195, 152)')
    })
  })
  describe(('to HSV'), () => {
    it('to HSV', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHsv()).toMatchObject({ h: 0, s: 0, v: 100 })
    })
    it('to HSV string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHsvString()).toBe('hsv(0, 0%, 100%)')
    })
  })
  describe(('to HSL'), () => {
    it('to HSL', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHsl()).toMatchObject({ h: 0, s: 0, l: 100 })
    })
    it('to HSL string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHslString()).toBe('hsl(0, 0%, 100%)')
    })
  })
  describe(('to HEX'), () => {
    it('to HEX', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHex()).toBe('ffffff')
    })
    it('to HEX string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHexString()).toBe('#ffffff')
    })
  })
  describe(('to HEXA'), () => {
    it('to HEXA', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgba(255, 255, 255, 0)').toHexA()).toBe('ffffff00')
    })
    it('to HEXA, RGBA alpha missing', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHexA()).toBe('ffffffff')
    })
    it('to HEXA string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toHexAString()).toBe('#ffffffff')
    })
  })
  describe(('other methods'), () => {
    it('get brightness', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').getBrightness()).toBe(255)
    })
    it('get luminance', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').getLuminance()).toBe(1)
    })
    it('is dark', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').isDark()).toBe(false)
    })
    it('is light', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').isLight()).toBe(true)
    })
    it('get format', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').getFormat()).toBe('rgb')
    })
    it('get alpha', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').getAlpha()).toBe(1)
    })
    it('set alpha', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').setAlpha(0.5)).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255, a: 0.5 } })
    })
    it('to normalized rgb', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toNormalizedRgb()).toMatchObject({ r: 1, g: 1, b: 1 })
    })
    it('to normalized rgba', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgba(255, 255, 255, 1)').toNormalizedRgba()).toMatchObject({ r: 1, g: 1, b: 1, a: 1 })
    })
    it('get named color', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toName()).toBe('white')
    })
    it('get undefined named color', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 254)').toName()).toBe(undefined)
    })
    it('get percentage rgb', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toPercentageRgb()).toMatchObject({ r: 100, g: 100, b: 100 })
    })
    it('get percentage rgb string', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').toPercentageRgbString()).toBe('rgb(100%, 100%, 100%)')
    })
    it('is valid', () => {
      // @ts-expect-error
      expect(new ColorConvertor('rgb(255, 255, 255)').isValid()).toBe(true)
    })
    it('random color', () => {
      // @ts-expect-error
      expect(new ColorConvertor().random()).toMatchObject({ format: 'rgb', value: { r: expect.any(Number), g: expect.any(Number), b: expect.any(Number) } })
    })
  })
})
