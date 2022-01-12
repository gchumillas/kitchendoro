import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTailwind } from 'tailwind-rn'
import { useStatusBarHeight } from '~/src/hooks/utils'

const PageLayout = ({ children }) => {
  const tw = useTailwind()
  const height = useStatusBarHeight()

  return <View style={{ ...tw('flex h-full bg-white items-center justify-center'), marginTop: height }}>
    {children}
    <StatusBar style="auto" />
  </View>
}

export default PageLayout
