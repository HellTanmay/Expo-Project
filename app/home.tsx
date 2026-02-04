import { View, StyleSheet } from 'react-native';
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
        <AppButton title="Profile" onPress={() => router.push('/profile')} />
        <AppButton title="Settings" onPress={()=>{}}/> 
        <AppButton title="About" onPress={()=>{}} />
        <AppButton title="Logout" onPress={() => router.replace('/login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 ,width:Platform.OS==='web'?'40%':'100%',alignSelf:'center'},
});
