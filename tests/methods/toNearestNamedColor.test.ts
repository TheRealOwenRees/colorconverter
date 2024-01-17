import ColorConvertor from "../../src/colorconvertor";

describe("toNearestNamedColor", () => {
  it("to nearest named color", () => {
    expect(new ColorConvertor("0000fc").toNearestNamedColor()).toBe("blue");
  });
});
