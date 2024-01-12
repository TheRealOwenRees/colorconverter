"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmyToCmyk = cmyToCmyk;
exports.hexToRgb = hexToRgb;
exports.hslToRgbNormalized = hslToRgbNormalized;
exports.hsvToRgbNormalized = hsvToRgbNormalized;
exports.labToLch = labToLch;
exports.labToXyz = labToXyz;
exports.lchToLab = lchToLab;
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
exports.xyzToRgbNormalized = xyzToRgbNormalized;
var _utilities = require("./utilities");
/*
    Color conversion functions. 'Normalized' means 0-1 range.

    Formulae from:
    https://www.easyrgb.com/en/math.php
    https://gist.github.com/avisek/eadfbe7a7a169b1001a2d3affc21052e
*/

var referenceWhiteConstants = {
  x: 95.047,
  y: 100,
  z: 108.883
};
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
function rgbNormalizedToHsl(rgb) {
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
  if (r === undefined || g === undefined || b === undefined) {
    return {
      h: undefined,
      s: undefined,
      l: undefined
    };
  }
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
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
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
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
    return {
      h: undefined,
      s: undefined,
      v: undefined
    };
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
function xyzToLab(xyz) {
  var x = xyz.x,
    y = xyz.y,
    z = xyz.z;
  if (x === undefined || y === undefined || z === undefined) {
    return {
      l: undefined,
      a: undefined,
      b: undefined
    };
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
    return {
      l: undefined,
      c: undefined,
      h: undefined
    };
  }
  var h = Math.atan2(lab.b, lab.a);
  h > 0 ? h = h / Math.PI * 180 : h = 360 - Math.abs(h) / Math.PI * 180;
  return {
    l: lab.l,
    c: Math.sqrt(lab.a * lab.a + lab.b * lab.b),
    h: h
  };
}
function rgbNormalizedToCmy(rgb) {
  if (rgb.r === undefined || rgb.g === undefined || rgb.b === undefined) {
    return {
      c: undefined,
      m: undefined,
      y: undefined
    };
  }
  return {
    c: 1 - rgb.r,
    m: 1 - rgb.g,
    y: 1 - rgb.b
  };
}
function cmyToCmyk(cmy) {
  if (cmy.c === undefined || cmy.m === undefined || cmy.y === undefined) {
    return {
      c: undefined,
      m: undefined,
      y: undefined
    };
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
function lchToLab(lch) {
  if (lch.l === undefined || lch.c === undefined || lch.h === undefined) {
    return {
      l: undefined,
      a: undefined,
      b: undefined
    };
  }
  var hr = lch.h * Math.PI / 180;
  return {
    l: lch.l,
    a: Math.cos(hr) * lch.c,
    b: Math.sin(hr) * lch.c
  };
}

/*
    Reference white constants are based on the standard illuminant D65:
    https://en.wikipedia.org/wiki/Illuminant_D65

    The following is a list of reference white points for various standard illuminants:
    https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants

    Pass in a custom reference white point if you want to use a different one, e.g.:
    { x: 95.047, y: 100, z: 108.883 } for D65
    { x: 96.422, y: 100, z: 82.521 } for D50
    { x: 100, y: 100, z: 100 } for E
*/
function labToXyz(lab) {
  var referenceWhite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : referenceWhiteConstants;
  if (lab.l === undefined || lab.a === undefined || lab.b === undefined) {
    return {
      x: undefined,
      y: undefined,
      z: undefined
    };
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
  // TODO work with normalised figures, round to sRGB
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
  if (r === undefined || g === undefined || b === undefined) {
    return {
      x: undefined,
      y: undefined,
      z: undefined
    };
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
//# sourceMappingURL=conversions.js.map