"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClosestColor = exports.labEuclideanDistance = exports.expandHex = exports.truncateHex = exports.calculateLuminance = exports.calculateBrightness = exports.convertDecimalToHex = void 0;
const conversions_1 = require("./conversions");
function convertDecimalToHex(d) {
    return Math.round(d * 255).toString(16);
}
exports.convertDecimalToHex = convertDecimalToHex;
function calculateBrightness(rgb) {
    const { r, g, b } = rgb;
    if (r === undefined || g === undefined || b === undefined) {
        throw new Error('RGB values must be defined');
    }
    return (r * 299 + g * 587 + b * 114) / 1000;
}
exports.calculateBrightness = calculateBrightness;
// http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
function calculateLuminance(rgb) {
    const { r, g, b } = rgb;
    if (r === undefined || g === undefined || b === undefined) {
        throw new Error('RGB values must be defined');
    }
    let R, G, B;
    if (r <= 0.03928)
        R = r / 12.92;
    else
        R = Math.pow((r + 0.055) / 1.055, 2.4);
    if (g <= 0.03928)
        G = g / 12.92;
    else
        G = Math.pow((g + 0.055) / 1.055, 2.4);
    if (b <= 0.03928)
        B = b / 12.92;
    else
        B = Math.pow((b + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}
exports.calculateLuminance = calculateLuminance;
function truncateHex(hex) {
    if (hex.length === 6) {
        if (hex[2] === hex[3] && hex[4] === hex[5]) {
            return hex[0] + hex[1] + hex[2];
        }
    }
    return hex;
}
exports.truncateHex = truncateHex;
function expandHex(hex) {
    if (hex.length === 3) {
        return hex[0] + hex[1] + hex[2] + hex[2] + hex[2] + hex[2];
    }
    return hex;
}
exports.expandHex = expandHex;
function labEuclideanDistance(lab1, lab2) {
    if (lab1.l === undefined || lab1.a === undefined || lab1.b === undefined || lab2.l === undefined || lab2.a === undefined || lab2.b === undefined) {
        throw new Error('Lab values must be defined');
    } // TODO can we do 'any' === undefined inside of the lab1 and lab2 objects?
    return Math.sqrt(Math.pow(lab1.l - lab2.l, 2) + Math.pow(lab1.a - lab2.a, 2) + Math.pow(lab1.b - lab1.b, 2));
}
exports.labEuclideanDistance = labEuclideanDistance;
function findClosestColor(rgb, namedColorsRgb) {
    let minDistance = Infinity;
    let closestColor = '';
    const lab1 = (0, conversions_1.xyzToLab)((0, conversions_1.rgbToXyz)(rgb));
    for (const color in namedColorsRgb) {
        const lab2 = (0, conversions_1.xyzToLab)((0, conversions_1.rgbToXyz)(namedColorsRgb[color]));
        const distance = labEuclideanDistance(lab1, lab2);
        if (distance < minDistance) {
            closestColor = color;
            minDistance = distance;
        }
    }
    return closestColor;
}
exports.findClosestColor = findClosestColor;
