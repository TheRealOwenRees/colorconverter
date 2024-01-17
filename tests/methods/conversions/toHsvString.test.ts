import ColorConvertor from "../../../src/colorconvertor";

describe("to HSV string", () => {
  it("to HSV string", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHsvString()).toBe(
      "hsv(0, 0%, 100%)",
    );
  });
});
