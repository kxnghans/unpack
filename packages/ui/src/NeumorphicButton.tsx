/**
 * This file defines the NeumorphicButton component, a button with a neumorphic
 * design that gives it a soft, extruded look.
 */
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A button with a neumorphic design.
 * @param {object} props - The component props.
 * @param {() => void} props.onPress - A function to call when the button is pressed.
 * @param {string} props.title - The text to display on the button.
 * @param {object} props.style - Custom styles for the button.
 * @param {object} props.textStyle - Custom styles for the text.
 */
export const NeumorphicButton = ({ onPress, title, style, textStyle }) => {
  const { colors, typography, theme } = useTheme();

  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 6, height: 6 },
      shadowOpacity: theme === 'dark' ? 0.3 : 1,
      shadowRadius: 5,
      elevation: 8,
    },
    button: {
      borderRadius: 10,
      shadowColor: colors.highlight,
      shadowOffset: { width: -6, height: -6 },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 8,
      backgroundColor: colors.background, // Default to neutral background color
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...typography.fonts.title,
      color: colors.text, // Default to primary text color
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      {/* The neumorphic effect is created by nesting two views with different shadows. */}
      <View style={styles.buttonContainer}>
        <View style={StyleSheet.compose(styles.button, style)}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
