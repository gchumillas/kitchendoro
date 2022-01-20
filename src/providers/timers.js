import * as ss from 'expo-secure-store'
import uuid from 'react-native-uuid'
import { fix, pipes } from '@gchumillas/schema-fixer'

const fixTimers = timers => fix(
  timers,
  pipes.array({
    type: {
      id: 'string',
      name: 'string',
      seconds: 'number',
      startFrom: 'number', // UNIX time in milliseconds
      running: 'boolean',
      notificationId: 'string'
    }
  })
)

const saveTimers = async timers => {
  await ss.setItemAsync('timers', JSON.stringify(fixTimers(timers)))
}

/**
 * @returns {Promise<{ id: string, name: string, seconds: number }[]>}
 */
export const getTimers = async _ => {
  try {
    return fixTimers(JSON.parse(await ss.getItemAsync('timers')))
  } catch (err) {
    console.error(err)
    return []
  }
}

/**
 * @param {object} props
 * @param {string} props.name
 * @param {number} props.seconds
 * @returns {Promise<string>}
 */
export const createTimer = async ({ name, seconds }) => {
  const timers = await getTimers()
  const id = uuid.v1()

  await saveTimers([{ id, name, seconds, start: 0, running: false }, ...timers])
  return id
}

/**
 * @param {string} id
 * @returns {Promise<{ id: string, name: string, seconds: number, startFrom: number, running: boolean, notificationId: string }>}
 */
export const readTimer = async id => {
  const timers = await getTimers()

  return timers.find(x => x.id == id)
}

/**
 *
 * @param {string} id
 * @param {{ name?: string, seconds?: number, startFrom?: number, running?:  boolean, notificationId?: string }} timer
 */
export const updateTimer = async (id, timer) => {
  const timers = await getTimers()

  await saveTimers(timers.map(x => x.id == id ? { ...x, ...timer } : x))
}

/**
 * @param {string} id
 */
export const deleteTimer = async id => {
  const timers = await getTimers()

  await saveTimers(timers.filter(x => x.id != id))
}
