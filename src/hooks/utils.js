import { useState, useEffect } from 'react'
import { NativeModules, StatusBarIOS, Platform, StatusBar } from 'react-native'
import get from 'lodash/get'

const { StatusBarManager } = NativeModules

export const useStatusBarHeight = () => {
  // Initialize w/ currentHeight b/c StatusBar.currentHeight works properly on android on Android
  const [height, setHeight] = useState(StatusBar.currentHeight || 0)

  useEffect(() => {
    if (Platform.OS !== 'ios') return

    StatusBarManager.getHeight(({ height }) => {
      setHeight(height)
    })
    const listener = StatusBarIOS.addListener(
      'statusBarFrameWillChange',
      data => {
        setHeight(get(data, 'statusBarData.frame.height', 0))
      }
    )

    return () => listener.remove()
  }, [])

  return height
}
