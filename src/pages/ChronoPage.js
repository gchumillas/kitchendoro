import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import { getChrono, startChrono, resetChrono } from '~/src/providers/chrono'
import { useChrono } from '~/src/hooks/timer'
import { parseSeconds } from '~/src/libs/time'
import Text from '~/src/components/display/Text'
import IconButton from '~/src/components/inputs/IconButton'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'
import ResetIcon from '~/assets/icons/reset.svg'
import PlayIcon from '~/assets/icons/play.svg'

const iconSize = 55

const ChronoPage = _ => {
  const [chrono, setChrono] = React.useState({ startFrom: 0, running: false })
  const seconds = useChrono(chrono)
  const time = React.useMemo(_ => parseSeconds(seconds), [seconds])
  const reload = async _ => setChrono(await getChrono())

  const doStartChrono = async _ => {
    await startChrono()
    reload()
  }

  const doResetChrono = async _ => {
    await resetChrono()
    reload()
  }

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
