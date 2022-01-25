import React from 'react'
import { View, StyleSheet } from 'react-native'
import cn from 'react-native-classnames'
import { tw, getColor } from '~/src/libs/tailwind'
import { parseSeconds } from '~/src/libs/time'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import StopIcon from '~/assets/icons/stop.svg'
import { useInterval } from '~/src/hooks/utils'
import IconButton from '~/src/components/inputs/IconButton'
import ProgressBar from '~/src/components/display/ProgressBar'
import Text from '~/src/components/display/Text'

const Timer = ({ running, startFrom, seconds, name, onStart, onStop, onSelect, style = undefined }) => {
  const countdown = useCountdown({ running, startFrom, seconds })
  const time = React.useMemo(_ => parseSeconds(countdown), [countdown])
  const inTime = running && countdown > 0
  const overTime = running && countdown <= 0
  const color = React.useMemo(_ => inTime
    ? getColor('green-300')
    : (overTime ? getColor('red-300') : getColor('light')), [inTime, overTime])

  return <View style={[cn(styles, 'container', { inTime, overTime }), style]}>
    <View style={tw('pt-3 pb-2 flex justify-center items-center')}>
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
    <View style={tw('py-3 flex justify-center')}>
      <ProgressBar value={Math.max(0, countdown) / seconds} color={color} />
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: tw('border-2 rounded-md border-light border-opacity-30 px-2'),
  text: {
    ...tw('text-4xl mt-1'),
    fontFamily: 'RobotoMono_400Regular'
  },
  textInTime: tw('text-green-0'),
  textOverTime: tw('text-red-0'),
  inTime: tw('border-green-0 border-opacity-50'),
  overTime: tw('border-red-0 border-opacity-50')
})

export const useCountdown = ({ running, startFrom, seconds }) => {
  const [countdown, setCountdown] = React.useState(0)

  useInterval({ ms: 1000 }, _ => {
    setCountdown(running ? seconds - Math.floor((Date.now() - startFrom) / 1000) : seconds)
  }, [running, seconds, startFrom])

  return countdown
}

export default Timer
