/**
 * This file defines the PieChart component, which is a circular chart that
 * displays progress towards a goal.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from './ThemeProvider';

/**
 * The props for the PieChart component.
 */
export interface PieChartProps {
  /**
   * The progress of the chart, from 0 to 1.
   */
  progress: number;
  /**
   * The size of the chart (width and height).
   */
  size: number;
}

/**
 * A circular chart that displays progress.
 * It's used to show the progress of savings goals and other metrics.
 */
export const PieChart: React.FC<PieChartProps> = ({ progress, size }) => {
  const { colors, typography } = useTheme();
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      ...typography.fonts.title,
      color: colors.text,
      position: 'absolute',
    },
    backgroundCircle: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      borderRadius: size / 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.backgroundCircle} />
      <Svg width={size} height={size}>
        {/* The background circle of the chart. */}
        <Circle
          stroke={colors.border}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* The progress arc of the chart. */}
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
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {/* The text in the center of the chart, showing the percentage. */}
      <Text style={styles.text}>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};
