import ColorConverter from "../../../src/colorconverter";

describe("toLch", () => {
  it("RGB to LCH", () => {
    expect(new ColorConverter("rgb(50, 60, 100)").toLch()).toMatchObject({
      l: expect.closeTo(26.244, 1),
      c: expect.closeTo(26.196, 1),
      h: expect.closeTo(288.014, 1),
    });
  });
});
