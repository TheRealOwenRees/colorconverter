import ColorConverter from "../../../src/colorConverter";

describe("toHsl", () => {
  it("to HSL", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHsl()).toMatchObject({
      h: 0,
      s: 0,
      l: 100,
    });
  });
});
