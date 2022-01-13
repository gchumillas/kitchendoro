import React from 'react'
import { Pressable, View, TextInput } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import { ProgressBar, Icon, Text } from '~/src/components/display'

const TimerInput = ({ style = undefined }) => {
  const [hours, setHours] = React.useState('00')
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
      <View style={tw('mt-1 flex flex-row')}>
        <TextInput value={hours} onChangeText={setHours} style={{ ...tw('text-light text-4xl border border-white'), fontFamily: 'RobotoMono_400Regular' }} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:00:00</Text>
      </View>
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
