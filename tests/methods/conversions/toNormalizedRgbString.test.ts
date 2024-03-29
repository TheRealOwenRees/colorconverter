import ColorConverter from "../../../src/colorconverter";

describe("to normalized RGB string", () => {
  it("to normalized RGB string", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").toNormalizedRgbString(),
    ).toBe("rgb(1, 1, 1)");
  });

  it("to normalized RGBA string", () => {
    expect(
      new ColorConverter("rgba(255, 255, 255, 1)").toNormalizedRgbString(),
    ).toBe("rgba(1, 1, 1, 1)");
  });
});
