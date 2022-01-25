import React from 'react'
import { StyleSheet, View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import cn from 'react-native-classnames'
import { getChrono, startChrono, stopChrono, resetChrono } from '~/src/providers/chrono'
import { parseSeconds } from '~/src/libs/time'
import { useInterval } from '~/src/hooks/utils'
import Text from '~/src/components/display/Text'
import IconButton from '~/src/components/inputs/IconButton'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'
import ResetIcon from '~/assets/icons/reset.svg'
import PlayIcon from '~/assets/icons/play.svg'
import StopIcon from '~/assets/icons/stop.svg'

const iconSize = 55

const ChronoPage = _ => {
  const [chrono, setChrono] = React.useState({ startFrom: 0, endTo: 0, running: false, started: false })
  const seconds = useChrono(chrono)
  const time = React.useMemo(_ => parseSeconds(seconds), [seconds])

  const reload = async _ => {
    const chrono = await getChrono()
    setChrono(_ => chrono)
  }

  const doStartChrono = async _ => {
    await startChrono()
    reload()
  }

  const doStopChrono = async _ => {
    setChrono(chrono => ({ ...chrono, endTo: Date.now(), running: false }))
    await stopChrono()
    reload()
  }

  const doResetChrono = async _ => {
    setChrono(chrono => ({ ...chrono, started: false }))
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
          <IconButton disabled={!chrono.started} icon={ResetIcon} size={iconSize} onPress={doResetChrono} />
          {chrono?.running
            ? <IconButton icon={StopIcon} size={iconSize} onPress={doStopChrono} />
            : <IconButton icon={PlayIcon} size={iconSize} onPress={doStartChrono} />}
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

const useChrono = ({ running, startFrom, endTo }) => {
  const [seconds, setSeconds] = React.useState(0)

  useInterval({ ms: 1000 }, _ => {
    const now = running ? Date.now() : endTo
    setSeconds(Math.floor((now - startFrom) / 1000))
  }, [running, startFrom, endTo])

  return seconds
}

export default ChronoPage
