import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from './ThemeProvider';

export interface ProgressBarProps {
  currentValue: number;
  targetValue: number;
  variant?: 'simplified' | 'full';
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

export function ProgressBar({ currentValue, targetValue, variant = 'full' }: ProgressBarProps) {
  const { colors, typography } = useTheme();
  const [targetLabelWidth, setTargetLabelWidth] = useState(0);
  const progress = targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
  const maxProgress = currentValue > targetValue * 1.1 ? currentValue : (targetValue > 0 ? (targetValue * 1.1) : 1.1);
  const displayProgress = maxProgress > 0 ? (currentValue / maxProgress) * 100 : 0;

  const isSimplified = variant === 'simplified';

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
      backgroundColor: colors.surface,
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
            <View style={styles.bar} />
            {progress >= 100 && <View style={styles.overTargetBar} />}
            {targetValue > 0 && <View style={styles.targetLine} />}
          </View>
          {!isSimplified && <View style={styles.targetValueLabelContainer}>
            <Text onLayout={(e) => setTargetLabelWidth(e.nativeEvent.layout.width)} style={styles.targetValueLabel}>Target: ${targetValue.toFixed(0)}</Text>
          </View>}
        </NeumorphicWrapper>
      </View>
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