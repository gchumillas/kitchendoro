import React from 'react'
import { View, StyleSheet } from 'react-native'
import cn from 'react-native-classnames'
import { tw, getColor } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import StopIcon from '~/assets/icons/stop.svg'
import { useCountdown } from '~/src/hooks/timer'
import { IconButton } from '~/src/components/inputs'
import { ProgressBar, Text } from './display'

const maxSeconds = 99 * 3600 + 59 * 60 + 60

const dd = val => {
  const str = `${val}`
  return `${'0'.repeat(Math.max(0, 2 - str.length))}${str}`
}

const rgba2hex = rgb => {
  rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)
  return (rgb && rgb.length === 4)
    ? '#' +
   ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
   ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
   ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
    : ''
}

const Timer = ({ running, startFrom, seconds, name, onStart, onStop, onSelect, style = undefined }) => {
  const countdown = useCountdown({ running, startFrom, seconds })
  const inTime = running && countdown > 0
  const overTime = running && countdown <= 0
  const color = React.useMemo(_ => inTime
    ? rgba2hex(getColor('green-300'))
    : overTime
      ? rgba2hex(getColor('red-300'))
      : rgba2hex(getColor('light')), [inTime, overTime])

  const time = React.useMemo(_ => {
    const val = Math.abs(countdown) % maxSeconds
    const ss = val % 60
    const mm = Math.floor(val / 60) % 60
    const hh = Math.floor(val / 3600) % 100

    return `${dd(hh)}:${dd(mm)}:${dd(ss)}`
  }, [countdown])

  return <View style={[cn(styles, 'container', { inTime, overTime }), style]}>
    <View style={tw('h-6 flex justify-center items-center')}>
      <Text style={cn(styles, { textInTime: inTime, textOverTime: overTime })}>{name}</Text>
    </View>
    <View style={tw('flex flex-row items-center justify-between')}>
      <IconButton icon={MenuIcon} onPress={onSelect} color={color} />
      <Text style={cn(styles, 'text', { textInTime: inTime, textOverTime: overTime })}>
        {time}
      </Text>
      {running
        ? <IconButton icon={StopIcon} onPress={onStop} color={color} />
        : <IconButton icon={PlayIcon} onPress={onStart} color={color} />}
    </View>
    <View style={tw('h-6 flex justify-center')}>
      <ProgressBar value={Math.max(0, countdown) / seconds} color={color} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: tw('border-2 rounded-md border-light px-2'),
  text: {
    ...tw('text-4xl mt-1'),
    fontFamily: 'RobotoMono_400Regular'
  },
  textInTime: tw('text-green-300'),
  textOverTime: tw('text-red-300'),
  inTime: tw('border-green-300'),
  overTime: tw('border-red-300')
})

export default Timer
