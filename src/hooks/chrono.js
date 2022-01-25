import React from 'react'
import { useInterval } from './utils'

export const useChrono = ({ running, startFrom, endTo }) => {
  const [seconds, setSeconds] = React.useState(0)

  useInterval({ ms: 1000 }, _ => {
    const now = running ? Date.now() : endTo
    setSeconds(Math.floor((now - startFrom) / 1000))
  }, [running, startFrom, endTo])

  return seconds
}
