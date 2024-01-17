import ColorConvertor from "../../src/colorconvertor";

it("get luminance", () => {
  expect(new ColorConvertor("rgb(255, 255, 255)").getLuminance()).toBe(1);
});
