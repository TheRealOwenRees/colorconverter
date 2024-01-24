import ColorConverter from "../../../src/colorconverter";

describe("tetradicString", () => {
  it("should return a string", () => {
    expect(new ColorConverter("rgb(255, 0, 0)").tetradicString()).toMatchObject(
      [
        "hsl(0, 100%, 50%)",
        "hsl(90, 100%, 50%)",
        "hsl(180, 100%, 50%)",
        "hsl(270, 100%, 50%)",
      ],
    );
  });
});
