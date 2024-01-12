"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorconvertor_1 = __importDefault(require("../src/colorconvertor"));
describe('color parsing', () => {
    it('parse named color', () => {
        const colorConvertorInstance = new colorconvertor_1.default('red');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'name', value: 'f00' });
    });
    it('parse incorrect named color', () => {
        const colorConvertorInstance = new colorconvertor_1.default('resd');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: undefined, value: undefined });
    });
    it('parse hex', () => {
        const colorConvertorInstance = new colorconvertor_1.default('#ffffff');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'ffffff' });
    });
    it('parse hexa', () => {
        const colorConvertorInstance = new colorconvertor_1.default('#ffffffcc');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hexa', value: 'ffffffcc' });
    });
    it('parse hex - no hash', () => {
        const colorConvertorInstance = new colorconvertor_1.default('ffffff');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'ffffff' });
    });
    it('parse 3 digit hex', () => {
        const colorConvertorInstance = new colorconvertor_1.default('#fff');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hex', value: 'fff' });
    });
    it('parse hexa - no hash', () => {
        const colorConvertorInstance = new colorconvertor_1.default('ffffffcc');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hexa', value: 'ffffffcc' });
    });
    it('parse rgb', () => {
        const colorConvertorInstance = new colorconvertor_1.default('rgb(255, 255, 255)');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } });
    });
    it('parse rgb - no parenthesis', () => {
        const colorConvertorInstance = new colorconvertor_1.default('rgb 255 255 255');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgb', value: { r: 255, g: 255, b: 255 } });
    });
    it('parse rgba', () => {
        const colorConvertorInstance = new colorconvertor_1.default('rgba(255, 255, 255, 0.7)');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } });
    });
    it('parse rgba - no parenthesis', () => {
        const colorConvertorInstance = new colorconvertor_1.default('rgba 255 255 255 0.7');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'rgba', value: { r: 255, g: 255, b: 255, a: 0.7 } });
    });
    it('parse hsl', () => {
        const colorConvertorInstance = new colorconvertor_1.default('hsl(305, 100%, 54.5%)');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } });
    });
    it('parse hsl - no comma', () => {
        const colorConvertorInstance = new colorconvertor_1.default('hsl(305 100% 54.5%)');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } });
    });
    it('parse hsl - no parenthesis', () => {
        const colorConvertorInstance = new colorconvertor_1.default('hsl 305 100% 54.5%');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } });
    });
    it('parse hsl - no percentage sign', () => {
        const colorConvertorInstance = new colorconvertor_1.default('hsl 305 100 54.5');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsl', value: { h: 305, s: 100, l: 54.5 } });
    });
    it('parse hsla', () => {
        const colorConvertorInstance = new colorconvertor_1.default('hsla(305, 100%, 54.5%, 0.5)');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsla', value: { h: 305, s: 100, l: 54.5, a: 0.5 } });
    });
    it('parse hsv', () => {
        const colorConvertorInstance = new colorconvertor_1.default('hsv(4, 96%, 54.5%)');
        expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'hsv', value: { h: 4, s: 96, v: 54.5 } });
    });
    //   // it('parse lch', () => {
    //   //   const colorConvertorInstance = new ColorConvertor('lch(54.5%, 4, 96)')
    //   //   expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'lch', value: { l: 54.5, c: 4, h: 96 } })
    //   // })
    //   // it('parse lab', () => {
    //   //   const colorConvertorInstance = new ColorConvertor('lab(54.5%, 4, 96)')
    //   //   expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'lab', value: { l: 54.5, a: 4, b: 96 } })
    //   // })
    //   // it('parse xyz', () => {
    //   //   const colorConvertorInstance = new ColorConvertor('xyz(54.5%, 4, 96)')
    //   //   expect(colorConvertorInstance.getColorObj()).toMatchObject({ format: 'xyz', value: { x: 54.5, y: 4, z: 96 } })
    //   // })
});
