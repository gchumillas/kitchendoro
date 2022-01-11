import React from 'react'
import { Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTailwind } from 'tailwind-rn'

const HomePage = _ => {
  const tw = useTailwind()

  return <View style={tw('flex h-full bg-white items-center justify-center')}>
    <Text>Open up App.js to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
}

export default HomePage
