import ColorConverter from "../../../src/colorconverter";

describe("readability", () => {
  it("readability value 1", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").readability("#ffffff"),
    ).toBe(1);
  });

  it("readability value 21", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").readability("#000000"),
    ).toBe(21);
  });
});
