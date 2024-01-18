import ColorConverter from "../../../src/colorconverter";

describe("to HSV", () => {
  it("to HSV", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHsv()).toMatchObject({
      h: 0,
      s: 0,
      v: 100,
    });
  });
});
