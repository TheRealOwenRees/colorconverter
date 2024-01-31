import ColorConverter from "../../../src/colorconverter";

describe("triadic", () => {
  it("base hue 0", () => {
    expect(new ColorConverter("rgb(255, 0, 0)").triadic()).toMatchObject([
      { h: 0, s: 100, l: 50 },
      { h: 120, s: 100, l: 50 },
      { h: 240, s: 100, l: 50 },
    ]);
  });

  it("base hue 240", () => {
    expect(new ColorConverter("rgb(0, 0, 255)").triadic()).toMatchObject([
      { h: 240, s: 100, l: 50 },
      { h: 0, s: 100, l: 50 },
      { h: 120, s: 100, l: 50 },
    ]);
  });

  it("base hue 279", () => {
    expect(new ColorConverter("rgb(147, 64, 191)").triadic()).toMatchObject([
      { h: 279, s: 50, l: 50 },
      { h: 39, s: 50, l: 50 },
      { h: 159, s: 50, l: 50 },
    ]);
  });
});
