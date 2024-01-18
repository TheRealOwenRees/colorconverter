import ColorConverter from "../../src/colorconverter";

describe("setAlpha", () => {
  it("set alpha", () => {
    const colorConvertor = new ColorConverter("rgb(255, 255, 255)");
    colorConvertor.setAlpha(0.5);
    expect(colorConvertor.getAlpha()).toBe(0.5);
  });
});
