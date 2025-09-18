/**
 * This file defines the StatsHeader component, which is the header for the
 * stats screen. It includes user information, theme selection, and tabs for
 * switching between personal and creator stats.
 */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme, SegmentedControl, NeumorphicButton } from '@ui';
import { Feather } from '@expo/vector-icons';
import { PlanTag } from '../lib/plan-data';

/**
 * The tabs for the main segmented control (Personal vs. Creator).
 */
const TABS = [
  { key: 'personal', title: 'Personal', iconName: 'user' },
  { key: 'creator', title: 'Creator', iconName: 'edit-3' },
];

/**
 * The tabs for the theme segmented control (Auto, Light, Dark).
 */
const THEME_TABS = [
  { key: 'auto', title: 'Auto', iconName: 'cpu' },
  { key: 'light', title: 'Light', iconName: 'sun' },
  { key: 'dark', title: 'Dark', iconName: 'moon' },
];

/**
 * The header component for the stats screen.
 * @param {object} props - The component props.
 * @param {object} props.user - The user object.s
 * @param {string} props.activeTab - The currently active tab.
 * @param {(key: string) => void} props.onTabPress - A function to call when a tab is pressed.
 * @param {boolean} props.isThemeExpanded - Whether the theme selection is expanded.
 * @param {() => void} props.onToggleThemeExpanded - A function to call when the theme selection is toggled.
 */
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
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.small,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
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
    editProfileButton: {
      flex: 1,
      marginHorizontal: 16,
    },
  });

  return (
    <View style={styles.headerContainer}>
      {/* Row 1: Title and theme controls */}
      <View style={styles.row1}>
        <Text style={styles.statsTitle}>My Stats</Text>
        <View style={styles.themeControlContainer}>
          {/* A button to quickly toggle between light and dark mode. */}
          <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
            <Feather name={theme === 'light' ? 'moon' : 'sun'} size={20} color={colors.text} />
          </TouchableOpacity>
          {/* A button to expand or collapse the theme selection segmented control. */}
          <TouchableOpacity style={styles.expansionButton} onPress={onToggleThemeExpanded}>
            <Feather name={isThemeExpanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* The expanded theme selection segmented control, shown only when isThemeExpanded is true. */}
      {isThemeExpanded && (
        <View style={styles.expandedThemeContainer} onStartShouldSetResponder={() => true}>
          <SegmentedControl
            tabs={THEME_TABS}
            activeTabKey={themePreference}
            onTabPress={setThemePreference}
          />
        </View>
      )}

      {/* Row 2: User info and edit profile button */}
      <View style={styles.row2}>
        <View style={styles.userInfoContainer}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <View style={styles.userTextContainer}>
            {user.plan && <PlanTag plan={user.plan} />}
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.editProfileButton}>
        <NeumorphicButton
          title="Edit Profile"
          onPress={() => {}}
          style={{ backgroundColor: colors.primary, paddingVertical: 8, paddingHorizontal: 16 }}
          textStyle={{ color: colors.white, ...typography.fonts.body, fontWeight: 'bold' }}
        />
        </View>
      </View>

      {/* Row 3: Main segmented control for switching between stats views */}
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
