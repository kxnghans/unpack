import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme, SegmentedControl } from '@ui';
import { Feather } from '@expo/vector-icons';

const TABS = [
  { key: 'personal', title: 'Personal', iconName: 'user' },
  { key: 'creator', title: 'Creator', iconName: 'edit-3' },
];

const THEME_TABS = [
  { key: 'auto', title: 'Auto', iconName: 'cpu' },
  { key: 'light', title: 'Light', iconName: 'sun' },
  { key: 'dark', title: 'Dark', iconName: 'moon' },
];

export const StatsHeader = ({ user, activeTab, onTabPress, isThemeExpanded, onToggleThemeExpanded }) => {
  const { colors, typography, spacing, theme, themePreference, setThemePreference, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    headerContainer: {
      paddingHorizontal: spacing.large,
      paddingTop: spacing.large,
      paddingBottom: spacing.medium,
    },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.large,
    },
    row2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.large,
    },
    row3: {
      // No specific styles needed for the container, SegmentedControl will fill it
    },
    statsTitle: {
      ...typography.fonts.sectionHeader,
      color: colors.text,
    },
    themeControlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    themeToggleButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.small,
    },
    expansionButton: {
      padding: spacing.small,
    },
    expandedThemeContainer: {
      marginBottom: spacing.large,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: spacing.medium,
    },
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userTextContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    userName: {
      ...typography.fonts.title,
      color: colors.text,
    },
    planTag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    planTagText: {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginLeft: 4,
    },
    freePlan: {
      backgroundColor: colors.surface,
    },
    freePlanText: {
      color: colors.textSecondary,
    },
    premiumPlan: {
      backgroundColor: '#E4D5C3', // A subtle gold
    },
    premiumPlanText: {
      color: '#5C4033', // Dark brown
    },
    editProfileButton: {
      paddingVertical: 8,
      paddingHorizontal: 32,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    editProfileButtonText: {
      color: colors.primary,
      fontWeight: 'bold',
    },
  });

  const PlanTag = ({ plan }) => {
    const isPremium = plan.toLowerCase() === 'premium';
    const tagStyle = isPremium ? styles.premiumPlan : styles.freePlan;
    const textStyle = isPremium ? styles.premiumPlanText : styles.freePlanText;
    const iconName = isPremium ? 'award' : 'user'; // Changed crown to award
    const iconColor = isPremium ? styles.premiumPlanText.color : styles.freePlanText.color;

    return (
      <View style={[styles.planTag, tagStyle]}>
        <Feather name={iconName} size={12} color={iconColor} />
        <Text style={[styles.planTagText, textStyle]}>{plan}</Text>
      </View>
    );
  };

  return (
    <View style={styles.headerContainer}>
      {/* Row 1 */}
      <View style={styles.row1}>
        <Text style={styles.statsTitle}>My Stats</Text>
        <View style={styles.themeControlContainer}>
          <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
            <Feather name={theme === 'light' ? 'moon' : 'sun'} size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.expansionButton} onPress={onToggleThemeExpanded}>
            <Feather name={isThemeExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {isThemeExpanded && (
        <View style={styles.expandedThemeContainer} onStartShouldSetResponder={() => true}>
          <SegmentedControl
            tabs={THEME_TABS}
            activeTabKey={themePreference}
            onTabPress={setThemePreference}
          />
        </View>
      )}

      {/* Row 2 */}
      <View style={styles.row2}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <View style={styles.userTextContainer}>
            {user.plan && <PlanTag plan={user.plan} />}
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Row 3 */}
      <View style={styles.row3}>
        <SegmentedControl
          tabs={TABS}
          activeTabKey={activeTab}
          onTabPress={onTabPress}
        />
      </View>
    </View>
  );
};
