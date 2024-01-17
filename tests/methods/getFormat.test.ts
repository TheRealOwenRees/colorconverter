import ColorConvertor from "../../src/colorconvertor";

describe("getFormat", () => {
  it("get rgb format", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").getFormat()).toBe("rgb");
  });
  it("get hsl format", () => {
    expect(new ColorConvertor("hsl(0, 100, 50)").getFormat()).toBe("hsl");
  });
});
