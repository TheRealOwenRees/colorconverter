import ColorConvertor from "../../src/colorconvertor";

describe("setAlpha", () => {
  it("set alpha", () => {
    const colorConvertor = new ColorConvertor("rgb(255, 255, 255)");
    colorConvertor.setAlpha(0.5);
    expect(colorConvertor.getAlpha()).toBe(0.5);
  });
});
