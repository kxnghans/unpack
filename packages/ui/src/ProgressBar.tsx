/**
 * This file defines the ProgressBar component, a progress bar with a neumorphic
 * design, used to track progress towards a target value.
 */
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * The props for the ProgressBar component.
 */
export interface ProgressBarProps {
  /**
   * The current value of the progress bar.
   */
  currentValue: number;
  /**
   * The target value of the progress bar.
   */
  targetValue: number;
  /**
   * The variant of the progress bar.
   */
  variant?: 'simplified' | 'full';
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
 * A progress bar component with a neumorphic design.
 * It can be used to visualize progress towards a target, with different variants for display.
 */
export function ProgressBar({ currentValue, targetValue, variant = 'full' }: ProgressBarProps) {
  const { colors, typography } = useTheme();
  const [targetLabelWidth, setTargetLabelWidth] = useState(0);
  const progress = targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
  // The max progress is used to scale the bar when the current value exceeds the target.
  const maxProgress = currentValue > targetValue * 1.1 ? currentValue : (targetValue > 0 ? (targetValue * 1.1) : 1.1);
  const displayProgress = maxProgress > 0 ? (currentValue / maxProgress) * 100 : 0;

  const isSimplified = variant === 'simplified';

  /**
   * Returns the color of the progress bar based on the progress percentage.
   * @returns The color of the progress bar.
   */
  const getBarColor = () => {
    if (progress < 20) return colors.danger;
    if (progress < 60) return colors.warning;
    return colors.success;
  };

  const styles = StyleSheet.create({
    wrapper: {
      marginTop: 8,
    },
    progressBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    container: {
      height: isSimplified ? 10 : 24,
      backgroundColor: colors.background,
      borderRadius: 5,
      overflow: 'hidden',
      flex: 1,
      justifyContent: 'center',
    },
    bar: {
      height: '100%',
      width: `${displayProgress > 100 ? 100 : displayProgress}%`,
      backgroundColor: getBarColor(),
      justifyContent: 'center',
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
      backgroundColor: progress < 100 ? colors.text : colors.background,
      left: `${(targetValue / maxProgress) * 100}%`,
    },
    targetValueLabelContainer: {
      position: 'absolute',
      left: `${(targetValue / maxProgress) * 100}%`,
      top: isSimplified ? 12 : 26,
      marginLeft: -targetLabelWidth / 2,
      paddingVertical: 4,
    },
    targetValueLabel: {
      ...typography.fonts.caption,
      color: colors.textSecondary,
    },
    infoContainer: {
      marginTop: isSimplified ? 8 : 24,
    },
    infoText: {
      ...typography.fonts.subtitle,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    emphasizedText: {
      ...typography.fonts.subtitle,
      color: colors.text,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.progressBarContainer}>
        <NeumorphicWrapper style={{ borderRadius: 5, flex: 1 }}>
          <View style={styles.container}>
            {/* The main progress bar. */}
            <View style={styles.bar} />
            {/* An additional bar to show progress over the target. */}
            {progress >= 100 && <View style={styles.overTargetBar} />}
            {/* A line to indicate the target value. */}
            {targetValue > 0 && <View style={styles.targetLine} />}
          </View>
          {/* The label for the target value, shown only in the full variant. */}
          {!isSimplified && <View style={styles.targetValueLabelContainer}>
            <Text onLayout={(e) => setTargetLabelWidth(e.nativeEvent.layout.width)} style={styles.targetValueLabel}>Target: ${targetValue.toFixed(0)}</Text>
          </View>}
        </NeumorphicWrapper>
      </View>
      {/* The informational text below the progress bar. */}
      <View style={styles.infoContainer}>
        {isSimplified ? (
          <Text style={styles.infoText}>
            Redeemed <Text style={styles.emphasizedText}>{progress.toFixed(0)}%</Text> of target worth <Text style={styles.emphasizedText}>${currentValue.toFixed(0)}</Text>
          </Text>
        ) : (
          <Text style={styles.infoText}>
            Now redeemed <Text style={styles.emphasizedText}>{progress.toFixed(0)}%</Text> of target worth <Text style={styles.emphasizedText}>${currentValue.toFixed(0)}</Text> in value
          </Text>
        )}
      </View>
    </View>
  );
}