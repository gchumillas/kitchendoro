import React from 'react'
import { View } from 'react-native'
import { useLocation } from 'react-router-native'
import Icon from '~/src/components/display/Icon'
import Link from '~/src/components/navigation/Link'
import { tw, getColor } from '~/src/libs/tailwind'
import TimerIcon from '~/assets/icons/timer.svg'
import ChronoIcon from '~/assets/icons/chrono.svg'

const iconColor = selected => getColor(selected ? 'white' : 'gray-500')

const Footer = _ => {
  const { pathname } = useLocation()

  return <View style={tw('flex flex-row justify-around items-center')}>
    <Link to="/timer">
      <Icon component={TimerIcon} size={55} color={iconColor(pathname == '/timer')} />
    </Link>
    <Link to="/chrono">
      <Icon component={ChronoIcon} size={55} color={iconColor(pathname == '/chrono')} />
    </Link>
  </View>
}

export default Footer
