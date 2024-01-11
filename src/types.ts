export interface ColorObjType {
  format: string | undefined
  value: RgbObject | HslObject | HsvObject | string | undefined
}

export interface RgbObject {
  r: number
  g: number
  b: number
  a?: number
}

export interface HsvObject {
  h: number | undefined
  s: number | undefined
  v: number | undefined
}

export interface HslObject {
  h: number | undefined
  s: number | undefined
  l: number | undefined
  a?: number | undefined
}

export interface XyzObject {
  x: number
  y: number
  z: number
}

export interface LabObject {
  l: number
  a: number
  b: number
}

export interface LchObject {
  l: number
  c: number
  h: number
}

export interface CmykObject {
  c: number
  m: number
  y: number
  k?: number
}
