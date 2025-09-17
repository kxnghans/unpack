/**
 * This file defines the Wave component, a decorative, wave-like background
 * element used for adding visual interest to components like the HubCard.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from './ThemeProvider';

/**
 * A wave-like background component.
 * It's a decorative element that uses an SVG path to create a wave shape.
 */
export function Wave() {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 1440 320"
        style={styles.svg}
      >
        {/* The SVG path that creates the wave shape. */}
        <Path
          fill={colors.primary}
          fillOpacity="0.1"
          d="M0,32L48,37.3C96,43,192,53,288,85.3C384,117,480,171,576,170.7C672,171,768,117,864,96C960,75,1056,85,1152,106.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: '50%',
  },
  svg: {
    transform: [{ rotate: '180deg' }],
  }
});
