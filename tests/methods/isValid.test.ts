import ColorConverter from "../../src/colorconverter";

it("is valid", () => {
  expect(new ColorConverter("rgb(255, 255, 255)").isValid()).toBe(true);
});
