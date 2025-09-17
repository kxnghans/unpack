import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from './tokens';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

/**
 * The props for the HubRow component.
 */
export interface HubRowProps {
  /**
   * The icon to display on the left side of the row.
   */
  icon: React.ReactNode;
  /**
   * The title of the row.
   */
  title: React.ReactNode;
  /**
   * A list of rewards to display below the title.
   */
  rewards?: {
    text: string;
    icon: string;
    color: keyof typeof theme.light.colors;
  }[];
  /**
   * The progress to display below the title.
   */
  progress?: {
    currentValue: number;
    targetValue: number;
    variant?: ProgressBarProps['variant'];
  };
  /**
   * A function to call when the row is pressed.
   */
  onPress?: () => void;
}

/**
 * A row component that displays an icon, a title, and optional rewards or a progress bar.
 * This is typically used within a "hub" or a list of items to navigate to other screens.
 */
export function HubRow({ icon, title, rewards, progress, onPress }: HubRowProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconContainer: {
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rewardsContainer: {
      marginTop: 8,
    },
    rewardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    rewardText: {
            ...typography.fonts.body,
      color: colors.textSecondary,
      marginLeft: 8,
    },
  });

  return (
    // The entire row is pressable if an onPress function is provided.
    <Pressable onPress={onPress} style={styles.container}>
      {/* Left side icon */}
      <View style={styles.iconContainer}>{icon}</View>
      {/* Middle section with title and optional content */}
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>{title}</View>
        {/* Conditionally render a progress bar if progress data is provided. */}
        {progress && (
          <ProgressBar
            currentValue={progress.currentValue}
            targetValue={progress.targetValue}
            variant={progress.variant}
          />
        )}
        {/* Conditionally render a list of rewards if rewards data is provided. */}
        {rewards && (
          <View style={styles.rewardsContainer}>
            {rewards.map((reward, index) => (
              <View key={index} style={styles.rewardRow}>
                <FontAwesome5
                  name={reward.icon}
                  size={12}
                  color={colors[reward.color]}
                />
                <Text style={styles.rewardText}>{reward.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      {/* Right side chevron icon to indicate it's pressable */}
      <FontAwesome5 name="chevron-right" size={16} color={colors.text} />
    </Pressable>
  );
}