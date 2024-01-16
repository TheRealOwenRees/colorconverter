import ColorConvertor from '../src/colorconvertor'

describe('readability methods', () => {
  it('readability value 1', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').readability('#ffffff')).toBe(1)
  })
  it('readability value 21', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').readability('#000000')).toBe(21)
  })
  it('is readable, white on black', () => {
    expect(new ColorConvertor('rgb(255, 255, 255)').isReadable('#000000')).toMatchObject({
      AA: {
        large: true,
        normal: true,
        small: true
      },
      AAA: {
        large: true,
        normal: true,
        small: true
      }
    })
  })
  it('is readable, dark turquoise on white', () => {
    expect(new ColorConvertor('rgb(13,114,103)').isReadable('#ffffff')).toMatchObject({
      AA: {
        large: true,
        normal: true,
        small: false
      },
      AAA: {
        large: true,
        normal: false,
        small: false
      }
    })
  })
})
