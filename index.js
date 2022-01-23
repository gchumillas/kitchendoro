// TODO: make Android version
// TODO: keep screen awake
// TODO: only portrait mode
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NativeRouter, Routes, Route } from 'react-router-native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import { RobotoMono_400Regular, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono'
import { requestPushNotifications } from './src/libs/notifications'
import HomePage from './src/pages/HomePage'
import RenameTimerDialog from './src/pages/RenameTimerDialog'
import './src/i18n'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

const Loading = _ => {
  // we can't use tailwind features since it's not yet ready
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
    <StatusBar style="auto" />
  </View>
}

// TODO: prevent from sleeping
// TODO: (ios) No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.
const App = _ => {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular, RobotoMono_700Bold })

  React.useEffect(_ => {
    requestPushNotifications()

    const responseListener = Notifications.addNotificationResponseReceivedListener(res => {
      Notifications.dismissAllNotificationsAsync()
    })

    return _ => {
      responseListener.remove()
    }
  }, [])

  return !fontsLoaded
    ? <Loading />
    : <NativeRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/rename-timer/:id" element={<RenameTimerDialog />} />
        </Route>
      </Routes>
    </NativeRouter>
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
