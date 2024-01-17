import ColorConvertor from "../../../src/colorconvertor";

describe("toHex8String", () => {
  it("to HEX8 string", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHex8String()).toBe(
      "#ffffffff",
    );
  });
});
