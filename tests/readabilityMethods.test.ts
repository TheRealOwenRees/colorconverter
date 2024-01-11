import ColorConvertor from '../src/colorconvertor'

describe('readability methods', () => {
  it('readability value 1', () => {
    // @ts-expect-error
    expect(new ColorConvertor('rgb(255, 255, 255)').readability('#ffffff')).toBe(1)
  })
  it('readability value 1', () => {
    // @ts-expect-error
    expect(new ColorConvertor('rgb(255, 255, 255)').readability('#000000')).toBe(21)
  })
  // it('is readable', () => {
  //   // @ts-expect-error
  //   expect(new ColorConvertor('rgb(255, 255, 255)').isReadable('#000000')).toBe(true)
  // })
})
