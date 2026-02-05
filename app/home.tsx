import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import { getUser, StoredUser } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getPushToken } from '@/utils/pushtoken';

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const sendNotification = async () => {
    const token = await getPushToken();
    if (!token) return;

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        title: 'New Products',
        body: 'Tap to view products',
        data: {
          screen: '/screens/product',
        },
        sound: 'default',
        priority: 'high',
      }),
    });
  };

  useEffect(() => {
    (async () => {
      const u = await getUser();
      setUser(u);
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <AppHeader title={`Welcome, ${user?.name}`} />

      <View style={styles.container}>
        <AppButton title="Profile" onPress={() => router.push('/profile')} leftIcon={<Ionicons name="person" size={18} color="#fff" />} />
        <AppButton title="About" onPress={()=>{}} leftIcon={<Ionicons name="information-circle" size={18} color="#fff" />} />
        <AppButton title="Weather" onPress={() => router.push('/screens/weather')} leftIcon={<Ionicons name="cloud" size={18} color="#fff" />} />
        <AppButton title="Product" onPress={() => router.push('/screens/product')} leftIcon={<Ionicons name="pricetag" size={18} color="#fff" />} />
        <AppButton title="Settings" onPress={()=>{}} leftIcon={<Ionicons name="settings" size={18} color="#fff" />}/> 
        <AppButton title="Logout" onPress={() => router.replace('/login')} leftIcon={<Ionicons name="log-out" size={18} color="#fff" />} />
         <AppButton title="Send Test Notification" onPress={sendNotification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 ,width:Platform.OS==='web'?'40%':'100%',alignSelf:'center'},
});
