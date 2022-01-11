import React from 'react'
import { NativeRouter, Routes, Route } from 'react-router-native'
import { registerRootComponent } from 'expo'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'
import HomePage from './src/pages/HomePage'

const App = _ => {
  return <TailwindProvider utilities={utilities}>
    <NativeRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </NativeRouter>
  </TailwindProvider>
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
