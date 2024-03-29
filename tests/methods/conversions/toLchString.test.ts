import ColorConverter from "../../../src/colorconverter";

describe("toLchString", () => {
  it("RGB to LCH string", () => {
    expect(new ColorConverter("rgb(50, 60, 100)").toLchString()).toBe(
      "lch(26.244630235083065, 26.202269191846792, 288.02120872573244)",
    );
  });
});
