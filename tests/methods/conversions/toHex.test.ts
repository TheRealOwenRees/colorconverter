import ColorConvertor from "../../../src/colorconvertor";

describe("to HEX", () => {
  it("to HEX", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHex()).toBe("ffffff");
  });
});
