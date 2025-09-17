import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from './ThemeProvider';

export interface PieChartProps {
  progress: number; // 0 to 1
  size: number;
}

export function PieChart({ progress, size }: PieChartProps) {
  const { colors, typography } = useTheme();
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    neumorphicWrapper: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 5, // for Android
    },
    highlight: {
        width: size,
        height: size,
        borderRadius: size / 2,
        position: 'absolute',
        shadowColor: colors.highlight,
        shadowOffset: {
            width: -4,
            height: -4,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 5, // for Android
    },
    text: {
      ...typography.fonts.title,
      color: colors.text,
    },
  });

  return (
    <View style={styles.neumorphicWrapper}>
        <View style={styles.highlight}>
            <View style={styles.container}>
                <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
                    {/* Track */}
                    <Circle
                    stroke={colors.border}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    />
                    {/* Progress */}
                    <Circle
                    stroke={colors.primary}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    />
                </Svg>
                <View style={StyleSheet.absoluteFill}>
                    <View style={styles.container}>
                        <Text style={styles.text}>{`${Math.round(progress * 100)}%`}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
  );
}
