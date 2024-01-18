import ColorConverter from "../../../src/colorconverter";

describe("to HEX", () => {
  it("to HEX", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHex()).toBe("ffffff");
  });
});
