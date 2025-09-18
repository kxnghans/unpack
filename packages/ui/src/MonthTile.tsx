/**
 * This file defines the MonthTile component, a small tile used to represent a
 * month or other time period for tracking reward usage.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * The props for the MonthTile component.
 */
export interface MonthTileProps {
  /**
   * The month to display.
   */
  month: string;
  /**
   * Whether the month has been used.
   */
  isUsed: boolean;
  /**
   * The estimated value of the reward for the month.
   */
  estimatedValue: string;
  /**
   * A function to call when the tile is toggled.
   */
  onToggle: () => void;
  /**
   * The current month.
   */
  currentMonth: number;
}

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
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -2,
        height: -2,
      },
      shadowOpacity: 1,
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
 * A tile that represents a month and can be toggled to indicate whether a reward has been used.
 * It can also display the value of the reward for that month.
 */
export function MonthTile({ month, label, isUsed, estimatedValue, onToggle, currentMonth, periodType = 'monthly' }: MonthTileProps) {
  const { colors, typography } = useTheme();

  const monthIndex = month ? new Date(Date.parse(month + " 1, 2021")).getMonth() : 0;
  const isPast = monthIndex < currentMonth;

  /**
   * Calculates the monthly value of the reward from the total estimated value.
   * @returns The monthly value as a string.
   */
  const monthlyValue = () => {
    const numericValue = parseFloat(estimatedValue.replace(/[^0-9.-]+/g,""));
    return `${Math.round(numericValue / 12)}`;
  };

  const styles = StyleSheet.create({
    tile: {
      width: periodType === 'monthly' ? 40 : 80,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      // The color of the tile changes based on whether the reward has been used or if the month is in the past.
      backgroundColor: isUsed ? colors.success : isPast && periodType === 'monthly' ? colors.danger : colors.background,
      marginHorizontal: 4,
    },
    monthText: {
      ...typography.fonts.caption,
      color: isUsed || (isPast && periodType === 'monthly') ? colors.white : colors.textSecondary,
    },
  });

  /**
   * Determines the text to display on the tile.
   * If the reward is used, it shows the monthly value, otherwise it shows the month's name or label.
   * @returns The text to display on the tile.
   */
  const displayText = () => {
    if (periodType === 'monthly') {
      return isUsed ? monthlyValue() : month;
    }
    return label;
  };

  return (
    <TouchableOpacity onPress={onToggle}>
      <NeumorphicWrapper style={{ borderRadius: 8 }}>
        <View style={styles.tile}>
          <Text style={styles.monthText}>{displayText()}</Text>
        </View>
      </NeumorphicWrapper>
    </TouchableOpacity>
  );
}