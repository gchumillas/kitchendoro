import React from 'react'
import { StyleSheet, View } from 'react-native'
import cn from 'react-native-classnames'
import { useKeepAwake } from 'expo-keep-awake'
import { useChrono } from '~/src/store/chrono'
import { getChrono, startChrono, stopChrono, resetChrono } from '~/src/providers/chrono'
import { useInterval, parseSeconds } from '~/src/libs/utils'
import { tw, getColor } from '~/src/libs/tailwind'
import Text from '~/src/components/display/Text'
import IconButton from '~/src/components/inputs/IconButton'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'
import ResetIcon from '~/assets/icons/reset.svg'
import PlayIcon from '~/assets/icons/play.svg'
import PauseIcon from '~/assets/icons/pause.svg'

const iconSize = 55

const ChronoPage = _ => {
  useKeepAwake()
  const [chrono, setChrono] = useChrono()
  const seconds = useSeconds(chrono)
  const time = React.useMemo(_ => parseSeconds(seconds), [seconds])
  const reload = async _ => setChrono(await getChrono())
  const color = React.useMemo(_ => chrono.running ? getColor('green-0') : getColor('light'), [chrono.running])

  const doStartChrono = async _ => {
    await startChrono()
    reload()
  }

  const doStopChrono = async _ => {
    setChrono(({ ...chrono, endTo: Date.now(), running: false }))
    await stopChrono()
    reload()
  }

  const doResetChrono = async _ => {
    setChrono(({ ...chrono, started: false }))
    await resetChrono()
    reload()
  }

  React.useEffect(_ => {
    reload()
  }, [])

  return <PageLayout footer={<Footer />}>
    <View style={tw('flex h-full items-center justify-center')}>
      <View>
        <Text style={cn(styles, 'text', { running: chrono.running })}>
          {time}
        </Text>
        <View style={tw('flex flex-row justify-evenly items-center')}>
          <IconButton disabled={!chrono.started} icon={ResetIcon} size={iconSize} onPress={doResetChrono} color={color} />
          {chrono?.running
            ? <IconButton icon={PauseIcon} size={iconSize} onPress={doStopChrono} color={color} />
            : <IconButton icon={PlayIcon} size={iconSize} onPress={doStartChrono} color={color} />}
        </View>
      </View>
    </View>
  </PageLayout>
}

const styles = StyleSheet.create({
  text: {
    ...tw('mb-7 text-center text-6xl'),
    fontFamily: 'RobotoMono_400Regular'
  },
  running: tw('text-green-0')
})

const useSeconds = ({ running, startFrom, endTo }) => {
  const [seconds, setSeconds] = React.useState(0)

  useInterval({ ms: 333 }, _ => {
    const now = running ? Date.now() : endTo
    setSeconds(Math.floor((now - startFrom) / 1000))
  }, [running, startFrom, endTo])

  return seconds
}

export default ChronoPage
