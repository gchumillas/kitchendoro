import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import ProgressBar from '~/src/components/display/ProgressBar'

const Timer = ({ style = undefined }) => {
  const value = React.useMemo(_ => Math.random(), [])
  const iconSize = 35

  return <View style={{ ...style, ...tw('border-2 rounded-md border-white px-2') }}>
    <View style={tw('h-6 flex justify-center items-center')}>
      <Text style={tw('text-white')}>New Timer</Text>
    </View>
    <View style={tw('flex flex-row items-center justify-between')}>
      <Pressable>
        <MenuIcon fill="white" width={iconSize} height={iconSize} />
      </Pressable>
      <Text style={{ ...tw('text-4xl text-white mt-1'), fontFamily: 'RobotoMono_400Regular' }}>
        15:45:00
      </Text>
      <Pressable>
        <PlayIcon fill="white" width={iconSize} height={iconSize} />
      </Pressable>
    </View>
    <View style={tw('h-6 flex justify-center')}>
      <ProgressBar value={value} />
    </View>
  </View>
}

export default Timer
