import ColorConvertor from '../src/colorconvertor'

describe('color convertor instances', () => {
  it('should return a color convertor instance', () => {
    expect(new ColorConvertor('#ffffff')).toBeInstanceOf(ColorConvertor)
  })
  it('clone instance', () => {
    const colorConvertor = new ColorConvertor('rgb(255, 255, 255)')
    const clone = colorConvertor.clone()
    expect(clone).toMatchObject(colorConvertor)
  })
})
