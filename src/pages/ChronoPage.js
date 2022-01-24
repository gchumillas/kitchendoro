import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import { getChrono, startChrono, resetChrono } from '~/src/providers/chrono'
import { useChrono } from '~/src/hooks/timer'
import Text from '~/src/components/display/Text'
import IconButton from '~/src/components/inputs/IconButton'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'
import ResetIcon from '~/assets/icons/reset.svg'
import PlayIcon from '~/assets/icons/play.svg'

const iconSize = 55

const maxSeconds = 99 * 3600 + 59 * 60 + 60

const dd = val => {
  const str = `${val}`
  return `${'0'.repeat(Math.max(0, 2 - str.length))}${str}`
}

const ChronoPage = _ => {
  const [chrono, setChrono] = React.useState({ startFrom: 0, running: false })
  const seconds = useChrono(chrono)
  const reload = async _ => setChrono(await getChrono())

  const doStartChrono = async _ => {
    await startChrono()
    reload()
  }

  const doResetChrono = async _ => {
    await resetChrono()
    reload()
  }

  // TODO: don't repeat yourself
  const time = React.useMemo(_ => {
    const val = Math.abs(seconds) % maxSeconds
    const ss = val % 60
    const mm = Math.floor(val / 60) % 60
    const hh = Math.floor(val / 3600) % 100

    return `${dd(hh)}:${dd(mm)}:${dd(ss)}`
  }, [seconds])

  return <PageLayout footer={<Footer />}>
    <View style={tw('flex h-full items-center justify-center')}>
      <View style={tw('')}>
        <Text style={{ ...tw('mb-7 text-center text-6xl'), fontFamily: 'RobotoMono_400Regular' }}>
          {time}
        </Text>
        <View style={tw('flex flex-row justify-evenly items-center')}>
          <IconButton icon={ResetIcon} size={iconSize} onPress={doResetChrono} />
          <IconButton icon={PlayIcon} size={iconSize} onPress={doStartChrono} />
        </View>
      </View>
    </View>
  </PageLayout>
}

export default ChronoPage
