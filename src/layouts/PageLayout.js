import React from 'react'
import { StatusBar as SB, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTailwind } from 'tailwind-rn'

const PageLayout = ({ children }) => {
  const tw = useTailwind()

  return <View style={{ ...tw('flex h-full bg-white items-center justify-center'), marginTop: SB.currentHeight }}>
    {children}
    <StatusBar style="auto" />
  </View>
}

export default PageLayout
