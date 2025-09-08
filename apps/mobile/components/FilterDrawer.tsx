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
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    sidebarContainer: {
      position: 'absolute',
      left: 10, // 10px from left edge
      top: 0,
      bottom: 0,
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
      fontSize: 12,
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