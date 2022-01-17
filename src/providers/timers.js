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
      running: 'boolean'
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

  await saveTimers([...timers, { id, name, seconds, start: 0, running: false }])
  return id
}

/**
 * @param {string} id
 * @returns {Promise<{ id: string, name: string, seconds: number }>}
 */
export const readTimer = async id => {
  const timers = await getTimers()

  return timers.find(x => x.id == id)
}

/**
 * @param {{ id: string, name: string }} props
 */
export const updateTimer = async ({ id, name }) => {
  const articles = await getTimers()

  await saveTimers(articles.map(x => x.id == id ? ({ ...x, name }) : x))
}

export const saveTimer = async (id, callback) => {
  const timers = await getTimers()

  await saveTimers(timers.map(x => x.id == id ? { ...x, ...callback(x) } : x))
}

/**
 * @param {string} id
 */
export const deleteTimer = async id => {
  const timers = await getTimers()

  await saveTimers(timers.filter(x => x.id != id))
}
