import * as ss from 'expo-secure-store'
import { fix } from '@gchumillas/schema-fixer'

const fixChrono = chrono => fix(chrono, {
  startFrom: 'number',
  endTo: 'number',
  running: 'boolean',
  started: 'boolean'
})

const saveChrono = async chrono => {
  await ss.setItemAsync('chrono', JSON.stringify(fixChrono(chrono)))
}

/**
 * @returns {Promise<{ startFrom: number, endTo: number, running: boolean, started: boolean }>}
 */
export const getChrono = async _ => {
  try {
    return fixChrono(JSON.parse(await ss.getItemAsync('chrono')))
  } catch (err) {
    return {
      startFrom: 0,
      endTo: 0,
      running: false,
      started: false
    }
  }
}

export const startChrono = async _ => {
  const { startFrom, endTo } = await getChrono()
  await saveChrono({ startFrom: Date.now() - endTo + startFrom, running: true, started: true })
}

export const stopChrono = async _ => {
  const chrono = await getChrono()

  await saveChrono({ ...chrono, endTo: Date.now(), running: false })
}

export const resetChrono = async _ => {
  await ss.deleteItemAsync('chrono')
}
