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
