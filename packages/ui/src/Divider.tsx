import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

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
