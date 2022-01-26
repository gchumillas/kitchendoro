import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import cn from 'react-native-classnames'
import { getColor, tw } from '~/src/libs/tailwind'
import Icon from '~/src/components/display/Icon'
import Text from '~/src/components/display/Text'

const ContextMenuItem = ({ label, icon, color = getColor('dark'), onPress }) => {
  return <Pressable onPress={onPress} style={({ pressed }) => cn(styles, 'pressable', { pressed })}>
    <Icon component={icon} size={30} color={color} style={tw('mr-3')} />
    <Text style={{ ...tw('py-2 text-lg text-dark'), color }}>{label}</Text>
  </Pressable>
}

const styles = StyleSheet.create({
  pressable: tw('flex flex-row items-center my-1.5'),
  pressed: tw('opacity-30')
})

export default ContextMenuItem
