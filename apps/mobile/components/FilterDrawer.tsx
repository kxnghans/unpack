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

const FilterDrawer = ({ filters, onFilterPress }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    sidebarContainer: {
      backgroundColor: colors.background,
      paddingTop: 20,
      paddingHorizontal: 5,
      borderRightWidth: 1,
      borderRightColor: colors.border,
      width: 80,
    },
    filterItem: {
      alignItems: 'center',
      paddingVertical: 15,
    },
    filterTitle: {
      ...typography.fonts.subtitle,
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
            <FontAwesome name={filter.icon} size={24} color={colors.text} />
            <Text style={styles.filterTitle}>{filter.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterDrawer;