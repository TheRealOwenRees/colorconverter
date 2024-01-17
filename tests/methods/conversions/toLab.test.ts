import ColorConvertor from "../../../src/colorconvertor";

describe("toLab", () => {
  it("RGB to LAB", () => {
    expect(new ColorConvertor("rgb(50, 60, 70)").toLab()).toMatchObject({
      l: expect.closeTo(24.802, 1),
      a: expect.closeTo(-1.428, 1),
      b: expect.closeTo(-7.497, 1),
    });
  });
});
