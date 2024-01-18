import ColorConverter from "../../../src/colorConverter";

describe("to HEX", () => {
  it("to HEX", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHex()).toBe("ffffff");
  });
});
