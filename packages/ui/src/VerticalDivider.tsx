/**
 * This file defines the VerticalDivider component, a vertical line used to
 * separate content, with a neumorphic design.
 */
import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A vertical line to separate content.
 * It features a neumorphic design to give it a sense of depth.
 */
export function VerticalDivider() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
        width: 1,
        height: '100%',
        marginHorizontal: 16,
      },
      lightShadow: {
        shadowColor: colors.shadow,
        shadowOffset: {
          width: 2,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
      darkShadow: {
        shadowColor: colors.highlight,
        shadowOffset: {
          width: -2,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
      },
  });

  return (
    // The neumorphic effect is created by nesting two views with different shadows.
    <View style={styles.darkShadow}>
        <View style={styles.lightShadow}>
            <View style={styles.container} />
        </View>
  </View>
  )
}

