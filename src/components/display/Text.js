import React from 'react'
import { Text } from 'react-native'
import { tw } from '~/src/libs/tailwind'

const Component = ({ style, ...props }) => {
  return <Text {...props} style={[style, tw('text-light')]} />
}

export default Component
