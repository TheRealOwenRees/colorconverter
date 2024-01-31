import ColorConverter from "../../../src/colorconverter";

describe("monochromatic string", () => {
  it("monochromatic, default params", () => {
    expect(
      new ColorConverter("rgb(214, 92, 92)").monochromaticString(),
    ).toMatchObject([
      "hsl(0, 26.67%, 26.67%)",
      "hsl(0, 60%, 60%)",
      "hsl(0, 93.33%, 93.33%)",
    ]);
  });
});
