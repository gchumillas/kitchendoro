// TODO: make Android version
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native'
import { Provider } from 'react-redux'
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
import store from './src/store'

Notifications.setNotificationHandler({
  handleNotification: _ => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

const Loading = _ => {
  // we can't use tailwind features since it's not yet ready
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
    <ActivityIndicator size="large" color="white" />
    <StatusBar style="auto" />
  </View>
}

const App = _ => {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular, RobotoMono_700Bold })

  React.useEffect(_ => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    requestPushNotifications()

    const listener = Notifications.addNotificationResponseReceivedListener(_ => {
      Notifications.dismissAllNotificationsAsync()
    })

    return _ => {
      listener.remove()
    }
  }, [])

  return !fontsLoaded
    ? <Loading />
    : <Provider store={store}>
      <NativeRouter>
        <Routes>
          <Route path="/timer" element={<TimerPage />}>
            <Route path="/timer/rename-timer/:id" element={<RenameTimerDialog />} />
          </Route>
          <Route path="/chrono" element={<ChronoPage />} />
          <Route path="/" element={<Navigate to="/timer" />} />
        </Routes>
      </NativeRouter>
    </Provider>
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
