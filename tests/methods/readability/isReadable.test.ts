import ColorConvertor from "../../../src/colorconvertor";

describe("isReadable", () => {
  it("is readable, white on black", () => {
    expect(
      new ColorConvertor("rgb(255, 255, 255)").isReadable("#000000"),
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
      new ColorConvertor("rgb(13,114,103)").isReadable("#ffffff"),
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
