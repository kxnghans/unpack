/**
 * This file defines the PillButton component, a pill-shaped button with a
 * neumorphic design.
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A wrapper component that creates a neumorphic effect by combining two shadows.
 * This gives the component a sense of depth.
 */
const NeumorphicWrapper = ({ children, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity:0.75,
      shadowRadius: 4,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 0.7,
      shadowRadius: 4,
    },
  });

  return (
    <View style={[styles.darkShadow, style]}>
      <View style={styles.lightShadow}>{children}</View>
    </View>
  );
};

/**
 * A pill-shaped button with a neumorphic design.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {() => void} props.onPress - A function to call when the button is pressed.
 */
export const PillButton = ({ children, onPress }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      backgroundColor: colors.primary,
    },
    text: {
      ...typography.fonts.title,
      color: colors.white,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      {/* The neumorphic effect is created by nesting two views with different shadows. */}
      <NeumorphicWrapper style={{ borderRadius: 30 }}>
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </NeumorphicWrapper>
    </TouchableOpacity>
  );
};
