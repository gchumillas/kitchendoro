/**
 * @param {{ from?: number, to: number }} params
 * @returns number[]
 */
export const range = ({ from = 0, to }) => {
  return Array.from(Array(Math.max(0, to - from + 1)).keys()).map(i => i + from)
}

export const text2Number = text => {
  const val = parseInt(text, 10)
  return isNaN(val) ? 0 : val
}

export const time2Seconds = ({ hh, mm, ss }) => {
  return text2Number(hh) * 3600 + text2Number(mm) * 60 + text2Number(ss)
}
