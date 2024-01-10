"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateBrightness = calculateBrightness;
exports.calculateLuminance = calculateLuminance;
exports.truncateHex = truncateHex;
function calculateBrightness(rgb) {
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// TODO this is a long calculation, can we make it more efficient?
function calculateLuminance(rgb) {
  // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
  var R, G, B;
  var RsRGB = r / 255;
  var GsRGB = g / 255;
  var BsRGB = b / 255;
  if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
function truncateHex(hex) {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2];
    }
  }
  return hex;
}
//# sourceMappingURL=utilities.js.map