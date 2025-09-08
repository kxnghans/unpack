import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

export const PillButton = ({ label, isActive, onPress }) => {
  const { colors } = useTheme();

  const containerStyle = {
    backgroundColor: isActive ? colors.primary : colors.background,
    borderColor: colors.primary,
  };

  const textStyle = {
    color: isActive ? colors.background : colors.primary,
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 6,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});
