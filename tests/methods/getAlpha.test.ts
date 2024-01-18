import ColorConverter from "../../src/colorconverter";

describe("getAlpha", () => {
  it("get alpha", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").getAlpha()).toBe(1);
  });
});
