import ColorConverter from "../../src/colorConverter";

describe("isDark", () => {
  it("is dark", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").isDark()).toBe(false);
  });
});
