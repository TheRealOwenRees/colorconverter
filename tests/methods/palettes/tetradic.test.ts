import ColorConverter from "../../../src/colorconverter";

describe("tetradic", () => {
  it("base hue 0", () => {
    expect(new ColorConverter("rgb(255, 0, 0)").tetradic()).toMatchObject([
      { h: 0, s: 100, l: 50 },
      { h: 90, s: 100, l: 50 },
      { h: 180, s: 100, l: 50 },
      { h: 270, s: 100, l: 50 },
    ]);
  });

  it("base hue 240", () => {
    expect(new ColorConverter("rgb(0, 0, 255)").tetradic()).toMatchObject([
      { h: 240, s: 100, l: 50 },
      { h: 330, s: 100, l: 50 },
      { h: 60, s: 100, l: 50 },
      { h: 150, s: 100, l: 50 },
    ]);
  });

  it("base hue 279", () => {
    expect(new ColorConverter("rgb(147, 64, 191)").tetradic()).toMatchObject([
      { h: 279, s: 50, l: 50 },
      { h: 9, s: 50, l: 50 },
      { h: 99, s: 50, l: 50 },
      { h: 189, s: 50, l: 50 },
    ]);
  });
});
