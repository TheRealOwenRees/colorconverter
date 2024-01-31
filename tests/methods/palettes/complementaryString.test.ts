import ColorConverter from "../../../src/colorconverter";

describe("complementary string", () => {
  it("base hue 0", () => {
    expect(
      new ColorConverter("rgb(255, 0, 0)").complementaryString(),
    ).toMatchObject(["hsl(0, 100%, 50%)", "hsl(180, 100%, 50%)"]);
  });
});
