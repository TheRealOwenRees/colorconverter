import ColorConvertor from "../../src/colorconvertor";

describe("getColorObj", () => {
  it("LCH to ColorObj", () => {
    const colorConvertor = new ColorConvertor("lch(50%, 91, 298");
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "lch",
      value: { l: 50, c: 91, h: 298 },
    });
  });

  it("OKLCH to ColorObj", () => {
    const colorConvertor = new ColorConvertor("oklch(50%, 91, 298");
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "oklch",
      value: { l: 50, c: 91, h: 298 },
    });
  });
});
