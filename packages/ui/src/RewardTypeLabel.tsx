/**
 * This file defines the RewardTypeLabel component, a label that displays the
 * type of a reward with a corresponding icon and color.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

/**
 * The props for the RewardTypeLabel component.
 */
export interface RewardTypeLabelProps {
  /**
   * The type of the reward.
   */
  rewardType: 'annual' | 'monthly' | 'asNeeded' | 'multiYear' | 'quarterly' | 'semiannual' | 'oneTime';
}

/**
 * A label that displays the type of a reward.
 * It shows an icon and a text label with a colored background.
 */
export function RewardTypeLabel({ rewardType }: RewardTypeLabelProps) {
  const { colors, typography } = useTheme();

  /**
   * Returns the icon, color, and text for a given reward type.
   * This is a helper function to keep the rendering logic clean.
   * @param type The type of the reward.
   * @returns The attributes for the reward type.
   */
  const getRewardTypeAttributes = (type) => {
    switch (type) {
      case 'annual':
        return { icon: 'calendar-check', color: colors.annual, text: 'Annual' };
      case 'monthly':
        return { icon: 'calendar-plus', color: colors.monthly, text: 'Monthly' };
      case 'asNeeded':
        return { icon: 'calendar-day', color: colors.asNeeded, text: 'As Needed' };
      case 'multiYear':
        return { icon: 'calendar-alt', color: colors.multiYear, text: 'Multi-Year' };
      case 'quarterly':
        return { icon: 'calendar-times', color: colors.quarterly, text: 'Quarterly' };
      case 'semiannual':
        return { icon: 'calendar-check', color: colors.semiannual, text: 'Semi-Annual' };
      case 'oneTime':
        return { icon: 'star', color: colors.oneTime, text: 'One Time' };
      default:
        return { icon: '', color: '', text: '' };
    }
  };

  const { icon, color, text } = getRewardTypeAttributes(rewardType);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: color,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    icon: {
      marginRight: 6,
    },
    text: {
      ...typography.fonts.caption,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <FontAwesome5 name={icon} size={10} color={colors.textSecondary} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}
