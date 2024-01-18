import ColorConverter from "../../../src/colorConverter";

describe("toHex8String", () => {
  it("to HEX8 string", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHex8String()).toBe(
      "#ffffffff",
    );
  });
});
