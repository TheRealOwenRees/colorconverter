import ColorConverter from "../../../src/colorConverter";

describe("toXyz", () => {
  it("RGB to XYZ", () => {
    expect(new ColorConverter("rgb(50, 60, 70)").toXyz()).toMatchObject({
      x: expect.closeTo(4.036),
      y: expect.closeTo(4.352),
      z: expect.closeTo(6.42),
    });
  });
});
