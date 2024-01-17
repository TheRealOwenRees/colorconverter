import ColorConvertor from "../../../src/colorconvertor";

describe("to CMYK", () => {
  it("RGB to CMYK", () => {
    expect(new ColorConvertor("rgb(100, 24, 99)").toCmyk()).toMatchObject({
      c: expect.closeTo(0, 3),
      m: expect.closeTo(0.76, 3),
      y: expect.closeTo(0.01, 3),
      k: expect.closeTo(0.60784, 3),
    });
  });
});
