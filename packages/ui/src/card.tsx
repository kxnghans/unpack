import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeProvider'

/**
 * The props for the Card component.
 */
export interface CardProps {
  /**
   * The title of the card.
   */
  title: string
  /**
   * The subtitle of the card.
   */
  subtitle?: string
  /**
   * The function to call when the card is pressed.
   */
  onPress?: () => void
}

/**
 * A reusable card component.
 * This component can be used to display a title, subtitle, and handle a press event.
 */
export function Card({ title, subtitle, onPress }: CardProps) {
  const { colors, typography, shadows } = useTheme()

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    title: {
      color: colors.text,
      ...typography.fonts.title,
    },
    subtitle: {
      color: colors.text,
      ...typography.fonts.subtitle,
    },
  })

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </Pressable>
  )
}
