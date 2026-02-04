import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Platform,
} from 'react-native';

type AppInputProps = TextInputProps & {
  style?: ViewStyle;
};

export default function AppInput({ style, ...rest }: AppInputProps) {
  return (
    <TextInput
      {...rest}
      style={[styles.input, style]}
      placeholderTextColor="#9ca3af"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#e6edf3',
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#0f172a',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6 },
      android: { elevation: 1 },
    }),
  },
});
