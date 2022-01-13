import React from 'react'
import { Pressable } from 'react-native'
import { getColor, tw } from '~/src/libs/tailwind'
import { Text, Icon } from '~/src/components/display'

const Component = ({ label, icon, onPress }) => {
  return <Pressable onPress={onPress} style={tw('flex flex-row items-center my-1.5')}>
    <Icon component={icon} size={30} color={getColor('dark')} style={tw('mr-3')} />
    <Text style={tw('py-2 text-lg text-dark')}>{label}</Text>
  </Pressable>
}

export default Component
