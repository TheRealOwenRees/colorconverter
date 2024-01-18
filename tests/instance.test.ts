import ColorConverter from '../src/colorConverter'

describe('color convertor instances', () => {
  it('should return a color convertor instance', () => {
    expect(new ColorConverter('#ffffff')).toBeInstanceOf(ColorConverter)
  })
  it('clone instance', () => {
    const colorConvertor = new ColorConverter('rgb(255, 255, 255)')
    const clone = colorConvertor.clone()
    expect(clone).toMatchObject(colorConvertor)
  })
})
