import ColorConverter from "../../src/colorconverter";

describe("setColor", () => {
  it("set color", () => {
    const colorConvertor = new ColorConverter();
    colorConvertor.setColor("rgb(0, 0, 0)");
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "rgb",
      value: { r: 0, g: 0, b: 0 },
    });
  });

  it("overwrite existing color", () => {
    const colorConvertor = new ColorConverter("rgb(255, 255, 255)");
    colorConvertor.setColor("rgb(0, 0, 0)");
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "rgb",
      value: { r: 0, g: 0, b: 0 },
    });
  });
});
