/**
 * This file defines the FilterDrawer component, a sidebar drawer that displays
 * a list of filters.
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@ui/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';

/**
 * A drawer that displays a list of filters.
 * @param {object} props - The component props.
 * @param {Array<object>} props.filters - An array of filters to display.
 * @param {(id: string) => void} props.onFilterPress - A function to call when a filter is pressed.
 */
const FilterDrawer = ({ filters, onFilterPress }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    sidebarContainer: {
      backgroundColor: colors.background,
      paddingHorizontal: 5,
      paddingBottom: 5,
      width: 80,
      flexDirection: 'row',
    },
    divider: {
      width: 1,
      height: '100%',
      backgroundColor: colors.background,
      shadowColor: '#000',
      shadowOffset: {
        width: 2,
        height: 0,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
    },
    filterItem: {
      alignItems: 'center',
      paddingVertical: 15,
    },
    filterTitle: {
      ...typography.fonts.caption,
      color: colors.text,
      marginTop: 4,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.sidebarContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={styles.filterItem}
            onPress={() => onFilterPress(filter.id)}
          >
            <FontAwesome name={filter.icon} size={20} color={colors.text} />
            <Text style={styles.filterTitle}>{filter.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* A vertical divider with a shadow to separate the drawer from the main content. */}
      <View style={styles.divider} />
    </View>
  );
};

export default FilterDrawer;