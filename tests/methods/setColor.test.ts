import ColorConvertor from "../../src/colorconvertor";

describe("setColor", () => {
  it("set color", () => {
    const colorConvertor = new ColorConvertor();
    colorConvertor.setColor("rgb(0, 0, 0)");
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "rgb",
      value: { r: 0, g: 0, b: 0 },
    });
  });

  it("overwrite existing color", () => {
    const colorConvertor = new ColorConvertor("rgb(255, 255, 255)");
    colorConvertor.setColor("rgb(0, 0, 0)");
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "rgb",
      value: { r: 0, g: 0, b: 0 },
    });
  });
});
