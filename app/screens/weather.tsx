import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Platform, Image, ScrollView } from 'react-native';
import axios from 'axios';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import AppHeader from '@/components/AppHeader';

const API_KEY = '0873dfc7b92a8045557f16872dac7c89';

export default function WeatherScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    try {
      setLoading(true);
      setWeather(null);

      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/weather',
        {
          params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
          },
        }
      );

      setWeather(response.data);
    } catch (error: any) {
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'City not found');
      } else {
        Alert.alert('Error', 'Network error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader title="Weather" />
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Weather</Text>

        <AppInput
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
        />

        <AppButton
          title={loading ? 'Fetching...' : 'Get Weather'}
          onPress={fetchWeather}
          disabled={loading}
        />

        {loading && <ActivityIndicator style={{ marginTop: 15 }} />}

        {weather && (
          <View style={styles.resultCard}>
            <View style={styles.resultTop}>
              <View style={styles.tempWrap}>
                <Text style={styles.city}>{weather.name}</Text>
                <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
                <Text style={styles.desc}>{weather.weather[0].description}</Text>
              </View>

              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png` }}
                style={styles.icon}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Feels like</Text>
              <Text style={styles.rowValue}>{Math.round(weather.main.feels_like)}°C</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Humidity</Text>
              <Text style={styles.rowValue}>{weather.main.humidity}%</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Wind</Text>
              <Text style={styles.rowValue}>{weather.wind.speed} m/s</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Pressure</Text>
              <Text style={styles.rowValue}>{weather.main.pressure} hPa</Text>
            </View>

            {/* extra info rows */}
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Min / Max</Text>
              <Text style={styles.rowValue}>{Math.round(weather.main.temp_min)}°C / {Math.round(weather.main.temp_max)}°C</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Visibility</Text>
              <Text style={styles.rowValue}>{typeof weather.visibility !== 'undefined' ? `${(weather.visibility/1000).toFixed(1)} km` : '—'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Clouds</Text>
              <Text style={styles.rowValue}>{weather.clouds?.all ?? '—'}%</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Wind dir</Text>
              <Text style={styles.rowValue}>{getWindDir(weather.wind?.deg)} {weather.wind?.deg ?? '—'}°</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Sunrise</Text>
              <Text style={styles.rowValue}>{weather.sys?.sunrise ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString() : '—'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Sunset</Text>
              <Text style={styles.rowValue}>{weather.sys?.sunset ? new Date(weather.sys.sunset * 1000).toLocaleTimeString() : '—'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Coords</Text>
              <Text style={styles.rowValue}>{weather.coord?.lat ?? '—'}, {weather.coord?.lon ?? '—'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Country</Text>
              <Text style={styles.rowValue}>{weather.sys?.country ?? '—'}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
    </View>
  );
}
// helper: convert wind degrees to compass direction
function getWindDir(deg: number | undefined) {
  if (typeof deg !== 'number') return '—';
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  const idx = Math.round(deg / 22.5) % 16;
  return dirs[idx];
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8fafc',
    width: Platform.OS === 'web' ? '40%' : '100%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
    marginBottom:50
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#0f172a',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 18,
    fontWeight: '600',
  },
  temp: {
    fontSize: 32,
    fontWeight: '700',
    marginVertical: 5,
  },
  desc: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
  extra: {
    fontSize: 14,
    marginTop: 4,
    color: '#475569',
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: '#f1f5f9',
    padding: 14,
    borderRadius: 12,
  },
  resultTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  tempWrap: { flex: 1 },
  icon: { width: 96, height: 96 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  rowLabel: { color: '#475569' },
  rowValue: { fontWeight: '600', color: '#0f172a' },
});
