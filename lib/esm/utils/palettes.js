import { clamp } from "./utilities.js";
function analogous(numOfColors, baseHsl) {
  const {
    h,
    s,
    l
  } = baseHsl;
  const step = 360 / numOfColors;
  const colors = [];
  for (let i = 0; i < numOfColors; i++) {
    colors.push({
      h: (h + i * step) % 360,
      s,
      l
    });
  }
  return colors;
}
function monochromatic(numOfColors, deltaS, deltaL, baseHsl) {
  const {
    h,
    s,
    l
  } = baseHsl;

  // Because we want an equal number of colors on each side of the base color,
  // we add 1 to an even number of colors to allow for this
  const adjustedNumOfColors = numOfColors % 2 === 0 ? numOfColors + 1 : numOfColors;
  const colorsEachSide = Math.ceil(adjustedNumOfColors / 2);

  // Deltas S and L are calculated based on the odd number of colors
  const adjustedDeltaS = deltaS ?? 100 / adjustedNumOfColors;
  const adjustedDeltaL = deltaL ?? 100 / adjustedNumOfColors;
  const colors = [];
  for (let i = 0; i < colorsEachSide; i++) {
    if (i === 0) {
      colors.push({
        h,
        s,
        l
      });
      continue;
    }
    colors.push({
      h,
      s: clamp(0, 100, s - adjustedDeltaS * i),
      l: clamp(0, 100, l - adjustedDeltaL * i)
    }, {
      h,
      s: clamp(0, 100, s + adjustedDeltaS * i),
      l: clamp(0, 100, l + adjustedDeltaL * i)
    });
  }
  console.log(colors.sort((a, b) => a.s - b.s));
  return colors.sort((a, b) => a.s - b.s);
}
const palettes = {
  analogous,
  monochromatic
};
export default palettes;
//# sourceMappingURL=palettes.js.map