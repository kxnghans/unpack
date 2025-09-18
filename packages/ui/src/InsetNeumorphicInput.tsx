/**
 * This file defines the InsetNeumorphicInput component, a text input with an
 * inset neumorphic effect, often used for numerical inputs.
 */
import React from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardTypeOptions } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A wrapper component that creates an inset neumorphic effect by combining two shadows.
 * This gives the component a "pressed in" look.
 */
const InsetNeumorphicWrapper = ({ children, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    inset: {
      borderRadius: 10,
      shadowColor: colors.highlight,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      borderRadius: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.75,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.inset}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
};

/**
 * The props for the InsetNeumorphicInput component.
 */
export interface InsetNeumorphicInputProps {
  /**
   * The value of the input.
   */
  value: string;
  /**
   * A function to call when the text is changed.
   */
  onChangeText: (text: string) => void;
  /**
   * The placeholder text to display when the input is empty.
   */
  placeholder: string;
  /**
   * Whether to show a dollar sign before the input.
   */
  showDollarSign?: boolean;
  /**
   * The type of keyboard to display.
   */
  keyboardType?: KeyboardTypeOptions;
}

/**
 * A text input with an inset neumorphic effect.
 * It's designed to look like it's pressed into the background.
 */
export const InsetNeumorphicInput = ({
  value,
  onChangeText,
  placeholder,
  showDollarSign = true,
  keyboardType = 'numeric',
}: InsetNeumorphicInputProps) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    dollarSign: {
      ...typography.fonts.body,
      color: colors.textSecondary,
      marginRight: 4,
    },
    input: {
      ...typography.fonts.body,
      color: colors.text,
      flex: 1,
    },
  });

  return (
    <InsetNeumorphicWrapper>
      <View style={styles.container}>
        {/* Conditionally render a dollar sign before the input. */}
        {showDollarSign && <Text style={styles.dollarSign}>$</Text>}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      </View>
    </InsetNeumorphicWrapper>
  );
};
