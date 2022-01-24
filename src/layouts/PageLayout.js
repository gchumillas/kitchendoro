import React from 'react'
import { SafeAreaView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { tw } from '~/src/libs/tailwind'
import { useStatusBarHeight } from '~/src/hooks/utils'

const PageLayout = ({ footer, children }) => {
  const height = useStatusBarHeight()

  return <SafeAreaView style={{ ...tw('flex h-full bg-dark'), paddingTop: height }}>
    {children}
    {footer}
    <StatusBar style="light" />
  </SafeAreaView>
}

export default PageLayout
