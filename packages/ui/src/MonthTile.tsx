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

export function MonthTile({ month, isUsed, estimatedValue, onToggle, currentMonth }: MonthTileProps) {
  const { colors, typography } = useTheme();

  const monthIndex = new Date(Date.parse(month + " 1, 2021")).getMonth();
  const isPast = monthIndex < currentMonth;

  const monthlyValue = () => {
    const numericValue = parseFloat(estimatedValue.replace(/[^0-9.-]+/g,""));
    return `$${Math.round(numericValue / 12)}`;
  };

  const styles = StyleSheet.create({
    tile: {
      width: 40,
      height: 40,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isUsed ? colors.success : isPast ? colors.danger : colors.surface,
      marginHorizontal: 4,
    },
    monthText: {
      ...typography.fonts.caption,
      color: isUsed || isPast ? colors.white : colors.textSecondary,
    },
  });

  return (
    <TouchableOpacity onPress={onToggle}>
      <NeumorphicWrapper style={{ borderRadius: 8 }}>
        <View style={styles.tile}>
          <Text style={styles.monthText}>{isUsed ? monthlyValue() : month}</Text>
        </View>
      </NeumorphicWrapper>
    </TouchableOpacity>
  );
}