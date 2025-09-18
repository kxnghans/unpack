/**
 * This file defines the PlanTag component and related data.
 */
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@ui';
import { Feather } from '@expo/vector-icons';

const createStyles = (theme, typography) => StyleSheet.create({
  planTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 4,
  },
  planTagText: {
    ...typography.fonts.caption,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  freePlan: {
    backgroundColor: theme === 'light' ? '#E5E7EB' : '#374151',
  },
  freePlanText: {
    color: theme === 'light' ? '#4B5563' : '#D1D5DB',
  },
  premiumPlan: {
    backgroundColor: '#FBBF24',
  },
  premiumPlanText: {
    color: theme === 'light' ? '#FFFFFF' : '#111827',
  },
});

/**
 * A component that displays a tag for the user's plan (e.g., Free or Premium).
 * @param {object} props - The component props.
 * @param {string} props.plan - The user's plan.
 */
export const PlanTag = ({ plan }) => {
  const { typography, theme } = useTheme();
  const styles = useMemo(() => createStyles(theme, typography), [theme, typography]);

  const isPremium = plan.toLowerCase() === 'premium';

  const tagStyle = isPremium ? styles.premiumPlan : styles.freePlan;
  const textStyle = isPremium ? styles.premiumPlanText : styles.freePlanText;
  const iconName = isPremium ? 'star' : 'shield';
  const iconColor = isPremium ? (theme === 'light' ? '#FFFFFF' : '#111827') : (theme === 'light' ? '#4B5563' : '#D1D5DB');

  return (
    <View style={[styles.planTag, tagStyle]}>
      <Feather name={iconName} size={12} color={iconColor} />
      <Text style={[styles.planTagText, textStyle]}>{plan}</Text>
    </View>
  );
};