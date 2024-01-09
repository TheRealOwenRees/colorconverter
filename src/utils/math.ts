export function convertDecimalToHex (d: number): string {
  return Math.round(d * 255).toString(16)
}
