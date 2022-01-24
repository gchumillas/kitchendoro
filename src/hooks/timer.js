import React from 'react'

export const useCountdown = ({ running, startFrom, seconds }) => {
  const [countdown, setCountdown] = React.useState(0)

  React.useEffect(_ => {
    setCountdown(seconds)

    const interval = setInterval(_ => {
      if (running) {
        const elapsedTime = Math.floor((Date.now() - startFrom) / 1000)
        setCountdown(seconds - elapsedTime)
      }
    }, 1000)

    return _ => {
      clearInterval(interval)
    }
  }, [running, startFrom, seconds])

  return countdown
}

export const useChrono = ({ running, startFrom }) => {
  const [seconds, setSeconds] = React.useState(0)

  React.useEffect(_ => {
    setSeconds(0)

    const interval = setInterval(_ => {
      if (running) {
        setSeconds(Math.floor((Date.now() - startFrom) / 1000))
      }
    }, 1000)

    return _ => {
      clearInterval(interval)
    }
  }, [running, startFrom])

  return seconds
}
