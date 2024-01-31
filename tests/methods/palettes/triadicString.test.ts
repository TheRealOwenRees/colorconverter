import ColorConverter from "../../../src/colorconverter";

describe("triadic", () => {
  it("base hue 0", () => {
    expect(new ColorConverter("rgb(255, 0, 0)").triadicString()).toMatchObject([
      "hsl(0, 100%, 50%)",
      "hsl(120, 100%, 50%)",
      "hsl(240, 100%, 50%)",
    ]);
  });

  it("base hue 240", () => {
    expect(new ColorConverter("rgb(0, 0, 255)").triadicString()).toMatchObject([
      "hsl(240, 100%, 50%)",
      "hsl(0, 100%, 50%)",
      "hsl(120, 100%, 50%)",
    ]);
  });

  it("base hue 279", () => {
    expect(
      new ColorConverter("rgb(147, 64, 191)").triadicString(),
    ).toMatchObject([
      "hsl(279, 50%, 50%)",
      "hsl(39, 50%, 50%)",
      "hsl(159, 50%, 50%)",
    ]);
  });
});
