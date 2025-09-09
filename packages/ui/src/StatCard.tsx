import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from './ThemeProvider'

export type StatCardProps = {
  label: string
  value: string
  unit?: string
  icon?: React.ReactNode // For now, we'll just pass a node
}

export const StatCard = ({ label, value, unit, icon }: StatCardProps) => {
  const { colors, typography, spacing } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.medium,
      backgroundColor: colors.surface,
      borderRadius: spacing.medium,
      margin: spacing.small,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 120,
    },
    iconContainer: {
      marginBottom: spacing.small,
    },
    value: {
      ...typography.fonts.heading3,
      textAlign: 'center',
      color: colors.text,
    },
    unit: {
      ...typography.fonts.body,
      color: colors.textSecondary,
    },
    label: {
      ...typography.fonts.body,
      textAlign: 'center',
      color: colors.textSecondary,
    },
  })

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View>
        <Text style={styles.value}>
          {value}
          {unit && <Text style={styles.unit}> {unit}</Text>}
        </Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}
