"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorconvertor_1 = __importDefault(require("../src/colorconvertor"));
describe('color convertor instances', () => {
    it('should return a color convertor instance', () => {
        expect(new colorconvertor_1.default('#ffffff')).toBeInstanceOf(colorconvertor_1.default);
    });
    it('clone instance', () => {
        const colorConvertor = new colorconvertor_1.default('rgb(255, 255, 255)');
        const clone = colorConvertor.clone();
        expect(clone).toMatchObject(colorConvertor);
    });
});
