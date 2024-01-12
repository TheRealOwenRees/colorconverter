import { rgbToXyz, xyzToLab } from './conversions';
export function convertDecimalToHex(d) {
  return Math.round(d * 255).toString(16);
}
export function calculateBrightness(rgb) {
  const {
    r,
    g,
    b
  } = rgb;
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error('RGB values must be defined');
  }
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
export function calculateLuminance(rgb) {
  const {
    r,
    g,
    b
  } = rgb;
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error('RGB values must be defined');
  }
  let R, G, B;
  if (r <= 0.03928) R = r / 12.92;else R = Math.pow((r + 0.055) / 1.055, 2.4);
  if (g <= 0.03928) G = g / 12.92;else G = Math.pow((g + 0.055) / 1.055, 2.4);
  if (b <= 0.03928) B = b / 12.92;else B = Math.pow((b + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
export function truncateHex(hex) {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2];
    }
  }
  return hex;
}
export function expandHex(hex) {
  if (hex.length === 3) {
    return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2];
  }
  return hex;
}
export function labEuclideanDistance(lab1, lab2) {
  if (lab1.l === undefined || lab1.a === undefined || lab1.b === undefined || lab2.l === undefined || lab2.a === undefined || lab2.b === undefined) {
    throw new Error('Lab values must be defined');
  } // TODO can we do 'any' === undefined inside of the lab1 and lab2 objects?
  return Math.sqrt(Math.pow(lab1.l - lab2.l, 2) + Math.pow(lab1.a - lab2.a, 2) + Math.pow(lab1.b - lab1.b, 2));
}
export function findClosestColor(rgb, namedColorsRgb) {
  let minDistance = Infinity;
  let closestColor = '';
  const lab1 = xyzToLab(rgbToXyz(rgb));
  for (const color in namedColorsRgb) {
    const lab2 = xyzToLab(rgbToXyz(namedColorsRgb[color]));
    const distance = labEuclideanDistance(lab1, lab2);
    if (distance < minDistance) {
      closestColor = color;
      minDistance = distance;
    }
  }
  return closestColor;
}
//# sourceMappingURL=utilities.js.map