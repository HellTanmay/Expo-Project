import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'USER';

export type StoredUser = {
  name?: string;
  email?: string;
  password?: string;
};

export async function saveUser(user: StoredUser): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    // ignore for now - caller can surface an error if needed
    console.warn('Failed to save user', e);
  }
}

export async function getUser(): Promise<StoredUser | null> {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to read user', e);
    return null;
  }
}

export async function clearUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.warn('Failed to clear user', e);
  }
}
