import ColorConverter from "../../../src/colorconverter";

describe("complementary", () => {
  it("base hue 0", () => {
    expect(new ColorConverter("rgb(255, 0, 0)").complementary()).toMatchObject([
      { h: 0, s: 100, l: 50 },
      { h: 180, s: 100, l: 50 },
    ]);
  });

  it("base hue 0 as hsl", () => {
    expect(new ColorConverter("hsl(0, 100, 50)").complementary()).toMatchObject(
      [
        { h: 0, s: 100, l: 50 },
        { h: 180, s: 100, l: 50 },
      ],
    );
  });
});
