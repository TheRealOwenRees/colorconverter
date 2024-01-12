"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorconvertor_1 = __importDefault(require("../src/colorconvertor"));
describe('readability methods', () => {
    it('readability value 1', () => {
        expect(new colorconvertor_1.default('rgb(255, 255, 255)').readability('#ffffff')).toBe(1);
    });
    it('readability value 21', () => {
        expect(new colorconvertor_1.default('rgb(255, 255, 255)').readability('#000000')).toBe(21);
    });
    //   // it('is readable', () => {
    //   //   expect(new ColorConvertor('rgb(255, 255, 255)').isReadable('#000000')).toBe(true)
    //   // })
});
