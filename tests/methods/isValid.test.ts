import ColorConvertor from "../../src/colorconvertor";

it("is valid", () => {
  expect(new ColorConvertor("rgb(255, 255, 255)").isValid()).toBe(true);
});
