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

export const SegmentedControl = ({ tabs, activeTabKey, onTabPress }) => {
  const { colors, typography } = useTheme(); // Get theme context
  const [internalActiveKey, setInternalActiveKey] = useState(activeTabKey);

  const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      borderRadius: 20,
      padding: 4,
      backgroundColor: colors.surface,
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
      backgroundColor: colors.background, // Use theme background for active tab
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

  const AnimatedTab = ({ title, iconName, isActive, onPress }) => {
    const iconColor = isActive ? colors.primary : colors.textSecondary;
    const textColor = isActive ? colors.primary : colors.textSecondary;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.tab, isActive && styles.activeTab]}>
        <Feather name={iconName} size={16} color={iconColor} />
        <Text style={[typography.fonts.title, { color: textColor, marginLeft: 8 }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setInternalActiveKey(activeTabKey);
  }, [activeTabKey]);

  const handlePress = (tabKey: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setInternalActiveKey(tabKey);
    onTabPress(tabKey);
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map(tab => (
        <AnimatedTab
          key={tab.key}
          title={tab.title}
          iconName={tab.iconName}
          isActive={internalActiveKey === tab.key}
          onPress={() => handlePress(tab.key)}
        />
      ))}
    </View>
  );
};
