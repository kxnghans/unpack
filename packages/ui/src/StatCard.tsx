/**
 * This file defines the StatCard component, a card used for displaying a single
 * statistic with a label, value, and optional unit and icon.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * The props for the StatCard component.
 */
export type StatCardProps = {
  /**
   * The label for the stat.
   */
  label: string;
  /**
   * The value of the stat.
   */
  value: string;
  /**
   * The unit of the stat.
   */
  unit?: string;
  /**
   * The icon to display on the card.
   */
  icon?: React.ReactNode; // For now, we'll just pass a node
};

/**
 * A card that displays a stat, such as a number or a percentage.
 * It features a neumorphic design and can include an icon.
 */
export const StatCard = ({ label, value, unit, icon }: StatCardProps) => {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: spacing.medium,
      backgroundColor: colors.background,
      borderRadius: spacing.medium,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      marginBottom: spacing.small,
    },
    value: {
      ...typography.fonts.title,
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
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View>
        <Text style={styles.value}>
          {value}
          {/* The unit is displayed as a smaller text next to the value. */}
          {unit && <Text style={styles.unit}> {unit}</Text>}
        </Text>
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    // The card is wrapped in two views to create the neumorphic shadow effect.
    <View style={[styles.darkShadow, styles.shadowWrapper]}>
      <View style={styles.lightShadow}>{cardContent}</View>
    </View>
  );
};
