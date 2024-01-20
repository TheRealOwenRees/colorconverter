import { type LabObject, type RgbObject, type UtilitiesInterface } from "../types";
export declare function convertDecimalToHex(d: number): string;
export declare function calculateBrightness(rgb: RgbObject): number;
export declare function calculateLuminance(rgb: RgbObject): number;
export declare function truncateHex(hex: string): string;
export declare function expandHex(hex: string): string;
export declare function labDeltaE(lab1: LabObject, lab2: LabObject): number;
declare const utilities: UtilitiesInterface;
export default utilities;
