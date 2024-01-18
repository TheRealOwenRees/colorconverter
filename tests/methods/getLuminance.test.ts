import ColorConverter from "../../src/colorConverter";

it("get luminance", () => {
  expect(new ColorConverter("rgb(255, 255, 255)").getLuminance()).toBe(1);
});
