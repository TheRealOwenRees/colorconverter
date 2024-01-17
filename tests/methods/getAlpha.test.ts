import ColorConvertor from "../../src/colorconvertor";

describe("getAlpha", () => {
  it("get alpha", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").getAlpha()).toBe(1);
  });
});
