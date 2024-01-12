export interface ColorObjType {
    format: string | undefined;
    value: RgbObject | HslObject | HsvObject | string | undefined;
}
export interface RgbObject {
    r: number | undefined;
    g: number | undefined;
    b: number | undefined;
    a?: number | undefined;
}
export interface HsvObject {
    h: number | undefined;
    s: number | undefined;
    v: number | undefined;
}
export interface HslObject {
    h: number | undefined;
    s: number | undefined;
    l: number | undefined;
    a?: number | undefined;
}
export interface XyzObject {
    x: number | undefined;
    y: number | undefined;
    z: number | undefined;
}
export interface LabObject {
    l: number | undefined;
    a: number | undefined;
    b: number | undefined;
}
export interface LchObject {
    l: number | undefined;
    c: number | undefined;
    h: number | undefined;
}
export interface CmykObject {
    c: number | undefined;
    m: number | undefined;
    y: number | undefined;
    k?: number | undefined;
}
//# sourceMappingURL=types.d.ts.map