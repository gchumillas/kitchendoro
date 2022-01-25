import React from 'react'

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

export const dd = val => {
  const str = `${val}`
  return `${'0'.repeat(Math.max(0, 2 - str.length))}${str}`
}

const maxSeconds = 99 * 3600 + 59 * 60 + 60
export const parseSeconds = seconds => {
  const val = Math.abs(seconds) % maxSeconds
  const ss = val % 60
  const mm = Math.floor(val / 60) % 60
  const hh = Math.floor(val / 3600) % 100

  return `${dd(hh)}:${dd(mm)}:${dd(ss)}`
}

export const useInterval = ({ ms, inmediate = true }, callback, deps = []) => React.useEffect(_ => {
  inmediate && callback()
  const interval = setInterval(callback, ms)
  return _ => {
    clearInterval(interval)
  }
}, deps)
