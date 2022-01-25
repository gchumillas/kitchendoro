import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { useNavigate } from 'react-router-native'
import { StatusBar } from 'expo-status-bar'
import * as Notifications from 'expo-notifications'
import { tw } from '~/src/libs/tailwind'
import { useStatusBarHeight } from '~/src/libs/status-bar'

const PageLayout = ({ footer, children }) => {
  const navigate = useNavigate()
  const height = useStatusBarHeight()

  React.useEffect(_ => {
    const listener = Notifications.addNotificationResponseReceivedListener(_ => {
      navigate('/timer')
    })

    return _ => {
      listener.remove()
    }
  }, [])

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
