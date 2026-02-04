import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import { getUser, StoredUser } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 ,width:Platform.OS==='web'?'40%':'100%',alignSelf:'center'},
});
