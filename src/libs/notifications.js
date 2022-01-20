import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device'

export const requestPushNotifications = async _ => {
  if (!Device.isDevice) {
    throw new Error('Must use physical device for Push Notifications')
  }

  let status = (await Notifications.getPermissionsAsync()).status
  if (status != 'granted') {
    status = (await Notifications.requestPermissionsAsync()).status
  }

  if (status != 'granted') {
    throw new Error('Failed to get push token for push notification!')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    })
  }
}

export const pushNotification = ({ seconds }) => Notifications.scheduleNotificationAsync({
  content: {
    title: "You've got mail! 📬",
    body: 'Here is the notification body',
    data: { data: 'goes here' }
  },
  trigger: { seconds }
})

export const cancelNotification = notificationId => Notifications.cancelScheduledNotificationAsync(notificationId)
