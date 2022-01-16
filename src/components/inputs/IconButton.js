import React from 'react'
import { Pressable } from 'react-native'
import { Icon } from '~/src/components/display'

const IconButton = ({ icon, size = 35, onPress = undefined }) => {
  return <Pressable onPress={onPress}>
    <Icon component={icon} size={size} />
  </Pressable>
}

export default IconButton
