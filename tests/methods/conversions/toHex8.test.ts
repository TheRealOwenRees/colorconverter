import ColorConverter from "../../../src/colorConverter";

describe("toHex8", () => {
  it("to HEX8", () => {
    expect(new ColorConverter("rgba(255, 255, 255, 0)").toHex8()).toBe(
      "ffffff00",
    );
  });
  it("to HEX8, RGBA alpha missing", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHex8()).toBe("ffffffff");
  });
});
