import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useTheme } from '@ui/ThemeProvider';

export default function PersonalScreen() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    mainTitle: {
      color: colors.text,
      marginBottom: 16,
      ...typography.fonts.pageHeader,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Personal</Text>
      </View>
    </View>
  );
}
