/**
 * This file defines the SegmentedControl component, a customizable control that
 * allows users to switch between different views or tabs.
 */
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

// Enable layout animations on Android for a smoother tab switching effect.
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * A segmented control component that allows the user to switch between different views.
 * @param {object} props - The component props.
 * @param {Array<object>} props.tabs - An array of tabs to display.
 * @param {string} props.activeTabKey - The key of the currently active tab.
 * @param {(key: string) => void} props.onTabPress - A function to call when a tab is pressed.
 */
export const SegmentedControl = ({ tabs, activeTabKey, onTabPress }) => {
  const { colors, typography } = useTheme(); 
  const [internalActiveKey, setInternalActiveKey] = useState(activeTabKey);

  const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      borderRadius: 30,
      padding: 4,
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
    },
    activeTab: {
      flex: 1,
      backgroundColor: colors.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    inactiveTab: {
      backgroundColor: 'transparent',
    },
  });

  /**
   * A component that represents a single tab in the segmented control.
   * It includes an icon and a title, and animates between active and inactive states.
   * @param {object} props - The component props.
   * @param {string} props.title - The title of the tab.
   * @param {string} props.iconName - The name of the icon to display on the tab.
   * @param {boolean} props.isActive - Whether the tab is currently active.
   * @param {() => void} props.onPress - A function to call when the tab is pressed.
   */
  const AnimatedTab = ({ title, iconName, isActive, onPress }) => {
    const iconColor = isActive ? colors.primary : colors.textSecondary;
    const textColor = isActive ? colors.primary : colors.textSecondary;

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.tab,
          isActive ? styles.activeTab : styles.inactiveTab,
        ]}
      >
        <Feather name={iconName} size={16} color={iconColor} />
        <Text style={[typography.fonts.title, { color: textColor, marginLeft: 8 }]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // Update the internal active key when the activeTabKey prop changes from the parent.
  useEffect(() => {
    setInternalActiveKey(activeTabKey);
  }, [activeTabKey]);

  /**
   * Handles a press on a tab, triggering a layout animation and calling the onTabPress callback.
   * @param {string} tabKey - The key of the tab that was pressed.
   */
  const handlePress = (tabKey: string) => {
    // Animate the layout change for a smooth transition between tabs.
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
