import ColorConverter from "../../../src/colorConverter";

describe("to percentage rgb string", () => {
  it("get percentage rgb string", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").toPercentageRgbString(),
    ).toBe("rgb(100%, 100%, 100%)");
  });

  it("get percentage rgba string", () => {
    expect(
      new ColorConverter("rgba(255, 255, 255, 0.5)").toPercentageRgbString(),
    ).toBe("rgba(100%, 100%, 100%, 0.5)");
  });
});
