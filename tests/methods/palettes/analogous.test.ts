import ColorConverter from "../../../src/colorconverter";

describe("analogous", () => {
  it("base hue 0", () => {
    expect(new ColorConverter("rgb(255, 0, 0)").analogous(7)).toMatchObject([
      { h: 0, s: 100, l: 50 },
      { h: expect.closeTo(51, 0), s: 100, l: 50 },
      { h: expect.closeTo(103, 0), s: 100, l: 50 },
      { h: expect.closeTo(154, 0), s: 100, l: 50 },
      { h: expect.closeTo(206, 0), s: 100, l: 50 },
      { h: expect.closeTo(257, 0), s: 100, l: 50 },
      { h: expect.closeTo(309, 0), s: 100, l: 50 },
    ]);
  });

  it("base hue 240", () => {
    expect(new ColorConverter("rgb(0, 0, 255)").analogous(7)).toMatchObject([
      { h: 240, s: 100, l: 50 },
      { h: expect.closeTo(291, 0), s: 100, l: 50 },
      { h: expect.closeTo(343, 0), s: 100, l: 50 },
      { h: expect.closeTo(34, 0), s: 100, l: 50 },
      { h: expect.closeTo(86, 0), s: 100, l: 50 },
      { h: expect.closeTo(137, 0), s: 100, l: 50 },
      { h: expect.closeTo(189, 0), s: 100, l: 50 },
    ]);
  });

  it("base hue 279", () => {
    expect(new ColorConverter("rgb(147, 64, 191)").analogous(7)).toMatchObject([
      { h: 279, s: 50, l: 50 },
      { h: expect.closeTo(330, 0), s: 50, l: 50 },
      { h: expect.closeTo(22, 0), s: 50, l: 50 },
      { h: expect.closeTo(73, 0), s: 50, l: 50 },
      { h: expect.closeTo(125, 0), s: 50, l: 50 },
      { h: expect.closeTo(176, 0), s: 50, l: 50 },
      { h: expect.closeTo(228, 0), s: 50, l: 50 },
    ]);
  });
});
