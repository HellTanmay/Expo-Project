import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, View } from 'react-native';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function AppButton({
  title,
  onPress,
  style,
  disabled = false,
  leftIcon,
  rightIcon,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}
      <Text style={styles.text}>{title}</Text>
      {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fa993eff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#fff200ff',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    backgroundColor: '#d1c090ff',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  iconLeft: { marginRight: 10 },
  iconRight: { marginLeft: 10 },
});
