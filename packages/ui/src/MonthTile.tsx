import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';

export interface MonthTileProps {
  month: string;
  isUsed: boolean;
  estimatedValue: string;
  onToggle: () => void;
  currentMonth: number;
}

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

export function MonthTile({ month, label, isUsed, estimatedValue, onToggle, currentMonth, periodType = 'monthly' }: MonthTileProps) {
  const { colors, typography } = useTheme();

  const monthIndex = month ? new Date(Date.parse(month + " 1, 2021")).getMonth() : 0;
  const isPast = monthIndex < currentMonth;

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
      backgroundColor: isUsed ? colors.success : isPast && periodType === 'monthly' ? colors.danger : colors.surface,
      marginHorizontal: 4,
    },
    monthText: {
      ...typography.fonts.caption,
      color: isUsed || (isPast && periodType === 'monthly') ? colors.white : colors.textSecondary,
    },
  });

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