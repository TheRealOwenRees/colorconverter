import ColorConverter from "../../../src/colorconverter";

describe("isReadable", () => {
  it("is readable, white on black", () => {
    expect(
      new ColorConverter("rgb(255, 255, 255)").isReadable("#000000"),
    ).toMatchObject({
      AA: {
        large: true,
        normal: true,
        small: true,
      },
      AAA: {
        large: true,
        normal: true,
        small: true,
      },
    });
  });

  it("is readable, dark turquoise on white", () => {
    expect(
      new ColorConverter("rgb(13,114,103)").isReadable("#ffffff"),
    ).toMatchObject({
      AA: {
        large: true,
        normal: true,
        small: false,
      },
      AAA: {
        large: true,
        normal: false,
        small: false,
      },
    });
  });
});
