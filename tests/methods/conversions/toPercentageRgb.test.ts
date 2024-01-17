import ColorConvertor from "../../../src/colorconvertor";

describe("to percentage rgb", () => {
  it("get percentage rgb", () => {
    expect(
      new ColorConvertor("rgb(255, 255, 255)").toPercentageRgb(),
    ).toMatchObject({ r: 100, g: 100, b: 100 });
  });

  it("get percentage rgba", () => {
    expect(
      new ColorConvertor("rgba(255, 255, 255, 0.5)").toPercentageRgb(),
    ).toMatchObject({ r: 100, g: 100, b: 100, a: 0.5 });
  });
});
