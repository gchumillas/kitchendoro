import React from 'react'
import { Pressable, View, Text } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'

const Timer = _ => {
  const tw = useTailwind()

  return <View style={tw('flex flex-row items-center justify-between')}>
    <Pressable>
      <MenuIcon />
    </Pressable>
    <Text style={{ ...tw('text-3xl'), fontFamily: 'RobotoMono_400Regular' }}>15:45:59</Text>
    <Pressable>
      <PlayIcon />
    </Pressable>
  </View>
}

export default Timer
