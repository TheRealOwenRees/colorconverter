"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cmyToCmyk = cmyToCmyk;
exports.hexToRgb = hexToRgb;
exports.hslToRgb = hslToRgb;
exports.hsvToRgb = hsvToRgb;
exports.labToLch = labToLch;
exports.rgbToCmy = rgbToCmy;
exports.rgbToHex = rgbToHex;
exports.rgbToHsl = rgbToHsl;
exports.rgbToHsv = rgbToHsv;
exports.rgbToXyz = rgbToXyz;
exports.rgbaToHex8 = rgbaToHex8;
exports.toRgbBase = toRgbBase;
exports.xyzToLab = xyzToLab;
var _utilities = require("./utilities");
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
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
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
    s: s * 100,
    l: l * 100
  };
}
function hslToRgb(hsl) {
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
  var r = rgb.r / 255;
  var g = rgb.g / 255;
  var b = rgb.b / 255;
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
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
    var rr = diffc(r);
    var gg = diffc(g);
    var bb = diffc(b);
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
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function rgbToHex(rgb) {
  var binaryRgb = rgb.r << 16 | rgb.g << 8 | rgb.b;
  return binaryRgb.toString(16).padStart(6, '0');
}
function rgbaToHex8(rgba) {
  var _rgba$a;
  var binaryRgb = rgbToHex({
    r: rgba.r,
    g: rgba.g,
    b: rgba.b
  });
  var aHex = (0, _utilities.convertDecimalToHex)((_rgba$a = rgba.a) !== null && _rgba$a !== void 0 ? _rgba$a : 1);
  return "".concat(binaryRgb.padStart(6, '0')).concat(aHex === '0' ? '00' : aHex);
}
function hexToRgb(hexInput) {
  var hex = (0, _utilities.expandHex)(hexInput);
  var rgb = parseInt(hex.replace('#', ''), 16);
  return {
    r: rgb >> 16 & 0xff,
    g: rgb >> 8 & 0xff,
    b: rgb & 0xff
  };
}
function rgbToXyz(rgb) {
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
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
  var x = xyz.x,
    y = xyz.y,
    z = xyz.z;
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
  var l = lab.l,
    a = lab.a,
    b = lab.b;
  var h = Math.atan2(b, a);
  h > 0 ? h = h / Math.PI * 180 : h = 360 - Math.abs(h) / Math.PI * 180;
  return {
    l: l,
    c: Math.sqrt(a * a + b * b),
    h: h
  };
}
function rgbToCmy(rgb) {
  var r = rgb.r,
    g = rgb.g,
    b = rgb.b;
  return {
    c: 1 - r / 255,
    m: 1 - g / 255,
    y: 1 - b / 255
  };
}
function cmyToCmyk(cmy) {
  var c = cmy.c,
    m = cmy.m,
    y = cmy.y;
  var k = 1;
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
    k: k
  };
}
//# sourceMappingURL=conversions.js.map