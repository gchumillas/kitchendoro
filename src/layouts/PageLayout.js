import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTailwind } from 'tailwind-rn'

const PageLayout = ({ children }) => {
  const tw = useTailwind()

  return <View style={tw('flex h-full bg-white items-center justify-center')}>
    {children}
    <StatusBar style="auto" />
  </View>
}

export default PageLayout
