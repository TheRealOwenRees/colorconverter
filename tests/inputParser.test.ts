import ColorConvertor from '../src/colorconvertor'

describe('color parsing', () => {
  it('parse named color', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('red')
    console.log(colorConvertorInstance)
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'name', value: 'f00' })
  })
  it('parse incorrect named color', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('resd')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: undefined, value: undefined })
  })
  it('parse hex', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('#ffffff')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'ffffff' })
  })
  it('parse hexa', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('#ffffffcc')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hexa', value: 'ffffffcc' })
  })
  it('parse hex - no hash', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('ffffff')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'ffffff' })
  })
  it('parse 3 digit hex', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('#fff')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'fff' })
  })
  it('parse hexa - no hash', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('ffffffcc')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hexa', value: 'ffffffcc' })
  })
  it('parse rgb', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('rgb(255, 255, 255)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } })
  })
  it('parse rgb - no parenthesis', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('rgb 255 255 255')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } })
  })
  it('parse rgba', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('rgba(255, 255, 255, 0.7)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } })
  })
  it('parse rgba - no parenthesis', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('rgba 255 255 255 0.7')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } })
  })
  it('parse hsl', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('hsl(305, 100%, 54.5%)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsl - no comma', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('hsl(305 100% 54.5%)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsl - no parenthesis', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('hsl 305 100% 54.5%')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsl - no percentage sign', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('hsl 305 100 54.5')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsla', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('hsla(305, 100%, 54.5%, 0.5)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsla', value: { h: 305, s: 100, l: 54.5, a: 0.5 } })
  })
  it('parse hsv', () => {
    // @ts-expect-error
    const colorConvertorInstance = new ColorConvertor('hsv(4, 96%, 54.5%)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsv', value: { h: 4, s: 96, v: 54.5 } })
  })
})
