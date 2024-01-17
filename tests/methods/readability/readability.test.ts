import ColorConvertor from "../../../src/colorconvertor";

describe("readability", () => {
  it("readability value 1", () => {
    expect(
      new ColorConvertor("rgb(255, 255, 255)").readability("#ffffff"),
    ).toBe(1);
  });

  it("readability value 21", () => {
    expect(
      new ColorConvertor("rgb(255, 255, 255)").readability("#000000"),
    ).toBe(21);
  });
});
