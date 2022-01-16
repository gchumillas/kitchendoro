import React from 'react'
import { Pressable, View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import { Icon, Text } from '~/src/components/display'
import Input from './Input'

const TimerInput = ({ style = undefined }) => {
  const [hours, setHours] = React.useState('')
  const [minutes, setMinutes] = React.useState('')
  const [seconds, setSeconds] = React.useState('')
  const iconSize = 35

  return <View style={[tw('border-2 rounded-md border-light px-2 pb-6'), style]}>
    <View style={tw('h-6 flex justify-center items-center')}>
      <Text>New Timer</Text>
    </View>
    <View style={tw('flex flex-row items-center justify-between')}>
      <Pressable>
        <Icon component={MenuIcon} size={iconSize} />
      </Pressable>
      <View style={tw('mt-1 flex flex-row')}>
        <Input value={hours} onChange={setHours} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:</Text>
        <Input value={minutes} onChange={setMinutes} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:</Text>
        <Input value={seconds} onChange={setSeconds} />
      </View>
      <Pressable>
        <Icon component={PlayIcon} size={iconSize} />
      </Pressable>
    </View>
  </View>
}

export default TimerInput
