import React from 'react'
import { Pressable, View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import { ProgressBar, Icon, Text } from '~/src/components/display'

const TimerInput = ({ style = undefined }) => {
  const value = React.useMemo(_ => Math.random(), [])
  const iconSize = 35

  return <View style={[tw('border-2 rounded-md border-light px-2'), style]}>
    <View style={tw('h-6 flex justify-center items-center')}>
      <Text>New Timer</Text>
    </View>
    <View style={tw('flex flex-row items-center justify-between')}>
      <Pressable>
        <Icon component={MenuIcon} size={iconSize} />
      </Pressable>
      <Text style={{ ...tw('text-4xl mt-1'), fontFamily: 'RobotoMono_400Regular' }}>
        00:00:00
      </Text>
      <Pressable>
        <Icon component={PlayIcon} size={iconSize} />
      </Pressable>
    </View>
    <View style={tw('h-6 flex justify-center')}>
      <ProgressBar value={value} />
    </View>
  </View>
}

export default TimerInput
