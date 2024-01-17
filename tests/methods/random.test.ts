import ColorConvertor from "../../src/colorconvertor";

describe("random", () => {
  it("random color", () => {
    const colorConvertor = new ColorConvertor();
    colorConvertor.random();
    expect(colorConvertor.getColorObj()).toMatchObject({
      format: "rgb",
      value: {
        r: expect.any(Number),
        g: expect.any(Number),
        b: expect.any(Number),
      },
    });
  });
});
