import ColorConvertor from "../../../src/colorconvertor";

describe("to normalized rgb", () => {
  it("to normalized rgb", () => {
    expect(
      new ColorConvertor("rgb(255, 255, 255)").toNormalizedRgb(),
    ).toMatchObject({ r: 1, g: 1, b: 1 });
  });

  it("to normalized rgba", () => {
    expect(
      new ColorConvertor("rgba(255, 255, 255, 1)").toNormalizedRgb(),
    ).toMatchObject({ r: 1, g: 1, b: 1, a: 1 });
  });
});
