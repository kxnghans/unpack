/**
 * This file defines a customizable Button component for the application.
 * It supports different variants, disabled states, and loading indicators.
 */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * A customizable button component.
 * @param {object} props - The component props.
 * @param {string} props.title - The text to display on the button.
 * @param {() => void} props.onPress - The function to call when the button is pressed.
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The button variant.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {boolean} [props.loading=false] - Whether the button is in a loading state.
 */
export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  ...props
}) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      opacity: disabled ? 0.5 : 1,
      width: '100%',
    },
    text: {
      ...typography.fonts.title,
      color: colors.card,
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {/* Show an activity indicator when the button is in the loading state. */}
      {loading ? (
        <ActivityIndicator color={colors.card} />
      ) : (
        // Otherwise, show the button title.
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
