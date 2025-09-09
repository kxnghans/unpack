import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AnimatedTab = ({ title, iconName, isActive, onPress }) => {
  const { colors, typography } = useTheme();

  // Determine colors based on active state and theme
  const iconColor = isActive ? colors.primary : colors.textSecondary;
  const textColor = isActive ? colors.primary : colors.textSecondary;

  // Determine background style for the active tab
  const activeTabStyle = {
    backgroundColor: colors.background, // Use theme background for active tab
  };

  const tabStyle = isActive ? [styles.activeTab, activeTabStyle] : {};

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab, tabStyle]}>
      <Feather name={iconName} size={16} color={iconColor} />
      <Text style={[typography.fonts.title, { color: textColor, marginLeft: 8 }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const SegmentedControl = ({ tabs, activeTabKey, onTabPress }) => {
  const [internalActiveKey, setInternalActiveKey] = useState(activeTabKey);

  useEffect(() => {
    // This effect syncs the internal state with the parent's prop
    // in case the parent wants to control the component from the outside.
    setInternalActiveKey(activeTabKey);
  }, [activeTabKey]);

  const handlePress = (tabKey: string) => {
    // Configure the animation before any state changes.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // Update the internal state immediately for instant visual feedback.
    setInternalActiveKey(tabKey);
    // Notify the parent component of the change.
    onTabPress(tabKey);
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <AnimatedTab
          key={tab.key}
          title={tab.title}
          iconName={tab.iconName}
          isActive={internalActiveKey === tab.key} // Use internal state for styling
          onPress={() => handlePress(tab.key)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  activeTab: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
