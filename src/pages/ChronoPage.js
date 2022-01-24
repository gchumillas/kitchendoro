import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import Text from '~/src/components/display/Text'
import IconButton from '~/src/components/inputs/IconButton'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'
import ResetIcon from '~/assets/icons/reset.svg'
import PlayIcon from '~/assets/icons/play.svg'

const ChronoPage = _ => {
  const iconSize = 55

  return <PageLayout footer={<Footer />}>
    <View style={tw('flex h-full items-center justify-center')}>
      <View style={tw('')}>
        <Text style={{ ...tw('mb-7 text-center text-6xl'), fontFamily: 'RobotoMono_400Regular' }}>
          00:00:00
        </Text>
        <View style={tw('flex flex-row justify-evenly items-center')}>
          <IconButton icon={ResetIcon} size={iconSize} />
          <IconButton icon={PlayIcon} size={iconSize} />
        </View>
      </View>
    </View>
  </PageLayout>
}

export default ChronoPage
