import ColorConvertor from '../src/colorconvertor'

describe('color convertor instance', () => {
  it('should return a color convertor instance', () => {
    // @ts-expect-error
    expect(new ColorConvertor('#ffffff')).toBeInstanceOf(ColorConvertor)
  })
})
