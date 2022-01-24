// TODO: make Android version
// TODO: (ios) No native splash screen registered for given view controller. Call 'SplashScreen.show' for given view controller first.
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import * as Notifications from 'expo-notifications'
import * as ScreenOrientation from 'expo-screen-orientation'
import { RobotoMono_400Regular, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono'
import { requestPushNotifications } from './src/libs/notifications'
import TimerPage from './src/pages/TimerPage'
import ChronoPage from './src/pages/ChronoPage'
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

const App = _ => {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular, RobotoMono_700Bold })

  React.useEffect(_ => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
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
        <Route path="/timer" element={<TimerPage />}>
          <Route path="/timer/rename-timer/:id" element={<RenameTimerDialog />} />
        </Route>
        <Route path="/chrono" element={<ChronoPage />} />
        <Route path="/" element={<Navigate to="/timer" />} />
      </Routes>
    </NativeRouter>
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
