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
      TODO - LCH / OKLCH / LAB / OKLAB / XYZ / etc.
*/

function inputParser(color) {
  // TODO deal with object being passed in
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
  // todo throw error if rgb is not valid
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
function rgbaToHexA(rgba) {
  const binaryRgb = rgbToHex({
    r: rgba.r,
    g: rgba.g,
    b: rgba.b
  });
  const aHex = convertDecimalToHex(rgba.a ?? 1);
  return `${binaryRgb.padStart(6, '0')}${aHex === '0' ? '00' : aHex}`;
}
function hexToRgb(hex) {
  const rgb = parseInt(hex.replace('#', ''), 16);
  return {
    r: rgb >> 16 & 0xff,
    g: rgb >> 8 & 0xff,
    b: rgb & 0xff
  };
}

function calculateBrightness(rgb) {
  const {
    r,
    g,
    b
  } = rgb;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// TODO this is a long calculation, can we make it more efficient?
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
function truncateHex(hex) {
  if (hex.length === 6) {
    if (hex[2] === hex[3] && hex[4] === hex[5]) {
      return hex[0] + hex[1] + hex[2];
    }
  }
  return hex;
}

/*
    Color Convertor
    Owen Rees, MIT License, 2024

    based on https://github.com/bgrins/TinyColor
*/

function ColorConvertor(colorInput) {
  this._colorInput = colorInput; // string input of any color format
  this._colorObj = inputParser(this._colorInput); // Color info object. E.g. { format: 'hex', value: '#ffffff' }
  this._rgbObj = toRgbBase(this._colorObj); // RGB color info object. E.g. { format: 'rgb', value: { r: 255, g: 255, b: 255 }
}
ColorConvertor.prototype = {
  getInput() {
    return this._colorObj;
  },
  isValid() {
    return this._colorObj.value !== undefined;
  },
  toRgb() {
    return toRgbBase(this.getInput());
  },
  toRgbString() {
    const {
      format,
      value: {
        r,
        g,
        b,
        a
      }
    } = this._rgbObj;
    return `${format}(${r}, ${g}, ${b}${a !== undefined ? `, ${a}` : ''})`;
  },
  toHsv() {
    return rgbToHsv(this._rgbObj.value);
  },
  toHsvString() {
    const {
      h,
      s,
      v
    } = rgbToHsv(this._rgbObj.value);
    return `hsv(${h}, ${s}%, ${v}%)`;
  },
  toHsl() {
    return rgbToHsl(this._rgbObj.value);
  },
  toHslString() {
    const {
      h,
      s,
      l
    } = rgbToHsl(this._rgbObj.value);
    return `hsl(${h}, ${s}%, ${l}%)`;
  },
  toHex() {
    return rgbToHex(this._rgbObj.value);
  },
  toHexString() {
    return `#${this.toHex()}`;
  },
  toHexA() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    const a = this.getAlpha();
    return rgbaToHexA({
      r,
      g,
      b,
      a
    });
  },
  toHexAString() {
    return `#${this.toHexA()}`;
  },
  getBrightness() {
    return calculateBrightness(this._rgbObj.value);
  },
  getLuminance() {
    return calculateLuminance(this._rgbObj.value);
  },
  isDark() {
    return this.getBrightness() < 128;
  },
  isLight() {
    return this.getBrightness() >= 128;
  },
  getFormat() {
    return this._rgbObj.format;
  },
  getAlpha() {
    let {
      a
    } = this._rgbObj.value;
    a = a === undefined ? 1 : a; // 100% alpha if working with rgb values
    return a;
  },
  setAlpha(newAlpha) {
    if (newAlpha < 0 || newAlpha > 1) {
      throw new Error('Alpha value must be between 0 and 1');
    }
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    const a = newAlpha;
    this._rgbObj.value = {
      r,
      g,
      b,
      a
    };
    return this._rgbObj;
  },
  toNormalizedRgb() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255
    };
  },
  toNormalizedRgba() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    const a = this.getAlpha();
    return {
      r: r / 255,
      g: g / 255,
      b: b / 255,
      a
    };
  },
  toName() {
    const hex = truncateHex(this.toHex());
    for (const color in namedColors) {
      if (namedColors[color] === hex) {
        return color;
      }
    }
    return undefined;
  },
  // toNearestNamedColor () {
  //   return 'not implemented'
  // },
  // toNearestWebSafeColor () {
  //   return 'not implemented'
  // },
  toPercentageRgb() {
    const {
      r,
      g,
      b
    } = this._rgbObj.value;
    return {
      r: r / 255 * 100,
      g: g / 255 * 100,
      b: b / 255 * 100
    };
  },
  toPercentageRgbString() {
    const {
      r,
      g,
      b
    } = this.toPercentageRgb();
    return `rgb(${r}%, ${g}%, ${b}%)`;
  }
};

export { ColorConvertor as default };
//# sourceMappingURL=bundle.esm.js.map
