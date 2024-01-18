import ColorConverter from "../../src/colorconverter";

it("get luminance", () => {
  expect(new ColorConverter("rgb(255, 255, 255)").getLuminance()).toBe(1);
});
