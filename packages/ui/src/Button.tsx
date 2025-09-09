import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native'
import { useTheme } from './ThemeProvider'

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  ...props
}) => {
  const { colors, typography } = useTheme()

  const styles = StyleSheet.create({
    button: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      ...typography.fonts.title,
      color: colors.card,
    },
  })

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={colors.card} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
