import ColorConverter from "../../../src/colorconverter";

describe("toXyzString", () => {
  it("RGB to XYZ string", () => {
    expect(new ColorConverter("rgb(50, 60, 70)").toXyzString()).toBe(
      "xyz(4.036742351643451, 4.352023512348019, 6.421616354823418)",
    );
  });
});
