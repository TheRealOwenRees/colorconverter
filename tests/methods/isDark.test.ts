import ColorConvertor from "../../src/colorconvertor";

describe("isDark", () => {
  it("is dark", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").isDark()).toBe(false);
  });
});
