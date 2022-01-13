import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { tw } from '~/src/libs/tailwind'
import { useStatusBarHeight } from '~/src/hooks/utils'

const PageLayout = ({ children }) => {
  const height = useStatusBarHeight()

  return <View style={{ ...tw('flex h-full bg-black items-center justify-center'), paddingTop: height }}>
    {children}
    {/* TODO: make status bar transparent */}
    <StatusBar style="light" />
  </View>
}

export default PageLayout
