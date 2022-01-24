import React from 'react'
import { Link as RNLink } from 'react-router-native'

const Link = linkProps => {
  return <RNLink underlayColor="transparent" {...linkProps}></RNLink>
}

export default Link
