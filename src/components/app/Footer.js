import React from 'react'
import { View } from 'react-native'
import Icon from '~/src/components/display/Icon'
import Link from '~/src/components/navigation/Link'
import { tw } from '~/src/libs/tailwind'
import TimerIcon from '~/assets/icons/timer.svg'
import ChronoIcon from '~/assets/icons/chrono.svg'

const Footer = _ => {
  return <View style={tw('flex flex-row justify-around items-center')}>
    <Link to="/timer">
      <Icon component={TimerIcon} size={55} />
    </Link>
    <Link to="/chrono">
      <Icon component={ChronoIcon} size={55} />
    </Link>
  </View>
}

export default Footer
