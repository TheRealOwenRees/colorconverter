import ColorConverter from "../../src/colorconverter";

describe("toNearestNamedColor", () => {
  it("to nearest named color", () => {
    expect(new ColorConverter("0000fc").toNearestNamedColor()).toBe("blue");
  });
});
