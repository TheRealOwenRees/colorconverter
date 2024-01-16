"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmyToCmyk = cmyToCmyk;
exports.hexToRgb = hexToRgb;
exports.hslToRgbNormalized = hslToRgbNormalized;
exports.hsvToRgbNormalized = hsvToRgbNormalized;
exports.lRgbToNormalizedRgb = lRgbToNormalizedRgb;
exports.labToLch = labToLch;
exports.labToXyz = labToXyz;
exports.lchToLab = lchToLab;
exports.lrgbToRgb = lrgbToRgb;
exports.okLabToLinearRbg = okLabToLinearRbg;
exports.okLabToXyz = okLabToXyz;
exports.rgbNormalizedToCmy = rgbNormalizedToCmy;
exports.rgbNormalizedToHsl = rgbNormalizedToHsl;
exports.rgbNormalizedToHsv = rgbNormalizedToHsv;
exports.rgbNormalizedToRgb = rgbNormalizedToRgb;
exports.rgbNormalizedToRgbPercent = rgbNormalizedToRgbPercent;
exports.rgbToHex = rgbToHex;
exports.rgbToNormalizedRgb = rgbToNormalizedRgb;
exports.rgbToXyz = rgbToXyz;
exports.rgbaToHex8 = rgbaToHex8;
exports.toRgbBase = toRgbBase;
exports.xyzToLab = xyzToLab;
exports.xyzToOklab = xyzToOklab;
exports.xyzToRgbNormalized = xyzToRgbNormalized;
var _utilities = require("./utilities");
/*
  Color conversion functions. 'Normalized' means 0-1 range.
  Formulae from https://www.easyrgb.com/en/math.php
*/

var referenceWhiteConstants = {
  x: 95.047,
  y: 100,
  z: 108.883
};

/*
   RGB / RGBA conversions
*/

function toRgbBase(colorObj) {
  if (colorObj.format === 'rgb' || colorObj.format === 'rgba') {
    return rgbToNormalizedRgb(colorObj.value);
  }
  if (colorObj.format === 'hex' && typeof colorObj.value === 'string') {
    return rgbToNormalizedRgb(hexToRgb(colorObj.value));
  }
  if (colorObj.format === 'hsl') {
    return hslToRgbNormalized(colorObj.value);
  }
  if (colorObj.format === 'hsv') {
    return hsvToRgbNormalized(colorObj.value);
  }
  if (colorObj.format === 'lch') {
    var lab = lchToLab(colorObj.value);
    var xyz = labToXyz(lab);
    return xyzToRgbNormalized(xyz);
  }
  if (colorObj.format === 'oklch') {
    var oklab = lchToLab(colorObj.value);
    var lRGB = okLabToLinearRbg(oklab);
    return lRgbToNormalizedRgb(lRGB);
  }
  return {
    r: undefined,
    g: undefined,
    b: undefined,
    a: undefined
  };
}
function rgbNormalizedToRgb(rgb) {
  var _rgb$a;
  return {
    r: rgb.r !== undefined ? Math.round(rgb.r * 255) : undefined,
    g: rgb.g !== undefined ? Math.round(rgb.g * 255) : undefined,
    b: rgb.b !== undefined ? Math.round(rgb.b * 255) : undefined,
    a: (_rgb$a = rgb.a) !== null && _rgb$a !== void 0 ? _rgb$a : undefined
  };
}
function rgbNormalizedToRgbPercent(rgb) {
  var _rgb$a2;
  return {
    r: rgb.r !== undefined ? Math.round(rgb.r * 100) : undefined,
    g: rgb.g !== undefined ? Math.round(rgb.g * 100) : undefined,
    b: rgb.b !== undefined ? Math.round(rgb.b * 100) : undefined,
    a: (_rgb$a2 = rgb.a) !== null && _rgb$a2 !== void 0 ? _rgb$a2 : undefined
  };
}
function rgbToNormalizedRgb(rgb) {
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b,
    a = rgb.a;
  return {
    r: r !== undefined ? r / 255 : undefined,
    g: g !== undefined ? g / 255 : undefined,
    b: b !== undefined ? b / 255 : undefined,
    a: a !== null && a !== void 0 ? a : undefined
  };
}
function lrgbToRgb(lrgb) {
  var _lrgb$a;
  if (lrgb.r === undefined || lrgb.g === undefined || lrgb.b === undefined) {
    throw new Error('RGB values must be defined');
  }
  var fn = function fn() {
    var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var abs = Math.abs(c);
    return abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs;
  };
  return {
    r: fn(lrgb.r),
    g: fn(lrgb.g),
    b: fn(lrgb.b),
    a: (_lrgb$a = lrgb.a) !== null && _lrgb$a !== void 0 ? _lrgb$a : undefined
  };
}

/*
  Hex / Hex8 conversions
*/

function rgbToHex(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    return undefined;
  }
  var binaryRgb = rgb.r << 16 | rgb.g << 8 | rgb.b;
  return binaryRgb.toString(16).padStart(6, '0');
}
function rgbaToHex8(rgba) {
  var _rgba$a;
  var binaryRgb = rgbToHex(rgba);
  if (binaryRgb === undefined) {
    return '';
  }
  var aHex = (0, _utilities.convertDecimalToHex)((_rgba$a = rgba.a) !== null && _rgba$a !== void 0 ? _rgba$a : 1);
  return "".concat(binaryRgb.padStart(6, '0')).concat(aHex === '0' ? '00' : aHex);
}

/*
    HSL / HSV conversions
*/

function rgbNormalizedToHsl(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    throw new Error('RGB values must be defined');
  }
  var max = Math.max(rgb.r, rgb.g, rgb.b);
  var min = Math.min(rgb.r, rgb.g, rgb.b);
  var h = (max + min) / 2;
  var s;
  var l = (max + min) / 2;
  if (max === min) {
    h = 0;
    s = 0; // Achromatic
  } else {
    var diff = max - min;
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
      default:
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
    throw new Error('RGB values must be defined');
  }
  var max = Math.max(rgb.r, rgb.g, rgb.b);
  var min = Math.min(rgb.r, rgb.g, rgb.b);
  var h = max;
  var s = max;
  var v = max;
  var diff = max - min;
  var diffc = function diffc(c) {
    return (max - c) / 6 / diff + 1 / 2;
  };
  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / max;
    var rr = diffc(rgb.r);
    var gg = diffc(rgb.g);
    var bb = diffc(rgb.b);
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
  var _hsl$h, _hsl$s, _hsl$l;
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
  var h = ((_hsl$h = hsl.h) !== null && _hsl$h !== void 0 ? _hsl$h : 0) / 360;
  var s = ((_hsl$s = hsl.s) !== null && _hsl$s !== void 0 ? _hsl$s : 0) / 100;
  var l = ((_hsl$l = hsl.l) !== null && _hsl$l !== void 0 ? _hsl$l : 0) / 100;
  var r;
  var g;
  var b;
  if (s === 0) {
    r = g = b = l; // Achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r,
    g: g,
    b: b
  };
}
function hsvToRgbNormalized(hsv) {
  var _hsv$h, _hsv$s, _hsv$v;
  var h = ((_hsv$h = hsv.h) !== null && _hsv$h !== void 0 ? _hsv$h : 0) / 360 * 6;
  var s = ((_hsv$s = hsv.s) !== null && _hsv$s !== void 0 ? _hsv$s : 0) / 100;
  var v = ((_hsv$v = hsv.v) !== null && _hsv$v !== void 0 ? _hsv$v : 0) / 100;
  var i = Math.floor(h);
  var f = h - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q, p, p, t, v][mod];
  var g = [t, v, v, q, p, p][mod];
  var b = [p, p, t, v, v, q][mod];
  return {
    r: r,
    g: g,
    b: b
  };
}
function hexToRgb(hexColor) {
  var hex = (0, _utilities.expandHex)(hexColor);
  var rgb = parseInt(hex.replace('#', ''), 16);
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
    throw new Error('RGB values must be defined');
  }
  return {
    c: 1 - rgb.r,
    m: 1 - rgb.g,
    y: 1 - rgb.b
  };
}
function cmyToCmyk(cmy) {
  if (cmy.c === undefined || cmy.m === undefined || cmy.y === undefined) {
    throw new Error('CMY values must be defined');
  }
  var k = 1;
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
    k: k
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
  var x = xyz.x,
    y = xyz.y,
    z = xyz.z;
  if (x === undefined || y === undefined || z === undefined) {
    throw new Error('XYZ values must be defined');
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
    throw new Error('LAB values must be defined');
  }
  var h = Math.atan2(lab.b, lab.a);
  h > 0 ? h = h / Math.PI * 180 : h = 360 - Math.abs(h) / Math.PI * 180;
  return {
    l: lab.l,
    c: Math.sqrt(lab.a * lab.a + lab.b * lab.b),
    h: h
  };
}
function lchToLab(lch) {
  if (lch.l === undefined || lch.c === undefined || lch.h === undefined) {
    throw new Error('LCH values must be defined');
  }
  var hr = lch.h * Math.PI / 180;
  return {
    l: lch.l,
    a: Math.cos(hr) * lch.c,
    b: Math.sin(hr) * lch.c
  };
}
function labToXyz(lab) {
  var referenceWhite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : referenceWhiteConstants;
  if (lab.l === undefined || lab.a === undefined || lab.b === undefined) {
    throw new Error('LAB values must be defined');
  }
  var y = (lab.l + 16) / 116;
  var x = lab.a / 500 + y;
  var z = y - lab.b / 200;
  var y2 = Math.pow(y, 3);
  var x2 = Math.pow(x, 3);
  var z2 = Math.pow(z, 3);
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
  var x = xyz.x,
    y = xyz.y,
    z = xyz.z;
  x /= 100;
  y /= 100;
  z /= 100;
  var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  var b = x * 0.0557 + y * -0.2040 + z * 1.0570;
  return {
    r: r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : r * 12.92,
    g: g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : g * 12.92,
    b: b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : b * 12.92
  };
}
function rgbToXyz(rgb) {
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error('RGB values must be defined');
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

/*
  OKLAB <- -> XYZ conversions
  Formula from https://bottosson.github.io/posts/oklab/

  OKLAB uses a D65/10° standard illuminant.

  OKLCH uses the same conversion as LCH, but with the OKLAB color space.
*/

var M1 = [[0.8189330101, 0.3618667424, -0.1288597137], [0.0329845436, 0.9293118715, 0.0361456387], [0.0482003018, 0.2643662691, 0.6338517070]];
var M2 = [[0.2104542553, 0.7936177850, -0.0040720468], [1.9779984951, -2.4285922050, 0.4505937099], [0.0259040371, 0.7827717662, -0.8086757660]];
var invM1 = [[1.2270138511035211, -0.5577999806518222, 0.28125614896646783], [-0.04058017842328059, 1.1122568696168302, -0.07167667866560119], [-0.0763812845057069, -0.4214819784180127, 1.586163220440795]];
var invM2 = [[0.9999999984505199, 0.3963377921737679, 0.21580375806075883], [1.0000000088817609, -0.10556134232365635, -0.0638541747717059], [1.000000054672411, -0.08948418209496577, -1.291485537864092]];
function xyzToOklab(xyz) {
  if (xyz.x === undefined || xyz.y === undefined || xyz.z === undefined) {
    throw new Error('XYZ values must be defined');
  }
  var L = Math.cbrt(xyz.x * M1[0][0] + xyz.y * M1[0][1] + xyz.z * M1[0][2]);
  var M = Math.cbrt(xyz.x * M1[1][0] + xyz.y * M1[1][1] + xyz.z * M1[1][2]);
  var S = Math.cbrt(xyz.x * M1[2][0] + xyz.y * M1[2][1] + xyz.z * M1[2][2]);
  return {
    l: M2[0][0] * L + M2[0][1] * M + M2[0][2] * S,
    a: M2[1][0] * L + M2[1][1] * M + M2[1][2] * S,
    b: M2[2][0] * L + M2[2][1] * M + M2[2][2] * S
  };
}

// TODO giving largely inflated numbers
function okLabToXyz(oklab) {
  if (oklab.l === undefined || oklab.a === undefined || oklab.b === undefined) {
    throw new Error('OKLAB values must be defined');
  }
  var L = Math.pow(oklab.l * invM2[0][0] + oklab.a * invM2[0][1] + oklab.b * invM2[0][2], 3);
  var M = Math.pow(oklab.l * invM2[1][0] + oklab.a * invM2[1][1] + oklab.b * invM2[1][2], 3);
  var S = Math.pow(oklab.l * invM2[2][0] + oklab.a * invM2[2][1] + oklab.b * invM2[2][2], 3);
  return {
    x: L * invM1[0][0] + M * invM1[0][1] + S * invM1[0][2],
    y: L * invM1[1][0] + M * invM1[1][1] + S * invM1[1][2],
    z: L * invM1[2][0] + M * invM1[2][1] + S * invM1[2][2]
  };
}
function okLabToLinearRbg(oklab) {
  var L = oklab.l / 100 + 0.3963377774 * oklab.a + 0.2158037573 * oklab.b;
  var M = oklab.l / 100 - 0.1055613458 * oklab.a - 0.0638541728 * oklab.b;
  var S = oklab.l / 100 - 0.0894841775 * oklab.a - 1.2914855480 * oklab.b;
  L = L * L * L;
  M = M * M * M;
  S = S * S * S;
  return {
    r: 4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    g: -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    b: -0.0041960863 * L - 0.7034186147 * M + 1.7076147010 * S
  };
}
function lRgbToNormalizedRgb(lRgb) {
  var fn = function fn() {
    var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var abs = Math.abs(c);
    return abs > 0.0031308 ? 1.055 * Math.pow(abs, 1 / 2.4) - 0.055 : 12.92 * abs;
  };
  return {
    r: fn(lRgb.r),
    g: fn(lRgb.g),
    b: fn(lRgb.b)
  };
}
//# sourceMappingURL=conversions.js.map