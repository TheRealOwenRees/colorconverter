function convertDecimalToHex(d) {
  return Math.round(d * 255).toString(16);
}
function calculateBrightness(rgb) {
  const {
    r,
    g,
    b
  } = rgb;
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error("RGB values must be defined");
  }
  return (r * 299 + g * 587 + b * 114) / 1000;
}
// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
function calculateLuminance(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error("RGB values must be defined");
  }
  let R, G, B;
  if (rgb.r <= 0.03928) R = rgb.r / 12.92;else R = Math.pow((rgb.r + 0.055) / 1.055, 2.4);
  if (rgb.g <= 0.03928) G = rgb.g / 12.92;else G = Math.pow((rgb.g + 0.055) / 1.055, 2.4);
  if (rgb.b <= 0.03928) B = rgb.b / 12.92;else B = Math.pow((rgb.b + 0.055) / 1.055, 2.4);
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
function expandHex(hex) {
  if (hex.length === 3) {
    return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2];
  }
  return hex;
}
// √((L₀-L₁)²+(a₀-a₁)²+(b₀-b₁)²
function labDeltaE(lab1, lab2) {
  if (lab1.l === undefined || lab1.a === undefined || lab1.b === undefined || lab2.l === undefined || lab2.a === undefined || lab2.b === undefined) {
    throw new Error("Lab values must be defined");
  }
  return Math.sqrt(Math.pow(lab1.l - lab2.l, 2) + Math.pow(lab1.a - lab2.a, 2) + Math.pow(lab1.b - lab1.b, 2));
}

/*
  Color conversion functions. 'Normalized' means 0-1 range.
  Formulae from https://www.easyrgb.com/en/math.php
*/
const referenceWhiteConstants = {
  x: 95.047,
  y: 100,
  z: 108.883
};
/*
   RGB / RGBA conversions
*/
function toRgbBase(colorObj) {
  if (colorObj.format === "rgb" || colorObj.format === "rgba") {
    return rgbToNormalizedRgb(colorObj.value);
  }
  if (colorObj.format === "name" && typeof colorObj.value === "string") {
    return hexToNormalizedRgb(colorObj.value);
  }
  if (colorObj.format === "hex" && typeof colorObj.value === "string") {
    return rgbToNormalizedRgb(hexToRgb(colorObj.value));
  }
  if (colorObj.format === "hsl") {
    return hslToRgbNormalized(colorObj.value);
  }
  if (colorObj.format === "hsv") {
    return hsvToRgbNormalized(colorObj.value);
  }
  if (colorObj.format === "lch") {
    const lab = lchToLab(colorObj.value);
    const xyz = labToXyz(lab);
    return xyzToRgbNormalized(xyz);
  }
  if (colorObj.format === "oklch") {
    const oklab = lchToLab(colorObj.value);
    const lRGB = okLabToLinearRbg(oklab);
    return lRgbToNormalizedRgb(lRGB);
  }
  return {
    r: undefined,
    g: undefined,
    b: undefined,
    a: undefined
  };
}
function hexToNormalizedRgb(hexColor) {
  const rgb = hexToRgb(hexColor);
  return rgbToNormalizedRgb(rgb);
}
function rgbNormalizedToRgb(rgb) {
  var _a;
  return {
    r: rgb.r !== undefined ? Math.round(rgb.r * 255) : undefined,
    g: rgb.g !== undefined ? Math.round(rgb.g * 255) : undefined,
    b: rgb.b !== undefined ? Math.round(rgb.b * 255) : undefined,
    a: (_a = rgb.a) !== null && _a !== void 0 ? _a : undefined
  };
}
function rgbToNormalizedRgb(rgb) {
  const {
    r,
    g,
    b,
    a
  } = rgb;
  return {
    r: r !== undefined ? r / 255 : undefined,
    g: g !== undefined ? g / 255 : undefined,
    b: b !== undefined ? b / 255 : undefined,
    a: a !== null && a !== void 0 ? a : undefined
  };
}
/*
  Hex / Hex8 conversions
*/
function rgbToHex(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    return undefined;
  }
  const binaryRgb = rgb.r << 16 | rgb.g << 8 | rgb.b;
  return binaryRgb.toString(16).padStart(6, "0");
}
function rgbaToHex8(rgba) {
  var _a;
  const binaryRgb = rgbToHex(rgba);
  if (binaryRgb === undefined) {
    return "";
  }
  const aHex = convertDecimalToHex((_a = rgba.a) !== null && _a !== void 0 ? _a : 1);
  return `${binaryRgb.padStart(6, "0")}${aHex === "0" ? "00" : aHex}`;
}
/*
    HSL / HSV conversions
*/
function rgbNormalizedToHsl(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error("RGB values must be defined");
  }
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  let h = (max + min) / 2;
  let s;
  const l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0; // Achromatic
  } else {
    const diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);
    switch (max) {
      case rgb.r:
        h = (rgb.g - rgb.b) / diff + (rgb.g < rgb.b ? 6 : 0);
        break;
      case rgb.g:
        h = (rgb.b - rgb.r) / diff + 2;
        break;
      case rgb.b:
        h = (rgb.r - rgb.g) / diff + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}
function rgbNormalizedToHsv(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error("RGB values must be defined");
  }
  const max = Math.max(rgb.r, rgb.g, rgb.b);
  const min = Math.min(rgb.r, rgb.g, rgb.b);
  let h = max;
  let s = max;
  const v = max;
  const diff = max - min;
  const diffc = c => (max - c) / 6 / diff + 1 / 2;
  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / max;
    const rr = diffc(rgb.r);
    const gg = diffc(rgb.g);
    const bb = diffc(rgb.b);
    if (rgb.r === max) {
      h = rgb.b - rgb.g;
    } else if (rgb.g === max) {
      h = 1 / 3 + rr - bb;
    } else if (rgb.b === max) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}
function hslToRgbNormalized(hsl) {
  var _a, _b, _c;
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  const h = ((_a = hsl.h) !== null && _a !== void 0 ? _a : 0) / 360;
  const s = ((_b = hsl.s) !== null && _b !== void 0 ? _b : 0) / 100;
  const l = ((_c = hsl.l) !== null && _c !== void 0 ? _c : 0) / 100;
  let r;
  let g;
  let b;
  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r,
    g,
    b
  };
}
function hsvToRgbNormalized(hsv) {
  var _a, _b, _c;
  const h = ((_a = hsv.h) !== null && _a !== void 0 ? _a : 0) / 360 * 6;
  const s = ((_b = hsv.s) !== null && _b !== void 0 ? _b : 0) / 100;
  const v = ((_c = hsv.v) !== null && _c !== void 0 ? _c : 0) / 100;
  const i = Math.floor(h);
  const f = h - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  const mod = i % 6;
  const r = [v, q, p, p, t, v][mod];
  const g = [t, v, v, q, p, p][mod];
  const b = [p, p, t, v, v, q][mod];
  return {
    r,
    g,
    b
  };
}
function hexToRgb(hexColor) {
  const hex = expandHex(hexColor);
  const rgb = parseInt(hex.replace("#", ""), 16);
  return {
    r: rgb >> 16 & 0xff,
    g: rgb >> 8 & 0xff,
    b: rgb & 0xff
  };
}
/*
  CMY / CMYK conversions
*/
function rgbNormalizedToCmy(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error("RGB values must be defined");
  }
  return {
    c: 1 - rgb.r,
    m: 1 - rgb.g,
    y: 1 - rgb.b
  };
}
function cmyToCmyk(cmy) {
  if (cmy.c === undefined || cmy.m === undefined || cmy.y === undefined) {
    throw new Error("CMY values must be defined");
  }
  let k = 1;
  if (cmy.c < k) k = cmy.c;
  if (cmy.m < k) k = cmy.m;
  if (cmy.y < k) k = cmy.y;
  if (k === 1) return {
    c: 0,
    m: 0,
    y: 0,
    k: 1
  };
  return {
    c: (cmy.c - k) / (1 - k),
    m: (cmy.m - k) / (1 - k),
    y: (cmy.y - k) / (1 - k),
    k
  };
}
/*
  XYZ, CIE-L*ab, CIE-L*Ch(ab) conversions

  X, Y and Z output refers to a D65/2° standard illuminant.

  Reference white constants are based on the standard illuminant D65:
  https://en.wikipedia.org/wiki/Illuminant_D65

  The following is a list of reference white points for various standard illuminants:
  https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants

  Pass in a custom reference white point if you want to use a different one, e.g.:
  { x: 95.047, y: 100, z: 108.883 } for D65
  { x: 96.422, y: 100, z: 82.521 } for D50
  { x: 100, y: 100, z: 100 } for E
*/
// TODO deprecate XYZ, use modern conversions of lRGB instead
function xyzToLab(xyz) {
  let {
    x,
    y,
    z
  } = xyz;
  if (x === undefined || y === undefined || z === undefined) {
    throw new Error("XYZ values must be defined");
  }
  x /= 95.047;
  y /= 100;
  z /= 108.883;
  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z)
  };
}
function labToLch(lab) {
  if (lab.l === undefined || lab.a === undefined || lab.b === undefined) {
    throw new Error("LAB values must be defined");
  }
  let h = Math.atan2(lab.b, lab.a);
  h > 0 ? h = h / Math.PI * 180 : h = 360 - Math.abs(h) / Math.PI * 180;
  return {
    l: lab.l,
    c: Math.sqrt(lab.a * lab.a + lab.b * lab.b),
    h
  };
}
function lchToLab(lch) {
  if (lch.l === undefined || lch.c === undefined || lch.h === undefined) {
    throw new Error("LCH values must be defined");
  }
  const hr = lch.h * Math.PI / 180;
  return {
    l: lch.l,
    a: Math.cos(hr) * lch.c,
    b: Math.sin(hr) * lch.c
  };
}
function labToXyz(lab, referenceWhite = referenceWhiteConstants) {
  if (lab.l === undefined || lab.a === undefined || lab.b === undefined) {
    throw new Error("LAB values must be defined");
  }
  let y = (lab.l + 16) / 116;
  let x = lab.a / 500 + y;
  let z = y - lab.b / 200;
  const y2 = Math.pow(y, 3);
  const x2 = Math.pow(x, 3);
  const z2 = Math.pow(z, 3);
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
  return {
    x: x * referenceWhite.x,
    y: y * referenceWhite.y,
    z: z * referenceWhite.z
  };
}
function xyzToRgbNormalized(xyz) {
  if (xyz.x === undefined || xyz.y === undefined || xyz.z === undefined) {
    return {
      r: undefined,
      g: undefined,
      b: undefined
    };
  }
  let {
    x,
    y,
    z
  } = xyz;
  x /= 100;
  y /= 100;
  z /= 100;
  const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  const b = x * 0.0557 + y * -0.204 + z * 1.057;
  return {
    r: r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92,
    g: g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92,
    b: b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92
  };
}
function rgbToXyz(rgb) {
  let {
    r,
    g,
    b
  } = rgb;
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error("RGB values must be defined");
  }
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  r *= 100;
  g *= 100;
  b *= 100;
  return {
    x: r * 0.4124 + g * 0.3576 + b * 0.1805,
    y: r * 0.2126 + g * 0.7152 + b * 0.0722,
    z: r * 0.0193 + g * 0.1192 + b * 0.9505
  };
}
function okLabToLinearRbg(oklab) {
  let L = oklab.l / 100 + 0.3963377774 * oklab.a + 0.2158037573 * oklab.b;
  let M = oklab.l / 100 - 0.1055613458 * oklab.a - 0.0638541728 * oklab.b;
  let S = oklab.l / 100 - 0.0894841775 * oklab.a - 1.291485548 * oklab.b;
  L = L * L * L;
  M = M * M * M;
  S = S * S * S;
  return {
    r: 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    g: -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    b: -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S
  };
}
function lRgbToNormalizedRgb(lRgb) {
  const fn = (c = 0) => {
    const abs = Math.abs(c);
    return abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs;
  };
  return {
    r: fn(lRgb.r),
    g: fn(lRgb.g),
    b: fn(lRgb.b)
  };
}
/*
  Other conversions
*/
function findClosestColor(rgb, namedColorsRgb) {
  let minDistance = Infinity;
  let closestColor = "";
  const lab1 = xyzToLab(rgbToXyz(rgb));
  for (const color in namedColorsRgb) {
    const lab2 = xyzToLab(rgbToXyz(namedColorsRgb[color]));
    const distance = labDeltaE(lab1, lab2);
    if (distance < minDistance) {
      closestColor = color;
      minDistance = distance;
    }
  }
  return closestColor;
}

/*
    Big List of Colors
    ------------------
    https://www.w3.org/TR/css-color-4/#named-colors
*/
const namedColors = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '0ff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '00f',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  burntsienna: 'ea7e5d',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '0ff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'f0f',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '663399',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32'
};
const namedColorsRgb = {
  aliceblue: {
    r: 240,
    g: 248,
    b: 255
  },
  antiquewhite: {
    r: 250,
    g: 235,
    b: 215
  },
  aqua: {
    r: 0,
    g: 255,
    b: 255
  },
  aquamarine: {
    r: 127,
    g: 255,
    b: 212
  },
  azure: {
    r: 240,
    g: 255,
    b: 255
  },
  beige: {
    r: 245,
    g: 245,
    b: 220
  },
  bisque: {
    r: 255,
    g: 228,
    b: 196
  },
  black: {
    r: 0,
    g: 0,
    b: 0
  },
  blanchedalmond: {
    r: 255,
    g: 235,
    b: 205
  },
  blue: {
    r: 0,
    g: 0,
    b: 255
  },
  blueviolet: {
    r: 138,
    g: 43,
    b: 226
  },
  brown: {
    r: 165,
    g: 42,
    b: 42
  },
  burlywood: {
    r: 222,
    g: 184,
    b: 135
  },
  burntsienna: {
    r: 234,
    g: 126,
    b: 93
  },
  cadetblue: {
    r: 95,
    g: 158,
    b: 160
  },
  chartreuse: {
    r: 127,
    g: 255,
    b: 0
  },
  chocolate: {
    r: 210,
    g: 105,
    b: 30
  },
  coral: {
    r: 255,
    g: 127,
    b: 80
  },
  cornflowerblue: {
    r: 100,
    g: 149,
    b: 237
  },
  cornsilk: {
    r: 255,
    g: 248,
    b: 220
  },
  crimson: {
    r: 220,
    g: 20,
    b: 60
  },
  cyan: {
    r: 0,
    g: 255,
    b: 255
  },
  darkblue: {
    r: 0,
    g: 0,
    b: 139
  },
  darkcyan: {
    r: 0,
    g: 139,
    b: 139
  },
  darkgoldenrod: {
    r: 184,
    g: 134,
    b: 11
  },
  darkgray: {
    r: 169,
    g: 169,
    b: 169
  },
  darkgreen: {
    r: 0,
    g: 100,
    b: 0
  },
  darkgrey: {
    r: 169,
    g: 169,
    b: 169
  },
  darkkhaki: {
    r: 189,
    g: 183,
    b: 107
  },
  darkmagenta: {
    r: 139,
    g: 0,
    b: 139
  },
  darkolivegreen: {
    r: 85,
    g: 107,
    b: 47
  },
  darkorange: {
    r: 255,
    g: 140,
    b: 0
  },
  darkorchid: {
    r: 153,
    g: 50,
    b: 204
  },
  darkred: {
    r: 139,
    g: 0,
    b: 0
  },
  darksalmon: {
    r: 233,
    g: 150,
    b: 122
  },
  darkseagreen: {
    r: 143,
    g: 188,
    b: 143
  },
  darkslateblue: {
    r: 72,
    g: 61,
    b: 139
  },
  darkslategray: {
    r: 47,
    g: 79,
    b: 79
  },
  darkslategrey: {
    r: 47,
    g: 79,
    b: 79
  },
  darkturquoise: {
    r: 0,
    g: 206,
    b: 209
  },
  darkviolet: {
    r: 148,
    g: 0,
    b: 211
  },
  deeppink: {
    r: 255,
    g: 20,
    b: 147
  },
  deepskyblue: {
    r: 0,
    g: 191,
    b: 255
  },
  dimgray: {
    r: 105,
    g: 105,
    b: 105
  },
  dimgrey: {
    r: 105,
    g: 105,
    b: 105
  },
  dodgerblue: {
    r: 30,
    g: 144,
    b: 255
  },
  firebrick: {
    r: 178,
    g: 34,
    b: 34
  },
  floralwhite: {
    r: 255,
    g: 250,
    b: 240
  },
  forestgreen: {
    r: 34,
    g: 139,
    b: 34
  },
  fuchsia: {
    r: 255,
    g: 0,
    b: 255
  },
  gainsboro: {
    r: 220,
    g: 220,
    b: 220
  },
  ghostwhite: {
    r: 248,
    g: 248,
    b: 255
  },
  gold: {
    r: 255,
    g: 215,
    b: 0
  },
  goldenrod: {
    r: 218,
    g: 165,
    b: 32
  },
  gray: {
    r: 128,
    g: 128,
    b: 128
  },
  green: {
    r: 0,
    g: 128,
    b: 0
  },
  greenyellow: {
    r: 173,
    g: 255,
    b: 47
  },
  grey: {
    r: 128,
    g: 128,
    b: 128
  },
  honeydew: {
    r: 240,
    g: 255,
    b: 240
  },
  hotpink: {
    r: 255,
    g: 105,
    b: 180
  },
  indianred: {
    r: 205,
    g: 92,
    b: 92
  },
  indigo: {
    r: 75,
    g: 0,
    b: 130
  },
  ivory: {
    r: 255,
    g: 255,
    b: 240
  },
  khaki: {
    r: 240,
    g: 230,
    b: 140
  },
  lavender: {
    r: 230,
    g: 230,
    b: 250
  },
  lavenderblush: {
    r: 255,
    g: 240,
    b: 245
  },
  lawngreen: {
    r: 124,
    g: 252,
    b: 0
  },
  lemonchiffon: {
    r: 255,
    g: 250,
    b: 205
  },
  lightblue: {
    r: 173,
    g: 216,
    b: 230
  },
  lightcoral: {
    r: 240,
    g: 128,
    b: 128
  },
  lightcyan: {
    r: 224,
    g: 255,
    b: 255
  },
  lightgoldenrodyellow: {
    r: 250,
    g: 250,
    b: 210
  },
  lightgray: {
    r: 211,
    g: 211,
    b: 211
  },
  lightgreen: {
    r: 144,
    g: 238,
    b: 144
  },
  lightgrey: {
    r: 211,
    g: 211,
    b: 211
  },
  lightpink: {
    r: 255,
    g: 182,
    b: 193
  },
  lightsalmon: {
    r: 255,
    g: 160,
    b: 122
  },
  lightseagreen: {
    r: 32,
    g: 178,
    b: 170
  },
  lightskyblue: {
    r: 135,
    g: 206,
    b: 250
  },
  lightslategray: {
    r: 120,
    g: 128,
    b: 128
  },
  lightslategrey: {
    r: 120,
    g: 128,
    b: 128
  },
  lightsteelblue: {
    r: 176,
    g: 196,
    b: 222
  },
  lightyellow: {
    r: 255,
    g: 255,
    b: 224
  },
  lime: {
    r: 0,
    g: 255,
    b: 0
  },
  limegreen: {
    r: 50,
    g: 205,
    b: 50
  },
  linen: {
    r: 250,
    g: 240,
    b: 230
  },
  magenta: {
    r: 255,
    g: 0,
    b: 255
  },
  maroon: {
    r: 128,
    g: 0,
    b: 0
  },
  mediumaquamarine: {
    r: 102,
    g: 205,
    b: 170
  },
  mediumblue: {
    r: 0,
    g: 0,
    b: 205
  },
  mediumorchid: {
    r: 186,
    g: 85,
    b: 211
  },
  mediumpurple: {
    r: 147,
    g: 112,
    b: 219
  },
  mediumseagreen: {
    r: 60,
    g: 179,
    b: 113
  },
  mediumslateblue: {
    r: 123,
    g: 104,
    b: 238
  },
  mediumspringgreen: {
    r: 0,
    g: 250,
    b: 154
  },
  mediumturquoise: {
    r: 72,
    g: 209,
    b: 204
  },
  mediumvioletred: {
    r: 199,
    g: 21,
    b: 133
  },
  midnightblue: {
    r: 25,
    g: 25,
    b: 112
  },
  mintcream: {
    r: 245,
    g: 255,
    b: 250
  },
  mistyrose: {
    r: 255,
    g: 228,
    b: 225
  },
  moccasin: {
    r: 255,
    g: 228,
    b: 181
  },
  navajowhite: {
    r: 255,
    g: 222,
    b: 173
  },
  navy: {
    r: 0,
    g: 0,
    b: 128
  },
  oldlace: {
    r: 253,
    g: 245,
    b: 230
  },
  olive: {
    r: 128,
    g: 128,
    b: 0
  },
  olivedrab: {
    r: 107,
    g: 142,
    b: 35
  },
  orange: {
    r: 255,
    g: 165,
    b: 0
  },
  orangered: {
    r: 255,
    g: 69,
    b: 0
  },
  orchid: {
    r: 218,
    g: 112,
    b: 214
  },
  palegoldenrod: {
    r: 238,
    g: 232,
    b: 170
  },
  palegreen: {
    r: 152,
    g: 251,
    b: 152
  },
  paleturquoise: {
    r: 175,
    g: 238,
    b: 238
  },
  palevioletred: {
    r: 219,
    g: 112,
    b: 147
  },
  papayawhip: {
    r: 255,
    g: 239,
    b: 213
  },
  peachpuff: {
    r: 255,
    g: 218,
    b: 185
  },
  peru: {
    r: 205,
    g: 133,
    b: 63
  },
  pink: {
    r: 255,
    g: 192,
    b: 203
  },
  plum: {
    r: 221,
    g: 160,
    b: 221
  },
  powderblue: {
    r: 176,
    g: 224,
    b: 230
  },
  purple: {
    r: 128,
    g: 0,
    b: 128
  },
  rebeccapurple: {
    r: 102,
    g: 51,
    b: 153
  },
  red: {
    r: 255,
    g: 0,
    b: 0
  },
  rosybrown: {
    r: 188,
    g: 143,
    b: 143
  },
  royalblue: {
    r: 65,
    g: 105,
    b: 225
  },
  saddlebrown: {
    r: 139,
    g: 69,
    b: 19
  },
  salmon: {
    r: 250,
    g: 128,
    b: 114
  },
  sandybrown: {
    r: 244,
    g: 164,
    b: 96
  },
  seagreen: {
    r: 46,
    g: 139,
    b: 87
  },
  seashell: {
    r: 255,
    g: 245,
    b: 238
  },
  sienna: {
    r: 160,
    g: 82,
    b: 45
  },
  silver: {
    r: 192,
    g: 192,
    b: 192
  },
  skyblue: {
    r: 135,
    g: 206,
    b: 235
  },
  slateblue: {
    r: 106,
    g: 90,
    b: 205
  },
  slategray: {
    r: 112,
    g: 128,
    b: 144
  },
  slategrey: {
    r: 112,
    g: 128,
    b: 144
  },
  snow: {
    r: 255,
    g: 250,
    b: 250
  },
  springgreen: {
    r: 0,
    g: 255,
    b: 127
  },
  steelblue: {
    r: 70,
    g: 130,
    b: 180
  },
  tan: {
    r: 210,
    g: 180,
    b: 140
  },
  teal: {
    r: 0,
    g: 128,
    b: 128
  },
  thistle: {
    r: 216,
    g: 191,
    b: 216
  },
  tomato: {
    r: 255,
    g: 99,
    b: 71
  },
  turquoise: {
    r: 64,
    g: 224,
    b: 208
  },
  violet: {
    r: 238,
    g: 130,
    b: 238
  },
  wheat: {
    r: 245,
    g: 222,
    b: 179
  },
  white: {
    r: 255,
    g: 255,
    b: 255
  },
  whitesmoke: {
    r: 245,
    g: 245,
    b: 245
  },
  yellow: {
    r: 255,
    g: 255,
    b: 0
  },
  yellowgreen: {
    r: 154,
    g: 205,
    b: 50
  }
};

/*
 Given a string or object, convert that input to a ColorObjType

 Example input:
 "red"
 "#f00" or "f00"
 "#ff0000" or "ff0000"
 "#ff000000" or "ff000000"
 "rgb 255 0 0" or "rgb (255, 0, 0)"
 "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 TODO - OKLCH / OKLAB etc.
*/
function inputParser(color) {
  if (color !== undefined) {
    // RGB
    if (/^rgb/.test(color)) {
      const rgbArray = color.match(/\d+/g);
      if (rgbArray != null && rgbArray.length === 3) {
        return {
          format: 'rgb',
          value: {
            r: Number(rgbArray[0]),
            g: Number(rgbArray[1]),
            b: Number(rgbArray[2])
          }
        };
      }
    }
    // RGBA
    if (/^rgba/.test(color)) {
      const rgbaArray = color.match(/\d+(\.\d+)?/g);
      if (rgbaArray != null && rgbaArray.length === 4) {
        return {
          format: 'rgba',
          value: {
            r: Number(rgbaArray[0]),
            g: Number(rgbaArray[1]),
            b: Number(rgbaArray[2]),
            a: Number(rgbaArray[3])
          }
        };
      }
    }
    if (/^[a-z]+$/.test(color) && namedColors[color] !== undefined) {
      return {
        format: 'name',
        value: namedColors[color]
      };
    }
    //   // Hex - 3 or 6 digits
    if (color.replace('#', '').length === 6 || color.replace('#', '').length === 3) {
      return {
        format: 'hex',
        value: color.replace('#', '')
      };
    }
    // HexA
    if (color.replace('#', '').length === 8) {
      return {
        format: 'hexa',
        value: color.replace('#', '')
      };
    }
    // HSL
    if (/^hsl/.test(color)) {
      const hslArray = color.match(/\d+(\.\d+)?%?/g);
      if (hslArray != null && hslArray.length === 3) {
        return {
          format: 'hsl',
          value: {
            h: Number(hslArray[0]),
            s: Number(hslArray[1].replace('%', '')),
            l: Number(hslArray[2].replace('%', ''))
          }
        };
      }
    }
    // HSLA
    if (/^hsla/.test(color)) {
      const hslaArray = color.match(/\d+(\.\d+)?%?/g);
      if (hslaArray != null && hslaArray.length === 4) {
        return {
          format: 'hsla',
          value: {
            h: Number(hslaArray[0]),
            s: Number(hslaArray[1].replace('%', '')),
            l: Number(hslaArray[2].replace('%', '')),
            a: Number(hslaArray[3])
          }
        };
      }
    }
    // HSV
    if (/^hsv/.test(color)) {
      const hsvArray = color.match(/\d+(\.\d+)?%?/g);
      if (hsvArray != null && hsvArray.length === 3) {
        return {
          format: 'hsv',
          value: {
            h: Number(hsvArray[0]),
            s: Number(hsvArray[1].replace('%', '')),
            v: Number(hsvArray[2].replace('%', ''))
          }
        };
      }
    }
    // LCH
    if (/^lch/.test(color)) {
      const lchArray = color.match(/\d+(\.\d+)?%?/g);
      if (lchArray != null && lchArray.length === 3) {
        return {
          format: 'lch',
          value: {
            l: Number(lchArray[0].replace('%', '')),
            c: Number(lchArray[1]),
            h: Number(lchArray[2])
          }
        };
      }
    }
    // OKLCH
    if (/^oklch/.test(color)) {
      const oklchArray = color.match(/\d+(\.\d+)?%?/g);
      if (oklchArray != null && oklchArray.length === 3) {
        return {
          format: 'oklch',
          value: {
            l: Number(oklchArray[0].replace('%', '')),
            c: Number(oklchArray[1]),
            h: Number(oklchArray[2])
          }
        };
      }
    }
  }
  return {
    format: undefined,
    value: undefined
  };
}

/*
    Color Converter
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/
class ColorConverter {
  constructor(colorInput) {
    this._colorInput = colorInput !== null && colorInput !== void 0 ? colorInput : undefined; // string input of any color format
    this._colorObj = inputParser(this._colorInput); // Color info object created from _colorInput. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = toRgbBase(this._colorObj); // RGB normalised values object - 0-1. E.g. { r: 1, g: 0.5, b: 0.8 }
  }
  getInput() {
    var _a;
    return (_a = this._colorInput) !== null && _a !== void 0 ? _a : "";
  }
  getColorObj() {
    return this._colorObj;
  }
  getRgbObj() {
    return this._rgbObj;
  }
  setInput(colorInput) {
    this._colorInput = colorInput;
  }
  setColorObj(colorObj) {
    this._colorObj = colorObj;
  }
  setRbgObj(rgbObj) {
    this._rgbObj = rgbObj;
  }
  setColor(color) {
    this.setInput(color);
    this.setColorObj(inputParser(this.getInput()));
    this.setRbgObj(toRgbBase(this.getColorObj()));
  }
  /**
   * Checks if the parsed color is valid
   * @returns {boolean} - true if the parsed color is valid
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.isValid() // true
   */
  isValid() {
    return this.getColorObj().value !== undefined;
  }
  /**
   * Returns the RGB values in the range 0-255
   * @returns {RgbObject} - RGB values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toRgb() // { r: 255, g: 0, b: 0 }
   */
  toRgb() {
    return rgbNormalizedToRgb(this.getRgbObj());
  }
  /**
   * Returns the RGB values in the range 0-255 as a string
   * @returns {string} - RGB values string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toRgbString() // "rgb(255, 0, 0)"
   */
  toRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.toRgb();
    return `${a !== undefined ? "rgba" : "rgb"}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ""})`;
  }
  toNormalizedRgb() {
    return this.getRgbObj();
  }
  toNormalizedRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.getRgbObj();
    return `${a !== undefined ? "rgba" : "rgb"}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ""})`;
  }
  // TODO implement
  fromRatio() {
    return "not implemented";
  }
  // TODO implement
  fromPercentageRgb() {
    return "not implemented";
  }
  /**
   * Converts the current color to  HSV
   * @returns {HsvObject} - HSV values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsv() // { h: 0, s: 100, v: 100 }
   */
  toHsv() {
    return rgbNormalizedToHsv(this.getRgbObj());
  }
  /**
   * Converts the current color to HSV as a string
   * @returns {string} - HSV values as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsvString() // "hsv(0, 100%, 100%)"
   */
  toHsvString() {
    const {
      h,
      s,
      v
    } = this.toHsv();
    return `hsv(${h}, ${s}%, ${v}%)`;
  }
  /**
   * Converts the current color to HSL
   * @returns {HslObject} - HSL values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHsl() // { h: 0, s: 100, l: 50 }
   */
  toHsl() {
    return rgbNormalizedToHsl(this.getRgbObj());
  }
  /**
   * Converts the current color to HSL as a string
   * @returns {string} - HSL values as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHslString() // "hsl(0, 100%, 50%)"
   */
  toHslString() {
    const {
      h,
      s,
      l
    } = rgbNormalizedToHsl(this.getRgbObj());
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  /**
   * Converts the current color to Hex
   * @returns {string} - Hex value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex() // "ff0000"
   */
  toHex() {
    var _a;
    return (_a = rgbToHex(rgbNormalizedToRgb(this.getRgbObj()))) !== null && _a !== void 0 ? _a : "";
  }
  /**
   * Converts the current color to Hex as a string
   * @returns {string} - Hex value as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex() // "#ff0000"
   */
  toHexString() {
    return `#${this.toHex()}`;
  }
  /**
   * Converts the current color to Hex8
   * @returns {string} - Hex8 value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex8() // "ff0000ff"
   */
  toHex8() {
    const {
      r,
      g,
      b
    } = rgbNormalizedToRgb(this.getRgbObj());
    const a = this.getAlpha();
    return rgbaToHex8({
      r,
      g,
      b,
      a
    });
  }
  /**
   * Converts the current color to Hex8 as a string
   * @returns {string} - Hex8 value as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toHex8String() // "#ff0000ff"
   */
  toHex8String() {
    return `#${this.toHex8()}`;
  }
  /**
   * Converts the current color to CMY
   * @returns {CmykObject} - CMYK values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toCmy() // { c: 0, m: 100, y: 100 }
   */
  toCmy() {
    return rgbNormalizedToCmy(this.getRgbObj());
  }
  /** Converts the current color to CMYK
   * @returns {CmykObject} - CMYK values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toCmyk() // { c: 0, m: 100, y: 100, k: 0 }
   */
  toCmyk() {
    return cmyToCmyk(this.toCmy());
  }
  /*
    XYZ, CIE-L*ab, CIE-L*Ch(ab)
    formulae from https://www.easyrgb.com/en/math.php
       X, Y and Z output refers to a D65/2° standard illuminant.
    */
  /**
   * Converts the current color to XYZ
   * @returns {XyzObject} - XYZ values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toXyz() // { x: 41.24, y: 21.26, z: 1.93 }
   */
  toXyz() {
    return rgbToXyz(this.getRgbObj());
  }
  /**
   * Converts the current color to XYZ as a string
   * @returns {string} - XYZ values as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toXyzString() // "xyz(41.24, 21.26, 1.93)"
   */
  toXyzString() {
    const {
      x,
      y,
      z
    } = this.toXyz();
    return `xyz(${x}, ${y}, ${z})`;
  }
  /**
   * Converts the current color to LAB
   * @returns {LabObject} - LAB values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toLab() // { l: 53.24, a: 80.09, b: 67.20 }
   */
  toLab() {
    return xyzToLab(this.toXyz());
  }
  /**
   * Converts the current color to LAB as a string
   * @returns {string} - LAB values as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toLabString() // "lab(53.24, 80.09, 67.20)"
   */
  toLabString() {
    const {
      l,
      a,
      b
    } = this.toLab();
    return `lab(${l}, ${a}, ${b})`;
  }
  /**
   * Converts the current color to LCH
   * @returns {LchObject} - LCH values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toLch() // { l: 53.24, c: 104.55, h: 40.85 }
   */
  toLch() {
    return labToLch(this.toLab());
  }
  /**
   * Converts the current color to LCH as a string
   * @returns {string} - LCH values as a string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toLchString() // "lch(53.24, 104.55, 40.85)"
   */
  toLchString() {
    const {
      l,
      c,
      h
    } = this.toLch();
    return `lch(${l}, ${c}, ${h})`;
  }
  /**
   * Returns the brightness of the current color
   * @returns {number} - Brightness value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.getBrightness() // 76.245
   */
  getBrightness() {
    return calculateBrightness(rgbNormalizedToRgb(this.getRgbObj()));
  }
  /**
   * Returns the luminance of the current color
   * @returns {number} - Luminance value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.getLuminance() // 0.2126
   */
  getLuminance() {
    return calculateLuminance(this.getRgbObj());
  }
  /**
   * Returns true if the current color is dark
   * @returns {boolean} - true if the current color is dark
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.isDark() // true
   */
  isDark() {
    return this.getBrightness() < 128;
  }
  /**
   * Returns true if the current color is light
   * @returns {boolean} - true if the current color is light
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.isLight() // false
   */
  isLight() {
    return this.getBrightness() >= 128;
  }
  /**
   * Returns the format of the current color
   * @returns {string} - Color format
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('#ff0000')
   * color.getFormat() // "hex"
   */
  getFormat() {
    return this.getColorObj().format;
  }
  /**
   * Returns the alpha value of the current color
   * @returns {number} - Alpha value
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.getAlpha() // 1
   */
  getAlpha() {
    let {
      a
    } = this.getRgbObj();
    a = a !== null && a !== void 0 ? a : 1; // 100% alpha if working with rgb values
    return a;
  }
  /**
   * Sets the alpha value of the current color
   * @param {number} newAlpha - Alpha value
   * @returns {void}
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.setAlpha(0.5)
   * color.getAlpha() // 0.5
   */
  setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error("Alpha value must be between 0 and 1");
    }
    const {
      r,
      g,
      b
    } = this.getRgbObj();
    const a = newAlpha;
    this.setRbgObj({
      r,
      g,
      b,
      a
    });
  }
  /**
   * Returns a matching named CSS color if one exists
   * @returns {string} - color name
   * @memberof ColorConverter
   * @link https://www.w3.org/TR/css-color-4/#named-colors
   * @example
   * const color = new ColorConvertor("hsl(0, 100%, 50%)")
   * color.toName() // "red"
   */
  toName() {
    const hex = truncateHex(this.toHex());
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color;
      }
    }
    return undefined;
  }
  /**
   * Returns the closest named CSS color
   * @returns {string} - color name
   * @memberof ColorConverter
   * @link https://www.w3.org/TR/css-color-4/#named-colors
   * @example
   * const color = new ColorConvertor("hsl(0, 92%, 48%)")
   * color.toNearestNamedColor() // "red"
   */
  toNearestNamedColor() {
    const rgb = rgbNormalizedToRgb(this.getRgbObj());
    return findClosestColor(rgb, namedColorsRgb);
  }
  /**
   * Returns the RGB values in the range 0-100
   * @returns {RgbObject} - RGB values object
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toPercentageRgb() // { r: 100, g: 0, b: 0 }
   */
  toPercentageRgb() {
    const {
      r,
      g,
      b,
      a
    } = this.getRgbObj();
    return {
      r: r !== undefined ? r * 100 : undefined,
      g: g !== undefined ? g * 100 : undefined,
      b: b !== undefined ? b * 100 : undefined,
      a: a !== undefined ? this.getAlpha() : undefined
    };
  }
  /**
   * Returns the RGB values in the range 0-100% as a string
   * @returns {string} - RGB values string
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor('red')
   * color.toPercentageRgbString() // "rgb(100%, 0%, 0%)"
   */
  toPercentageRgbString() {
    const {
      r,
      g,
      b,
      a
    } = this.toPercentageRgb();
    return `${a !== undefined ? "rgba" : "rgb"}(${r}%, ${g}%, ${b}%${a !== undefined ? `, ${a}` : ""})`;
  }
  /**
   * Checks if the current color is equal to the color passed as an argument
   * @param color2
   * @returns {boolean} - true if the current color is equal to the color passed as an argument
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor("red")
   * color.equals("#ff0000") // true
   * color.equals("hsl(0, 100%, 50%)") // true
   */
  equals(color2) {
    return this.toRgbString() === new ColorConverter(color2).toRgbString();
  }
  /**
   * Returns a random color in sRGB color space
   * @returns {void}
   * @memberof ColorConverter
   * @remarks Will overwrite the current color
   */
  random() {
    this.setColorObj({
      format: "rgb",
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    });
    this.setRbgObj(toRgbBase(this.getColorObj()));
  }
  /**
   * Returns a clone of the current color instance
   * @returns {ColorConverter} - ColorConvertor instance
   * @memberof ColorConverter
   * @example
   * const color = new ColorConvertor("red")
   * const color2 = color.clone()
   * color2.toRgbString() // "rgb(255, 0, 0)"
   */
  clone() {
    return new ColorConverter(this.getInput());
  }
  /**
   * Returns the contrast ratio between the current color and the color passed as an argument
   * @param color2 - The color to compare the current color to
   * @returns {number} - The contrast ratio between the current color and the color passed as an argument
   * @memberof ColorConverter
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   */
  readability(color2) {
    const l1 = this.getLuminance();
    const l2 = new ColorConverter(color2).getLuminance();
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  /**
   * Returns whether WCAG2 guidelines say that the current color is readable on the color passed as an argument
   * @param color2 - The color to compare the current color to
   * @returns {Record<string, Record<string, boolean>>} - Object containing the results of the readability tests
   * @memberof ColorConverter
   * @link http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
   * @example
   * const color = new ColorConvertor("red")
   * color.isReadable("#ffffff")
   * // { AA: { large: true, normal: true, small: true }, AAA: { large: true, normal: true, small: true } }
   */
  isReadable(color2) {
    const readability = this.readability(color2);
    return {
      AA: {
        large: readability >= 3,
        normal: readability >= 4.5,
        small: readability >= 7
      },
      AAA: {
        large: readability >= 4.5,
        normal: readability >= 7,
        small: readability >= 7
      }
    };
  }
}

export { ColorConverter as default };
//# sourceMappingURL=colorconverter.esm.js.map
