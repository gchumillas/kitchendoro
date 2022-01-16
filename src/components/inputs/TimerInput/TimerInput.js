import React from 'react'
import { Pressable, View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import PlayIcon from '~/assets/icons/play.svg'
import { Icon, Text } from '~/src/components/display'
import Input from './Input'

const TimerInput = ({ value, onChange, onSubmit, style = undefined }) => {
  const { hh, mm, ss } = value
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
        <Input value={hh} onChange={hh => onChange({ ...value, hh })} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:</Text>
        <Input value={mm} onChange={mm => onChange({ ...value, mm })} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:</Text>
        <Input value={ss} onChange={ss => onChange({ ...value, ss })} />
      </View>
      <Pressable onPress={onSubmit}>
        <Icon component={PlayIcon} size={iconSize} />
      </Pressable>
    </View>
  </View>
}

export default TimerInput
