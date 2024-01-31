import ColorConverter from "../../../src/colorconverter";

describe("monochromatic", () => {
  it("monochromatic, default params", () => {
    expect(
      new ColorConverter("rgb(214, 92, 92)").monochromatic(),
    ).toMatchObject([
      { h: 0, s: expect.closeTo(27, 0), l: expect.closeTo(27, 0) },
      { h: 0, s: 60, l: 60 },
      { h: 0, s: expect.closeTo(93, 0), l: expect.closeTo(93, 0) },
    ]);
  });

  it("monochromatic, 5 colors", () => {
    expect(
      new ColorConverter("rgb(214, 92, 92)").monochromatic(5),
    ).toMatchObject([
      { h: 0, s: 20, l: 20 },
      { h: 0, s: 40, l: 40 },
      { h: 0, s: 60, l: 60 },
      { h: 0, s: 80, l: 80 },
      { h: 0, s: 100, l: 100 },
    ]);
  });

  it("monochromatic, 4 colors", () => {
    expect(
      new ColorConverter("rgb(214, 92, 92)").monochromatic(4),
    ).toMatchObject([
      { h: 0, s: 20, l: 20 },
      { h: 0, s: 40, l: 40 },
      { h: 0, s: 60, l: 60 },
      { h: 0, s: 80, l: 80 },
      { h: 0, s: 100, l: 100 },
    ]);
  });

  it("monochromatic, 5 colors, values above 100%", () => {
    expect(new ColorConverter("hsl(0, 80, 70)").monochromatic(5)).toMatchObject(
      [
        { h: 0, s: 40, l: 30 },
        { h: 0, s: 60, l: 50 },
        { h: 0, s: 80, l: 70 },
        { h: 0, s: 100, l: 90 },
        { h: 0, s: 100, l: 100 },
      ],
    );
  });

  it("monochromatic, 7 colors, custom delta, returning values below 0%", () => {
    expect(
      new ColorConverter("hsl(0, 51, 49)").monochromatic(7, 21, 41),
    ).toMatchObject([
      { h: 0, s: 0, l: 0 },
      { h: 0, s: 9, l: 0 },
      { h: 0, s: 30, l: 8 },
      { h: 0, s: 51, l: 49 },
      { h: 0, s: 72, l: 90 },
      { h: 0, s: 93, l: 100 },
      { h: 0, s: 100, l: 100 },
    ]);
  });
});
