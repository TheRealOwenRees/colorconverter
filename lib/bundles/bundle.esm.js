/*
    Big List of Colors
    ------------------
    <https://www.w3.org/TR/css-color-4/#named-colors>
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
  Given a string or object, convert that input to an object with the following properties:
    format: string
    value: string

  Possible string inputs:
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
  if (color === undefined) {
    return {
      format: undefined,
      value: undefined
    };
  }
  if (/^[a-z]+$/.test(color) && namedColors[color] !== undefined) {
    return {
      format: 'name',
      value: namedColors[color]
    };
  }

  // Hex - 3 or 6 digits
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

  // default return
  return {
    format: undefined,
    value: undefined
  };
}

function convertDecimalToHex(d) {
  return Math.round(d * 255).toString(16);
}
function calculateBrightness(rgb) {
  const {
    r,
    g,
    b
  } = rgb;
  return (r * 299 + g * 587 + b * 114) / 1000;
}
function calculateLuminance(rgb) {
  // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
  const {
    r,
    g,
    b
  } = rgb;
  let R, G, B;
  const RsRGB = r / 255;
  const GsRGB = g / 255;
  const BsRGB = b / 255;
  if (RsRGB <= 0.03928) R = RsRGB / 12.92;else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  if (GsRGB <= 0.03928) G = GsRGB / 12.92;else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  if (BsRGB <= 0.03928) B = BsRGB / 12.92;else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// e.g. turn #ffffff into #fff
function truncateHex(hex) {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2];
    }
  }
  return hex;
}

// e.g. turn #fff into #ffffff
function expandHex(hex) {
  if (hex.length === 3) {
    return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2];
  }
  return hex;
}
function labEuclideanDistance(lab1, lab2) {
  return Math.sqrt(Math.pow(lab1.l - lab2.l, 2) + Math.pow(lab1.a - lab2.a, 2) + Math.pow(lab1.b - lab1.b, 2));
}
function findClosestColor(rgb, namedColorsRgb) {
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

/*
    Based on the following gist:
    https://gist.github.com/avisek/eadfbe7a7a169b1001a2d3affc21052e
*/


// any color type to rgb
function toRgbBase(colorObj) {
  if (colorObj.format === 'rgb' || colorObj.format === 'rgba') {
    return colorObj;
  }
  if (colorObj.format === 'hex' && typeof colorObj.value === 'string') {
    return {
      format: 'rgb',
      value: hexToRgb(colorObj.value)
    };
  }
  if (colorObj.format === 'hsl') {
    return {
      format: 'rgb',
      value: hslToRgb(colorObj.value)
    };
  }
  if (colorObj.format === 'hsv') {
    return {
      format: 'rgb',
      value: hsvToRgb(colorObj.value)
    };
  }
  return {
    format: undefined,
    value: undefined
  };
}

// TODO HSLA to RGBA and add to toRgbBase as well, returning RGBA

function rgbToHsl(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
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
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: s * 100,
    l: l * 100
  };
}
function hslToRgb(hsl) {
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
  const h = (hsl.h ?? 0) / 360;
  const s = (hsl.s ?? 0) / 100;
  const l = (hsl.l ?? 0) / 100;
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
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function rgbToHsv(rgb) {
  if (rgb === undefined) {
    return {
      h: undefined,
      s: undefined,
      v: undefined
    };
  }
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
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
    const rr = diffc(r);
    const gg = diffc(g);
    const bb = diffc(b);
    if (r === max) {
      h = b - g;
    } else if (g === max) {
      h = 1 / 3 + rr - bb;
    } else if (b === max) {
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
    s: s * 100,
    v: v * 100
  };
}
function hsvToRgb(hsv) {
  const h = (hsv.h ?? 0) / 360 * 6;
  const s = (hsv.s ?? 0) / 100;
  const v = (hsv.v ?? 0) / 100;
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
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function rgbToHex(rgb) {
  const binaryRgb = rgb.r << 16 | rgb.g << 8 | rgb.b;
  return binaryRgb.toString(16).padStart(6, '0');
}
function rgbaToHex8(rgba) {
  const binaryRgb = rgbToHex({
    r: rgba.r,
    g: rgba.g,
    b: rgba.b
  });
  const aHex = convertDecimalToHex(rgba.a ?? 1);
  return `${binaryRgb.padStart(6, '0')}${aHex === '0' ? '00' : aHex}`;
}
function hexToRgb(hexInput) {
  const hex = expandHex(hexInput);
  const rgb = parseInt(hex.replace('#', ''), 16);
  return {
    r: rgb >> 16 & 0xff,
    g: rgb >> 8 & 0xff,
    b: rgb & 0xff
  };
}
function rgbToXyz(rgb) {
  let {
    r,
    g,
    b
  } = rgb;
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
function xyzToLab(xyz) {
  let {
    x,
    y,
    z
  } = xyz;
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
  const {
    l,
    a,
    b
  } = lab;
  let h = Math.atan2(b, a);
  h > 0 ? h = h / Math.PI * 180 : h = 360 - Math.abs(h) / Math.PI * 180;
  return {
    l,
    c: Math.sqrt(a * a + b * b),
    h
  };
}
function rgbToCmy(rgb) {
  const {
    r,
    g,
    b
  } = rgb;
  return {
    c: 1 - r / 255,
    m: 1 - g / 255,
    y: 1 - b / 255
  };
}
function cmyToCmyk(cmy) {
  const {
    c,
    m,
    y
  } = cmy;
  let k = 1;
  if (c < k) k = c;
  if (m < k) k = m;
  if (y < k) k = y;
  if (k === 1) return {
    c: 0,
    m: 0,
    y: 0,
    k: 1
  };
  return {
    c: (c - k) / (1 - k),
    m: (m - k) / (1 - k),
    y: (y - k) / (1 - k),
    k
  };
}

/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

class ColorConvertor {
  constructor(colorInput) {
    this._colorInput = colorInput ?? undefined; // string input of any color format
    this._colorObj = inputParser(this._colorInput); // Color info object. E.g. { format: 'hex', value: '#ffffff' }
    this._rgbObj = toRgbBase(this._colorObj); // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
  }

  /*
    General Methods
  */
  getInput() {
    return this._colorInput ?? '';
  }
  getColorObj() {
    return this._colorObj;
  }
  getRgbObj() {
    return this._rgbObj;
  }
  isValid() {
    return this.getColorObj().value !== undefined;
  }
  setColor(color) {
    this._colorInput = color;
    this._colorObj = inputParser(this.getInput());
    this._rgbObj = toRgbBase(this.getColorObj());
  }

  // fromRatio () {
  //   return 'not implemented'
  // },

  toRgb() {
    return toRgbBase(this.getColorObj());
  }
  toRgbString() {
    const {
      format,
      value
    } = this.getRgbObj();
    const {
      r,
      g,
      b,
      a
    } = value;
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`;
  }
  toHsv() {
    return rgbToHsv(this.getRgbObj().value);
  }
  toHsvString() {
    const {
      h,
      s,
      v
    } = rgbToHsv(this.getRgbObj().value);
    return `hsv(${h}, ${s}%, ${v}%)`;
  }
  toHsl() {
    return rgbToHsl(this.getRgbObj().value);
  }
  toHslString() {
    const {
      h,
      s,
      l
    } = rgbToHsl(this.getRgbObj().value);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  toHex() {
    return rgbToHex(this.getRgbObj().value);
  }
  toHexString() {
    return `#${this.toHex()}`;
  }
  toHex8() {
    const {
      r,
      g,
      b
    } = this.getRgbObj().value;
    const a = this.getAlpha();
    return rgbaToHex8({
      r,
      g,
      b,
      a
    });
  }
  toHex8String() {
    return `#${this.toHex8()}`;
  }
  toCmy() {
    return rgbToCmy(this.getRgbObj().value);
  }
  toCmyk() {
    return cmyToCmyk(this.toCmy());
  }

  /*
    XYZ, CIE-L*ab, CIE-L*Ch(ab)
    formulae from https://www.easyrgb.com/en/math.php
  */

  // X, Y and Z output refers to a D65/2° standard illuminant.
  toXyz() {
    return rgbToXyz(this.toNormalizedRgb());
  }
  toXyzString() {
    const {
      x,
      y,
      z
    } = this.toXyz();
    return `xyz(${x}, ${y}, ${z})`;
  }

  // CIE-L*ab
  toLab() {
    return xyzToLab(this.toXyz());
  }
  toLabString() {
    const {
      l,
      a,
      b
    } = this.toLab();
    return `lab(${l}, ${a}, ${b})`;
  }
  toLch() {
    return labToLch(this.toLab());
  }
  toLchString() {
    const {
      l,
      c,
      h
    } = this.toLch();
    return `lch(${l}, ${c}, ${h})`;
  }
  getBrightness() {
    return calculateBrightness(this.getRgbObj().value);
  }
  getLuminance() {
    return calculateLuminance(this.getRgbObj().value);
  }
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  getFormat() {
    return this.getColorObj().format;
  }
  getAlpha() {
    let {
      a
    } = this.getRgbObj().value;
    a = a ?? 1; // 100% alpha if working with rgb values
    return a;
  }
  setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
    }
    const {
      r,
      g,
      b
    } = this.getRgbObj().value;
    const a = newAlpha;
    this.getRgbObj().value = {
      r,
      g,
      b,
      a
    };
  }
  toNormalizedRgb() {
    const {
      r,
      g,
      b
    } = this.getRgbObj().value;
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255
    };
  }
  toNormalizedRgba() {
    const {
      r,
      g,
      b
    } = this.getRgbObj().value;
    const a = this.getAlpha();
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a
    };
  }
  toName() {
    const hex = truncateHex(this.toHex());
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color;
      }
    }
    return undefined;
  }
  toNearestNamedColor() {
    const rgb = this.getRgbObj().value;
    return findClosestColor(rgb, namedColorsRgb);
  }
  toPercentageRgb() {
    const {
      r,
      g,
      b
    } = this.getRgbObj().value;
    return {
      r: r / 255 * 100,
      g: g / 255 * 100,
      b: b / 255 * 100
    };
  }
  toPercentageRgbString() {
    const {
      r,
      g,
      b
    } = this.toPercentageRgb();
    return `rgb(${r}%, ${g}%, ${b}%)`;
  }
  equals(color2) {
    const {
      r,
      g,
      b
    } = this.getRgbObj().value;
    const color2RgbObj = toRgbBase(inputParser(color2)).value;
    return color2RgbObj.r === r && color2RgbObj.g === g && color2RgbObj.b === b;
  }
  random() {
    this._rgbObj = {
      format: 'rgb',
      value: {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256)
      }
    };
    return this._rgbObj;
  }
  clone() {
    return new ColorConvertor(this.getInput());
  }

  /*
    Readability Methods
      <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
  */

  // Analyze the 2 colors and returns the color contrast defined by WCAG Version 2
  readability(color2) {
    const l1 = this.getLuminance();
    const l2 = new ColorConvertor(color2).getLuminance();
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }

  // isReadable (color2: string) {
  //   const readability = this.readability(color2)
  //   console.log(readability)
  // }

  // Combination Methods

  // Utility Methods
}

export { ColorConvertor as default };
//# sourceMappingURL=bundle.esm.js.map
