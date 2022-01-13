import React from 'react'
import { Text as RNText } from 'react-native'
import { tw } from '~/src/libs/tailwind'

const Text = ({ style, ...props }) => {
  return <RNText {...props} style={[tw('text-light'), style]} />
}

export default Text
