import React from 'react'

export const useCountdown = ({ running, startFrom, seconds }) => {
  const [countdown, setCountdown] = React.useState(0)
  const elapsedTime = ({ running, seconds, startFrom }) => {
    return running ? seconds - Math.floor((Date.now() - startFrom) / 1000) : seconds
  }

  React.useEffect(_ => {
    setCountdown(elapsedTime({ running, seconds, startFrom }))
    const interval = setInterval(_ => {
      setCountdown(elapsedTime({ running, seconds, startFrom }))
    }, 1000)

    return _ => {
      clearInterval(interval)
    }
  }, [running, startFrom, seconds])

  return countdown
}
