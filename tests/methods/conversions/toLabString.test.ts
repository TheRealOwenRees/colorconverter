import ColorConvertor from "../../../src/colorconvertor";

describe("toLabString", () => {
  it("RGB to LAB string", () => {
    expect(new ColorConvertor("rgb(50, 60, 70)").toLabString()).toBe(
      "lab(24.802652838228262, -1.424881508870629, -7.500503791881208)",
    );
  });
});
