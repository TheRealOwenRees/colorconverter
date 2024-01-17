import ColorConvertor from "../../../src/colorconvertor";

describe("toLchString", () => {
  it("RGB to LCH string", () => {
    expect(new ColorConvertor("rgb(50, 60, 100)").toLchString()).toBe(
      "lch(26.244630235083065, 26.202269191846792, 288.02120872573244)",
    );
  });
});
