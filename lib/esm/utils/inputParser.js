import namedColors from './namedColors';

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
export function inputParser(color) {
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
//# sourceMappingURL=inputParser.js.map