import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';

export function useNotificationNavigation() {
  const router = useRouter();

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener(response => {
        const screen =
          response.notification.request.content.data?.screen;
        if (typeof screen === 'string') {
          // navigate to the provided route (keeps behavior simple)
          router.push(screen);
        }
      });

    return () => subscription.remove();
  }, [router]);
}
