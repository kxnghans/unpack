/**
 * This file defines a simple Divider component.
 * It's a horizontal line used to separate content.
 */
import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A horizontal line to separate content.
 */
export function Divider() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 16,
    },
  });

  return <View style={styles.divider} />;
}
