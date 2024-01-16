export interface ColorObjType {
  format: string | undefined
  value: RgbObject | HslObject | HsvObject | LchObject | string | undefined
}

export interface RgbObject {
  r: number | undefined
  g: number | undefined
  b: number | undefined
  a?: number | undefined
}

export interface HsvObject {
  h: number
  s: number
  v: number
}

export interface HslObject {
  h: number
  s: number
  l: number
  a?: number
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
  alpha?: number
}

export interface LchObject {
  l: number
  c: number
  h: number
  alpha?: number
}

export interface CmykObject {
  c: number
  m: number
  y: number
  k?: number
}
