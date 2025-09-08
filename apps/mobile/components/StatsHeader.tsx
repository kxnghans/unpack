import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme, SegmentedControl } from '@ui';

const TABS = [
  { key: 'personal', title: 'Personal', iconName: 'user' },
  { key: 'creator', title: 'Creator', iconName: 'edit-3' },
];

export const StatsHeader = ({ user, activeTab, onTabPress }) => {
  const { colors, typography } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <Text style={[typography.fonts.sectionHeader, { color: colors.text }]}>My Stats</Text>
        <View style={styles.userContainer}>
          <Image source={{ uri: user.image }} style={styles.avatar} />
          <Text style={[typography.fonts.subtitle, { color: colors.textSecondary }]}>{user.name}</Text>
        </View>
      </View>
      <SegmentedControl
        tabs={TABS}
        activeTabKey={activeTab}
        onTabPress={onTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Align items to the top
    marginBottom: 16,
  },
  userContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end', // Align to the right
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4, // Space between avatar and name
  },
});
