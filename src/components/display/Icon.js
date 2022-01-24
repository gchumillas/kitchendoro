import React from 'react'
import { getColor } from '~/src/libs/tailwind'

const Icon = ({ component: Component, size, color = getColor('light'), ...inconProps }) => {
  return <Component {...inconProps} width={size} height={size} fill={color} />
}

export default Icon
