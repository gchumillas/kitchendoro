const maxSeconds = 99 * 3600 + 59 * 60 + 60

const dd = val => {
  const str = `${val}`
  return `${'0'.repeat(Math.max(0, 2 - str.length))}${str}`
}

export const parseSeconds = seconds => {
  const val = Math.abs(seconds) % maxSeconds
  const ss = val % 60
  const mm = Math.floor(val / 60) % 60
  const hh = Math.floor(val / 3600) % 100

  return `${dd(hh)}:${dd(mm)}:${dd(ss)}`
}
