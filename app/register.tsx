import React, { useState } from 'react';
import { Text,View, StyleSheet, Alert, TouchableOpacity,Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { saveUser } from '../utils/storage';

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    await saveUser({ name, email, password });
    setLoading(false);

    Alert.alert('Success', 'Account created. Please login.');
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <AppInput placeholder="Name" value={name} onChangeText={setName} />
        <AppInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <AppInput placeholder="Password"  value={password} onChangeText={setPassword} />
        <AppInput placeholder="Confirm Password"  value={confirm} onChangeText={setConfirm} />
        <AppButton title={loading ? 'Creating...' : 'Register'} onPress={handleRegister} disabled={loading} />
        <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8fafc',width:Platform.OS==='web'?'40%':'100%',alignSelf:'center'},
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 3 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#0f172a', textAlign:'center'},
  link:{ textAlign: 'center', marginTop: 10, color: '#4f46e5' },
});
