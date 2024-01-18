import ColorConverter from "../../../src/colorconverter";

describe("to normalized rgb", () => {
  it("to normalized rgb", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").toNormalizedRgb(),
    ).toMatchObject({ r: 1, g: 1, b: 1 });
  });

  it("to normalized rgba", () => {
    expect(
      new ColorConverter("rgba(255, 255, 255, 1)").toNormalizedRgb(),
    ).toMatchObject({ r: 1, g: 1, b: 1, a: 1 });
  });
});
