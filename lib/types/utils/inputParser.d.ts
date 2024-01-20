import { type ColorObjType } from "../types";
/**
 Given a string or object, convert that input to a ColorObjType
 @returns {ColorObjType} - An object with a format and value property
 @example
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
*/
export declare function inputParser(color: string | undefined): ColorObjType;
