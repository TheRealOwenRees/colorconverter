import ColorConvertor from "../../../src/colorconvertor";

describe("toHslString", () => {
  it("to HSL string", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHslString()).toBe(
      "hsl(0, 0%, 100%)",
    );
  });
});
