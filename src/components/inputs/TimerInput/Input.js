import React from 'react'
import { View, TextInput } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import { Text } from '~/src/components/display'

const Input = ({ value, onChange }) => {
  const inputRef = React.createRef()

  return <View style={tw('relative border-b-4 border-light')}>
    <Text style={{ ...tw('text-4xl text-transparent'), fontFamily: 'RobotoMono_400Regular' }}>
      00
    </Text>
    <TextInput
      selectTextOnFocus
      ref={inputRef}
      keyboardType="number-pad"
      value={value}
      onChangeText={onChange}
      style={{ ...tw('absolute top-0 left-0 w-full text-light text-4xl mt-1'), fontFamily: 'RobotoMono_400Regular' }} />
  </View>
}

export default Input
