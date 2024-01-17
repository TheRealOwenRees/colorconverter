import ColorConvertor from "../../../src/colorconvertor";

describe("to HSV", () => {
  it("to HSV", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHsv()).toMatchObject({
      h: 0,
      s: 0,
      v: 100,
    });
  });
});
