import React from 'react'
import { useInterval } from './utils'

export const useCountdown = ({ running, startFrom, seconds }) => {
  const [countdown, setCountdown] = React.useState(0)

  useInterval({ ms: 1000 }, _ => {
    setCountdown(running ? seconds - Math.floor((Date.now() - startFrom) / 1000) : seconds)
  }, [running, seconds, startFrom])

  return countdown
}
