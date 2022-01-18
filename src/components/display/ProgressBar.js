import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'

const ProgressBar = ({
  value, // a value between 0 and 1
  color = '#ffffff'
}) => {
  return <View style={tw('h-2 relative')}>
    <View style={{ ...tw('h-2 absolute top-0 left-0 w-full'), backgroundColor: color, opacity: 0.2 }} />
    <View style={{ ...tw('h-2'), width: `${100 * value}%`, backgroundColor: color }} />
  </View>
}

export default ProgressBar
