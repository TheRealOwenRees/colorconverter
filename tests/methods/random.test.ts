import ColorConverter from "../../src/colorconverter";

describe("random", () => {
  it("random color", () => {
    const colorConvertor = new ColorConverter();
    colorConvertor.random();
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "rgb",
      value: {
        r: expect.any(Number),
        g: expect.any(Number),
        b: expect.any(Number),
      },
    });
  });
});
