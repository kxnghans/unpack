import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from './ThemeProvider';

export interface ProgressBarProps {
  currentValue: number;
  targetValue: number;
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

export function ProgressBar({ currentValue, targetValue }: ProgressBarProps) {
  const { colors, typography } = useTheme();
  const progress = targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
  const maxProgress = targetValue > 0 ? (targetValue * 1.1) : 1.1;
  const displayProgress = maxProgress > 0 ? (currentValue / maxProgress) * 100 : 0;

  const getBarColor = () => {
    if (progress < 20) return colors.danger;
    if (progress < 60) return colors.warning;
    return colors.success;
  };

  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 8,
    },
    container: {
      height: 10,
      backgroundColor: colors.surface,
      borderRadius: 5,
      overflow: 'hidden',
    },
    bar: {
      height: '100%',
      width: `${displayProgress > 100 ? 100 : displayProgress}%`,
      backgroundColor: getBarColor(),
    },
    overTargetBar: {
      height: '100%',
      backgroundColor: colors.primary,
      position: 'absolute',
      left: `${(targetValue / maxProgress) * 100}%`,
      width: `${((currentValue - targetValue) / maxProgress) * 100}%`,
    },
    targetLine: {
      position: 'absolute',
      height: '100%',
      width: 2,
      backgroundColor: colors.border,
      left: `${(targetValue / maxProgress) * 100}%`,
    },
    labelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
    },
    label: {
      ...typography.fonts.caption,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.wrapper}>
      <NeumorphicWrapper style={{ borderRadius: 5 }}>
        <View style={styles.container}>
          <View style={styles.bar} />
          {progress >= 100 && <View style={styles.overTargetBar} />}
          {targetValue > 0 && <View style={styles.targetLine} />}
        </View>
      </NeumorphicWrapper>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>${currentValue.toFixed(2)}</Text>
        <Text style={styles.label}>{progress.toFixed(0)}%</Text>
        <Text style={styles.label}>${targetValue.toFixed(2)}</Text>
      </View>
    </View>
  );
}
