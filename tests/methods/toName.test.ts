import ColorConverter from "../../src/colorconverter";

describe("toName", () => {
  it("get named color", () => {
    expect(new ColorConverter("rgb(255, 255, 255)").toName()).toBe("white");
  });
  it("get undefined named color", () => {
    expect(new ColorConverter("rgb(255, 255, 254)").toName()).toBe(undefined);
  });
});
