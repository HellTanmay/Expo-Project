import { Stack } from 'expo-router';
import { registerForPushNotificationsAsync } from '../utils/registerForPushNotification';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNotificationNavigation } from './hooks/useNotificationNavigation';



  Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList  : true,
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Layout() {

  useEffect(() => {
  registerForPushNotificationsAsync();
}, []);

  // ensure notification response navigation is registered at app root
  useNotificationNavigation();


  return (
    
    <Stack screenOptions={{ headerShown: false }} />
  );
}
