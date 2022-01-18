import React from 'react'
import { StyleSheet, Pressable } from 'react-native'
import cn from 'react-native-classnames'
import { tw } from '~/src/libs/tailwind'
import { Icon } from '~/src/components/display'

const IconButton = ({ icon, disabled = false, size = 35, onPress = undefined }) => {
  return <Pressable onPress={onPress} disabled={disabled} style={cn(styles, { disabled })}>
    <Icon component={icon} size={size} />
  </Pressable>
}

const styles = StyleSheet.create({
  disabled: tw('opacity-30')
})

export default IconButton
