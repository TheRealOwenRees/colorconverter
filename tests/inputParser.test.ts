import ColorConvertor from '../src/colorconvertor'

describe('color parsing', () => {
  it('parse named color', () => {
    const colorConvertorInstance = new ColorConvertor('red')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'name', value: 'f00' })
  })
  it('parse incorrect named color', () => {
    const colorConvertorInstance = new ColorConvertor('resd')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: undefined, value: undefined })
  })
  it('parse hex', () => {
    const colorConvertorInstance = new ColorConvertor('#ffffff')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'ffffff' })
  })
  it('parse hexa', () => {
    const colorConvertorInstance = new ColorConvertor('#ffffffcc')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hexa', value: 'ffffffcc' })
  })
  it('parse hex - no hash', () => {
    const colorConvertorInstance = new ColorConvertor('ffffff')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'ffffff' })
  })
  it('parse 3 digit hex', () => {
    const colorConvertorInstance = new ColorConvertor('#fff')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'fff' })
  })
  it('parse hexa - no hash', () => {
    const colorConvertorInstance = new ColorConvertor('ffffffcc')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hexa', value: 'ffffffcc' })
  })
  it('parse rgb', () => {
    const colorConvertorInstance = new ColorConvertor('rgb(255, 255, 255)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } })
  })
  it('parse rgb - no parenthesis', () => {
    const colorConvertorInstance = new ColorConvertor('rgb 255 255 255')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } })
  })
  it('parse rgba', () => {
    const colorConvertorInstance = new ColorConvertor('rgba(255, 255, 255, 0.7)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } })
  })
  it('parse rgba - no parenthesis', () => {
    const colorConvertorInstance = new ColorConvertor('rgba 255 255 255 0.7')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } })
  })
  it('parse hsl', () => {
    const colorConvertorInstance = new ColorConvertor('hsl(305, 100%, 54.5%)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsl - no comma', () => {
    const colorConvertorInstance = new ColorConvertor('hsl(305 100% 54.5%)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsl - no parenthesis', () => {
    const colorConvertorInstance = new ColorConvertor('hsl 305 100% 54.5%')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsl - no percentage sign', () => {
    const colorConvertorInstance = new ColorConvertor('hsl 305 100 54.5')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } })
  })
  it('parse hsla', () => {
    const colorConvertorInstance = new ColorConvertor('hsla(305, 100%, 54.5%, 0.5)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsla', value: { h: 305, s: 100, l: 54.5, a: 0.5 } })
  })
  it('parse hsv', () => {
    const colorConvertorInstance = new ColorConvertor('hsv(4, 96%, 54.5%)')
    expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsv', value: { h: 4, s: 96, v: 54.5 } })
  })
})
