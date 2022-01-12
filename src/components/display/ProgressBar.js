import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'

/**
 *
 * @param {object} params
 * @param {number} params.value A value between 0 and 1
 * @returns
 */
const ProgressBar = ({ value }) => {
  return <View style={tw('relative h-2')}>
    <View style={{ ...tw('relative h-2 bg-yellow-100'), width: `${100 * value}%` }} />
  </View>
}

export default ProgressBar
