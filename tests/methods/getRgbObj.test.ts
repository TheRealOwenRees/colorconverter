import ColorConvertor from "../../src/colorconvertor";

describe("getRgbObj", () => {
  it("LCH -> Normalized RGB", () => {
    const colorConvertor = new ColorConvertor("lch(49.77%, 88.71, 297.88");
    expect(colorConvertor.getRgbObj()).toMatchObject({
      r: expect.closeTo(0.325, 1),
      g: expect.closeTo(0.3725, 1),
      b: expect.closeTo(1.0, 1),
    });
  });

  it("OKLCH -> Normalized RGB", () => {
    const colorConvertor = new ColorConvertor("oklch(70%, 0.095, 71.57");
    expect(colorConvertor.getRgbObj()).toMatchObject({
      r: expect.closeTo(0.7765, 1),
      g: expect.closeTo(0.5765, 1),
      b: expect.closeTo(0.3373, 1),
    });
  });
});
