import ColorConvertor from "../../../src/colorconvertor";

describe("toHsl", () => {
  it("to HSL", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHsl()).toMatchObject({
      h: 0,
      s: 0,
      l: 100,
    });
  });
});
