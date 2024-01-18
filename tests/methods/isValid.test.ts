import ColorConverter from "../../src/colorConverter";

it("is valid", () => {
  expect(new ColorConverter("rgb(255, 255, 255)").isValid()).toBe(true);
});
