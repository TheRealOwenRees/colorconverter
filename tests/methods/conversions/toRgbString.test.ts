import ColorConverter from "../../../src/colorconverter";

describe("to RGB string", () => {
  it("return rgb string when input is rgb string", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toRgbString()).toBe(
      "rgb(255, 255, 255)",
    );
  });

  it("return rgba string when input is rgba string", () => {
    expect(new ColorConverter("rgba(255, 255, 255, 0.7)").toRgbString()).toBe(
      "rgba(255, 255, 255, 0.7)",
    );
  });

  it("return rgb string when input is hex string", () => {
    expect(new ColorConverter("#ffffff").toRgbString()).toBe(
      "rgb(255, 255, 255)",
    );
  });

  it("return rgb string when input is hsl string", () => {
    expect(new ColorConverter("hsl(0, 0%, 50%)").toRgbString()).toBe(
      "rgb(128, 128, 128)",
    );
  });

  it("return rgb string when input is hsv string", () => {
    expect(new ColorConverter("hsv(50, 25.5%, 80%)").toRgbString()).toBe(
      "rgb(204, 195, 152)",
    );
  });
});
