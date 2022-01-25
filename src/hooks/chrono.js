import React from 'react'

export const useChrono = ({ running, startFrom, endTo }) => {
  const [seconds, setSeconds] = React.useState(0)
  const elapsedTime = ({ running, startFrom, endTo }) => {
    endTo = running ? Date.now() : endTo
    return Math.floor((endTo - startFrom) / 1000)
  }

  React.useEffect(_ => {
    setSeconds(elapsedTime({ running, startFrom, endTo }))
    const interval = setInterval(_ => {
      setSeconds(elapsedTime({ running, startFrom, endTo }))
    }, 1000)

    return _ => {
      clearInterval(interval)
    }
  }, [running, startFrom, endTo])

  return seconds
}
