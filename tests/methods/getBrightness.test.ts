import ColorConvertor from "../../src/colorconvertor";

describe("getBrightness", () => {
  it("get brightness", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").getBrightness()).toBe(255);
  });
});
