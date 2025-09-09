import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

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
    <View style={styles.darkShadow}>
        <View style={styles.lightShadow}>
            <View style={styles.container} />
        </View>
  </View>
  )
}
