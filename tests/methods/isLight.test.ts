import ColorConverter from "../../src/colorConverter";

describe("isLight", () => {
  it("is light", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").isLight()).toBe(true);
  });
});
