/**
 * This file defines the NeumorphicToggle component, a switch with a neumorphic
 * design that gives it a soft, inset look.
 */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A neumorphic toggle switch.
 * @param {object} props - The component props.
 * @param {boolean} props.value - The current value of the toggle.
 * @param {(value: boolean) => void} props.onValueChange - A function to call when the value changes.
 */
export const NeumorphicToggle = ({ value, onValueChange }) => {
  const { colors, neumorphic, theme } = useTheme();

  const styles = StyleSheet.create({
    // The main container for the toggle.
    container: {
      width: 80,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.background,
      justifyContent: 'center',
      padding: 4,
    },
    // The track of the toggle.
    track: {
      width: '100%',
      height: '100%',
      borderRadius: 16,
      backgroundColor: theme === 'dark' ? colors.highlight : colors.white,
      shadowColor: theme === 'dark' ? colors.black : colors.shadow,
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: theme === 'dark' ? 1 : 0.7,
      shadowRadius: 3,
    },
    // The inset shadow for the track.
    trackInset: {
      shadowColor: colors.shadow,
      shadowOffset: { width: -2, height: -2 },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    // The thumb of the toggle.
    thumb: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      position: 'absolute',
      left: value ? 46 : 10,
      ...neumorphic,
    },
    // The highlight for the thumb.
    thumbHighlight: {
      shadowColor: colors.shadow,
      shadowOffset: { width: -3, height: -3 },
      shadowOpacity: 1,
      shadowRadius: 4,
    },
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <View style={styles.container}>
        <View style={styles.track}>
          <View style={styles.trackInset} />
        </View>
        <View style={styles.thumb}>
          <View style={styles.thumbHighlight} />
        </View>
      </View>
    </Pressable>
  );
};