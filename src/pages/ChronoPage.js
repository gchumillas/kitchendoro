import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import { getChrono, startChrono, stopChrono, resetChrono } from '~/src/providers/chrono'
import { parseSeconds } from '~/src/libs/time'
import Text from '~/src/components/display/Text'
import IconButton from '~/src/components/inputs/IconButton'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'
import ResetIcon from '~/assets/icons/reset.svg'
import PlayIcon from '~/assets/icons/play.svg'
import StopIcon from '~/assets/icons/stop.svg'

const iconSize = 55

const ChronoPage = _ => {
  const [chrono, setChrono] = React.useState(null) // null | { startFrom: number, running: boolean }
  const [seconds, setSeconds] = React.useState(0)
  const time = React.useMemo(_ => parseSeconds(seconds), [seconds])
  const reload = async _ => setChrono(await getChrono())

  const doStartChrono = async _ => {
    await startChrono()
    reload()
  }

  const doStopChrono = async _ => {
    await stopChrono()
    reload()
  }

  const doResetChrono = async _ => {
    await resetChrono()
    reload()
  }

  React.useEffect(_ => {
    setSeconds(chrono ? Math.floor(((chrono.running ? Date.now() : chrono.endTo) - chrono.startFrom) / 1000) : 0)

    const interval = setInterval(_ => {
      setSeconds(chrono ? Math.floor(((chrono.running ? Date.now() : chrono.endTo) - chrono.startFrom) / 1000) : 0)
    }, 100)

    return _ => {
      clearInterval(interval)
    }
  }, [JSON.stringify(chrono)])

  React.useEffect(_ => {
    reload()
  })

  return <PageLayout footer={<Footer />}>
    <View style={tw('flex h-full items-center justify-center')}>
      <View style={tw('')}>
        <Text style={{ ...tw('mb-7 text-center text-6xl'), fontFamily: 'RobotoMono_400Regular' }}>
          {time}
        </Text>
        <View style={tw('flex flex-row justify-evenly items-center')}>
          <IconButton icon={ResetIcon} size={iconSize} onPress={doResetChrono} />
          {chrono?.running
            ? <IconButton icon={StopIcon} size={iconSize} onPress={doStopChrono} />
            : <IconButton icon={PlayIcon} size={iconSize} onPress={doStartChrono} />}
        </View>
      </View>
    </View>
  </PageLayout>
}

export default ChronoPage
