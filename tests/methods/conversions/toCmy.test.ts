import ColorConvertor from "../../../src/colorconvertor";

describe("to CMY", () => {
  it("RGB to CMY", () => {
    expect(new ColorConvertor("rgb(100, 24, 99)").toCmy()).toMatchObject({
      c: expect.closeTo(0.60784, 3),
      m: expect.closeTo(0.90588, 3),
      y: expect.closeTo(0.61176, 3),
    });
  });
});
