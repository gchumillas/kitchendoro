import React from 'react'
import { View, StyleSheet } from 'react-native'
import cn from 'react-native-classnames'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import StopIcon from '~/assets/icons/stop.svg'
import { ProgressBar, Text } from '~/src/components/display'
import { IconButton } from '~/src/components/inputs'

const maxSeconds = 99 * 3600 + 59 * 60 + 60

const dd = val => {
  const str = `${val}`
  return `${'0'.repeat(Math.max(0, 2 - str.length))}${str}`
}

const Timer = ({ running, startFrom, seconds, name, onStart, onStop, onSelect, style = undefined }) => {
  const [countdown, setCountdown] = React.useState(0)
  const inTime = running && countdown > 0
  const overTime = running && countdown <= 0

  const time = React.useMemo(_ => {
    const val = Math.abs(countdown) % maxSeconds
    const ss = val % 60
    const mm = Math.floor(val / 60) % 60
    const hh = Math.floor(val / 3600) % 100

    return `${dd(hh)}:${dd(mm)}:${dd(ss)}`
  }, [countdown])

  React.useEffect(_ => {
    setCountdown(seconds)

    const interval = setInterval(_ => {
      if (running) {
        const elapsedTime = Math.floor((Date.now() - startFrom) / 1000)
        setCountdown(value => seconds - elapsedTime)
      }
    }, 1000)

    return _ => {
      clearInterval(interval)
    }
  }, [seconds, running, startFrom])

  return <View style={[cn(styles, 'container', { inTime, overTime }), style]}>
    <View style={tw('h-6 flex justify-center items-center')}>
      <Text>{name}</Text>
    </View>
    <View style={tw('flex flex-row items-center justify-between')}>
      <IconButton icon={MenuIcon} onPress={onSelect} />
      <Text style={{ ...tw('text-4xl mt-1'), fontFamily: 'RobotoMono_400Regular' }}>
        {time}
      </Text>
      {running
        ? <IconButton icon={StopIcon} onPress={onStop} />
        : <IconButton icon={PlayIcon} onPress={onStart} />}
    </View>
    <View style={tw('h-6 flex justify-center')}>
      <ProgressBar value={Math.max(0, countdown) / seconds} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: tw('border-2 rounded-md border-light px-2'),
  inTime: tw('border-green-300'),
  overTime: tw('border-red-300')
})

export default Timer
