import ColorConvertor from "../../src/colorconvertor";

describe("isLight", () => {
  it("is light", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").isLight()).toBe(true);
  });
});
