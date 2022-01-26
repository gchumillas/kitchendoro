import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import cn from 'react-native-classnames'
import Text from '~/src/components/display/Text'
import { tw } from '~/src/libs/tailwind'

const Button = ({ title, primary = false, disabled = false, ...props }) => {
  return <Pressable
    disabled={disabled}
    style={({ pressed }) => cn(styles, 'wrapper', { pressed, primary, primaryDisabled: primary && disabled })}
    {...props}>
    <Text style={cn(styles, 'text', { primaryText: primary, disabledText: disabled })}>{title}</Text>
  </Pressable>
}

const styles = StyleSheet.create({
  wrapper: tw('py-1 pb-0.5 px-0.5 border-b-4 border-transparent'),
  pressed: tw('opacity-30'),
  primary: tw('border-dark'),
  primaryDisabled: tw('border-gray-300'),
  text: { ...tw('text-dark'), fontFamily: 'RobotoMono_700Bold' },
  primaryText: { fontFamily: 'RobotoMono_700Bold' },
  disabledText: tw('text-gray-300')
})

export default Button
