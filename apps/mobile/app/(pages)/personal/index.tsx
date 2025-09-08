import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useTheme } from '@ui/ThemeProvider';

export default function PersonalScreen() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      ...typography.fonts.description,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Personal / Profile Screen</Text>
    </View>
  );
}
