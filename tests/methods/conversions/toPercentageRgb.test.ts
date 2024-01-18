import ColorConverter from "../../../src/colorconverter";

describe("to percentage rgb", () => {
  it("get percentage rgb", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").toPercentageRgb(),
    ).toMatchObject({ r: 100, g: 100, b: 100 });
  });

  it("get percentage rgba", () => {
    expect(
      new ColorConverter("rgba(255, 255, 255, 0.5)").toPercentageRgb(),
    ).toMatchObject({ r: 100, g: 100, b: 100, a: 0.5 });
  });
});
