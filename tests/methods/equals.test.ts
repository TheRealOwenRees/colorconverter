import ColorConverter from "../../src/colorconverter";

describe("equals", () => {
  it("compare two colors for equality", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").equals("hsl(0, 0, 100)"),
    ).toBe(true);
  });
  it("compare two colors for inequality", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").equals("hsl(60, 100, 99.8)"),
    ).toBe(false);
  });
});
