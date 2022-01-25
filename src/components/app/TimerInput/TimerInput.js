import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import MenuIcon from '~/assets/icons/menu.svg'
import AddIcon from '~/assets/icons/add.svg'
import Text from '~/src/components/display/Text'
import { time2Seconds } from '~/src/libs/utils'
import IconButton from '~/src/components/inputs/IconButton'
import Input from './Input'

const TimerInput = ({ label, value, onChange, onSubmit, style = undefined }) => {
  const { hh, mm, ss } = value
  const seconds = React.useMemo(_ => time2Seconds(value), [JSON.stringify(value)])

  return <View style={[tw('border-2 rounded-md border-light border-opacity-30 px-2 pb-5'), style]}>
    <View style={tw('pt-3 pb-2 flex justify-center items-center')}>
      <Text>{label}</Text>
    </View>
    <View style={tw('flex flex-row items-center justify-between')}>
      <IconButton icon={MenuIcon} disabled />
      <View style={tw('mt-1 flex flex-row')}>
        <Input value={hh} onChange={hh => onChange({ ...value, hh })} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:</Text>
        <Input value={mm} onChange={mm => onChange({ ...value, mm })} />
        <Text style={{ ...tw('text-4xl'), fontFamily: 'RobotoMono_400Regular' }}>:</Text>
        <Input value={ss} onChange={ss => onChange({ ...value, ss })} />
      </View>
      <IconButton icon={AddIcon} onPress={onSubmit} disabled={seconds == 0} />
    </View>
  </View>
}

export default TimerInput
