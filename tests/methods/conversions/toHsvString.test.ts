import ColorConverter from "../../../src/colorConverter";

describe("to HSV string", () => {
  it("to HSV string", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHsvString()).toBe(
      "hsv(0, 0%, 100%)",
    );
  });
});
