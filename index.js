import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { NativeRouter, Routes, Route } from 'react-router-native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { RobotoMono_400Regular, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono'
import HomePage from './src/pages/HomePage'
import RenameTimerDialog from './src/pages/RenameTimerDialog'

// TODO: prevent from sleeping
const App = _ => {
  return <NativeRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/rename-timer/:id" element={<RenameTimerDialog />} />
      </Route>
    </Routes>
  </NativeRouter>
}

const Loading = _ => {
  // we can't use tailwind features since it's not yet ready
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
    <StatusBar style="auto" />
  </View>
}

const AppLoader = _ => {
  const [fontsLoaded] = useFonts({ RobotoMono_400Regular, RobotoMono_700Bold })

  return fontsLoaded ? <App /> : <Loading />
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(AppLoader)
