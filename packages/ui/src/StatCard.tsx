import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';

export type StatCardProps = {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode; // For now, we'll just pass a node
};

export const StatCard = ({ label, value, unit, icon }: StatCardProps) => {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.medium,
      backgroundColor: colors.surface,
      borderRadius: spacing.medium,
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
    shadowWrapper: {
      flex: 1,
      margin: spacing.medium,
    },
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
    },
  });

  const cardContent = (
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
  );

  return (
    <View style={[styles.darkShadow, styles.shadowWrapper]}>
      <View style={styles.lightShadow}>{cardContent}</View>
    </View>
  );
};
