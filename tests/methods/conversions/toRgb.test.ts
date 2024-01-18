import ColorConverter from "../../../src/colorconverter";

describe("to RGB", () => {
  it("return rgb object when input is rgb string", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toRgb()).toMatchObject({
      r: 255,
      g: 255,
      b: 255,
      a: undefined,
    });
  });

  it("return rgba object when input is rgba string", () => {
    expect(
      new ColorConverter("rgba(255, 255, 255, 0.7)").toRgb(),
    ).toMatchObject({ r: 255, g: 255, b: 255, a: 0.7 });
  });

  it("return rgb object when input is hex string", () => {
    expect(new ColorConverter("#ffffff").toRgb()).toMatchObject({
      r: 255,
      g: 255,
      b: 255,
      a: undefined,
    });
  });

  it("return rgb object when input is hsl string", () => {
    expect(new ColorConverter("hsl(0, 0%, 50%)").toRgb()).toMatchObject({
      r: 128,
      g: 128,
      b: 128,
    });
  });

  it("return rgb object when input is hsv string", () => {
    expect(new ColorConverter("hsv(50, 25.5%, 80%)").toRgb()).toMatchObject({
      r: 204,
      g: 195,
      b: 152,
    });
  });

  it("LCH -> RGB", () => {
    const colorConvertor = new ColorConverter("lch(49.77%, 88.71, 297.88");
    expect(colorConvertor.toRgb()).toMatchObject({
      r: expect.closeTo(83),
      g: expect.closeTo(101),
      b: expect.closeTo(254),
    });
  });

  it("OKLCH -> RGB", () => {
    const colorConvertor = new ColorConverter("oklch(70%, 0.1, 297.88");
    // the L in OKLCH needs dividing by 100
    expect(colorConvertor.toRgb()).toMatchObject({
      r: expect.closeTo(166),
      g: expect.closeTo(145),
      b: expect.closeTo(213),
    });
  });
});
