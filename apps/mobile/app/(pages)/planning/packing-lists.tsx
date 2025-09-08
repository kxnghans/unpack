import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@ui/ThemeProvider';

/**
 * A screen that displays a list of packing lists.
 * This component is a placeholder for a future feature.
 */
export default function PackingLists() {
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
      <Text style={styles.text}>Packing Lists</Text>
    </View>
  );
}
