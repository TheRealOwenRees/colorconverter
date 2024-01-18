import ColorConverter from "../../../src/colorConverter";

describe("toHslString", () => {
  it("to HSL string", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHslString()).toBe(
      "hsl(0, 0%, 100%)",
    );
  });
});
