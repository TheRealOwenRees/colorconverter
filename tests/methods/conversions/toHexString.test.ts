import ColorConvertor from "../../../src/colorconvertor";

describe("toHexString", () => {
  it("to HEX string", () => {
    expect(new ColorConvertor("rgb(255, 255, 255)").toHexString()).toBe(
      "#ffffff",
    );
  });
});
