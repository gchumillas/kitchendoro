import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { tw } from '~/src/libs/tailwind'
import { useStatusBarHeight } from '~/src/hooks/utils'

const PageLayout = ({ children }) => {
  const height = useStatusBarHeight()

  return <View style={{ ...tw('flex h-full bg-black items-center justify-center'), marginTop: height }}>
    {children}
    {/* TODO: make status bar transparent */}
    <StatusBar style="auto" />
  </View>
}

export default PageLayout
