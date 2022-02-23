import React from 'react'
import { View, TextInput } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import Text from '~/src/components/display/Text'

const Input = ({ value, onChange }) => {
  const inputRef = React.createRef()

  const doChange = text => {
    onChange(text.substring(0, 2).replace(/[^\d]/g, ''))
  }

  return <View style={tw('relative border-b-4 border-light')}>
    <Text style={{ ...tw('text-4xl text-transparent'), fontFamily: 'RobotoMono_400Regular' }}>
      00
    </Text>
    <TextInput
      selectTextOnFocus
      ref={inputRef}
      keyboardType="number-pad"
      value={value}
      onChangeText={doChange}
      style={{ ...tw('absolute top-0 left-0 w-full h-full text-light text-4xl mt-1'), fontFamily: 'RobotoMono_400Regular' }} />
  </View>
}

export default Input
