import ColorConverter from "../../../src/colorconverter";

describe("toHexString", () => {
  it("to HEX string", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toHexString()).toBe(
      "#ffffff",
    );
  });
});
