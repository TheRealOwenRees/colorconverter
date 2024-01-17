import ColorConvertor from "../../../src/colorconvertor";

describe("toHex8", () => {
  it("to HEX8", () => {
    expect(new ColorConvertor("rgba(255, 255, 255, 0)").toHex8()).toBe(
      "ffffff00",
    );
  });
  it("to HEX8, RGBA alpha missing", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHex8()).toBe("ffffffff");
  });
});
