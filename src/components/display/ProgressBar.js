import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'

const ProgressBar = ({
  value // a value between 0 and 1
}) => {
  return <View style={tw('h-2')}>
    <View style={{ ...tw('h-2 bg-light'), width: `${100 * value}%` }} />
  </View>
}

export default ProgressBar
