import ColorConvertor from "../../../src/colorconvertor";

describe("to percentage rgb string", () => {
  it("get percentage rgb string", () => {
    expect(
      new ColorConvertor("rgb(255, 255, 255)").toPercentageRgbString(),
    ).toBe("rgb(100%, 100%, 100%)");
  });

  it("get percentage rgba string", () => {
    expect(
      new ColorConvertor("rgba(255, 255, 255, 0.5)").toPercentageRgbString(),
    ).toBe("rgba(100%, 100%, 100%, 0.5)");
  });
});
