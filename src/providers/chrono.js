import * as ss from 'expo-secure-store'
import { fix } from '@gchumillas/schema-fixer'

const fixChrono = chrono => fix(chrono, {
  startFrom: 'number',
  running: 'boolean'
})

const saveChrono = async chrono => {
  await ss.setItemAsync('chrono', JSON.stringify(fixChrono(chrono)))
}

/**
 * @returns {Promise<{ startFrom: number, running: boolean }>}
 */
export const getChrono = async _ => {
  try {
    console.log(await ss.getItemAsync('chrono'))
    return fixChrono(JSON.parse(await ss.getItemAsync('chrono')))
  } catch (err) {
    return {
      startFrom: 0,
      running: false
    }
  }
}

export const startChrono = async _ => {
  await saveChrono({ startFrom: Date.now(), running: true })
}

export const stopChrono = async _ => {
  const chrono = await getChrono()

  await saveChrono({ ...chrono, running: false })
}

export const resetChrono = async _ => {
  await ss.deleteItemAsync('chrono')
}
