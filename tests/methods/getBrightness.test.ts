import ColorConverter from "../../src/colorconverter";

describe("getBrightness", () => {
  it("get brightness", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").getBrightness()).toBe(255);
  });
});
