import { clamp } from "../src/utils/utilities";

describe("clamp", () => {
  it("clamp, min", () => {
    expect(clamp(0, 100, 142)).toBe(100);
  });

  it("clamp, max", () => {
    expect(clamp(0, 100, 10)).toBe(10);
  });

  it("clamp, middle", () => {
    expect(clamp(0, 100, -25)).toBe(0);
  });
});
