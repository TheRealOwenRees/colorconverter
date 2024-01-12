"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversions_1 = require("../src/utils/conversions");
describe('RGB to RGB Base - normalized rgb values', () => {
    it('rgb 0-255 -> 0-1', () => {
        expect((0, conversions_1.rgbToNormalizedRgb)({ r: 255, g: 255, b: 255, a: undefined })).toStrictEqual({ r: 1, g: 1, b: 1, a: undefined });
    });
    it('rgba 0-255 -> 0-1', () => {
        expect((0, conversions_1.rgbToNormalizedRgb)({ r: 255, g: 255, b: 255, a: 0.7 })).toStrictEqual({ r: 1, g: 1, b: 1, a: 0.7 });
    });
});
describe('color conversions', () => {
    it('rgb normalized -> hsl', () => {
        expect((0, conversions_1.rgbNormalizedToHsl)({ r: 0.5, g: 0.5, b: 0.5 })).toMatchObject({
            h: expect.closeTo(0, 2),
            s: expect.closeTo(0, 2),
            l: expect.closeTo(50, 2)
        });
    });
    it('rgb undefined -> hsl', () => {
        expect((0, conversions_1.rgbNormalizedToHsl)({ r: undefined, g: undefined, b: undefined })).toMatchObject({ h: undefined, s: undefined, l: undefined });
    });
    it('hsl -> rgb normalized', () => {
        expect((0, conversions_1.hslToRgbNormalized)({ h: 255, s: 58, l: 30 })).toMatchObject({
            r: expect.closeTo(0.21, 2),
            g: expect.closeTo(0.13, 2),
            b: expect.closeTo(0.47, 2)
        });
    });
    it('rgb normalized -> hsv', () => {
        expect((0, conversions_1.rgbNormalizedToHsv)({ r: 0.21, g: 0.13, b: 0.48 })).toMatchObject({
            h: 254,
            s: 73,
            v: 48
        });
    });
    it('hsv -> rgb', () => {
        expect((0, conversions_1.hsvToRgbNormalized)({ h: 255, s: 74.0, v: 48.2 })).toMatchObject({
            r: expect.closeTo(0.21, 2),
            g: expect.closeTo(0.13, 2),
            b: expect.closeTo(0.48, 2)
        });
    });
    it('rgb -> hex', () => {
        expect((0, conversions_1.rgbToHex)({ r: 1, g: 255, b: 255 })).toBe('01ffff');
    });
    it('rgba -> hex8', () => {
        expect((0, conversions_1.rgbaToHex8)({ r: 67, g: 255, b: 100, a: 0.8 })).toBe('43ff64cc');
    });
    it('hex -> rgb', () => {
        expect((0, conversions_1.hexToRgb)('ffffff')).toEqual({ r: 255, g: 255, b: 255 });
    });
    it('3 digit hex -> rgb', () => {
        expect((0, conversions_1.hexToRgb)('fff')).toEqual({ r: 255, g: 255, b: 255 });
    });
    it('RGB -> CMY', () => {
        expect((0, conversions_1.rgbNormalizedToCmy)({ r: 1, g: 0.4, b: 0.76 })).toMatchObject({
            c: expect.closeTo(0, 3),
            m: expect.closeTo(0.6, 3),
            y: expect.closeTo(0.24, 3)
        });
    });
    it('CMY -> CMYK', () => {
        expect((0, conversions_1.cmyToCmyk)({ c: 0.60784, m: 0.90588, y: 0.61176 })).toMatchObject({
            c: expect.closeTo(0, 3),
            m: expect.closeTo(0.76, 3),
            y: expect.closeTo(0.01, 3),
            k: expect.closeTo(0.60784, 3)
        });
    });
    it('LCH -> LAB', () => {
        expect((0, conversions_1.lchToLab)({ l: 54.5, c: 49, h: 96 })).toMatchObject({
            l: expect.closeTo(54.5, 1),
            a: expect.closeTo(-5.122, 1),
            b: expect.closeTo(48.732, 1)
        });
    });
    it('LAB -> XYZ', () => {
        expect((0, conversions_1.labToXyz)({ l: 54.5, a: -5.122, b: 48.732 })).toMatchObject({
            x: expect.closeTo(20.276, 1),
            y: expect.closeTo(22.449, 1),
            z: expect.closeTo(5.2356, 1)
        });
    });
    it('XYZ -> RGB%', () => {
        expect((0, conversions_1.xyzToRgbNormalized)({ x: 20.276, y: 22.449, z: 5.2356 })).toMatchObject({
            r: expect.closeTo(0.57102, 2),
            g: expect.closeTo(0.51355, 2),
            b: expect.closeTo(0.15614, 2)
        });
    });
});
