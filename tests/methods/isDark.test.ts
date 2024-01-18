import ColorConverter from "../../src/colorconverter";

describe("isDark", () => {
  it("is dark", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").isDark()).toBe(false);
  });
});
