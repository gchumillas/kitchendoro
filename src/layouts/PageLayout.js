import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { tw } from '~/src/libs/tailwind'
import { useStatusBarHeight } from '~/src/hooks/utils'

const PageLayout = ({ footer, children }) => {
  const height = useStatusBarHeight()

  return <SafeAreaView style={{ ...tw('flex h-full bg-dark'), paddingTop: height }}>
    <View style={tw('flex-shrink flex-grow px-5 pt-5')}>
      {children}
    </View>
    <View style={tw('py-4 px-6')}>
      {footer}
    </View>
    <StatusBar style="light" />
  </SafeAreaView>
}

export default PageLayout
