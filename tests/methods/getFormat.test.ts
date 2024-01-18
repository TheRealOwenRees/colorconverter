import ColorConverter from "../../src/colorconverter";

describe("getFormat", () => {
  it("get rgb format", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").getFormat()).toBe("rgb");
  });
  it("get hsl format", () => {
    expect(new ColorConverter("hsl(0, 100, 50)").getFormat()).toBe("hsl");
  });
});
