import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AppInput from '../components/AppInput';
import AppButton from '../components/AppButton';
import { getUser } from '../utils/storage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill both fields');
      return;
    }

    setLoading(true);
    const user = await getUser();
    setLoading(false);

    if (!user) {
      Alert.alert('No account', 'No registered account found. Please create one.');
      return;
    }

    if (user.email !== email || user.password !== password) {
      setError('Invalid credentials');
      return;
    }

    // success
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome back</Text>
        <AppInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <AppInput placeholder="Password"  value={password} onChangeText={setPassword} />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <AppButton title={loading ? 'Signing in...' : 'Login'} onPress={handleLogin} disabled={loading} />

        <TouchableOpacity>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f8fafc',width:Platform.OS==='web'?'40%':'100%',alignSelf:'center' },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 3 },
  link: { textAlign: 'center', marginTop: 10, color: '#4f46e5' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 10, color: '#0f172a', textAlign:'center'},
  error: { color: '#dc2626', textAlign: 'center', marginBottom: 8 },
});
