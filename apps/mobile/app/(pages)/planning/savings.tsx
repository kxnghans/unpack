/**
 * This file defines the SavingsScreen, which displays a list of the user's
 * savings goals, separated into "In Progress" and "Completed" sections.
 */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, UpcomingCard, PieChart, SectionHeader, Divider } from '@ui';
import { formatCurrency } from '@utils';
import { SAVINGS_GOALS } from '../../../lib/mock-data';
import { useFocusEffect } from '@react-navigation/native';

/**
 * The savings screen, displaying a list of savings goals.
 * The goals are displayed in a two-column grid, grouped by status.
 */
export default function SavingsScreen() {
  const { colors } = useTheme();
  const [isInProgressCollapsed, setIsInProgressCollapsed] = useState(false);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(false);
  const [inProgressGoals, setInProgressGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setInProgressGoals(SAVINGS_GOALS.filter(goal => goal.status === 'In Progress'));
      setCompletedGoals(SAVINGS_GOALS.filter(goal => goal.status === 'Completed'));
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContentContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContainer: {
      width: '48%',
      marginBottom: 16,
    },
  });

  /**
   * Groups an array of items into pairs for the two-column grid layout.
   * @param {Array} items - The array of items to group.
   * @returns {Array} An array of pairs.
   */
  const groupIntoPairs = (items) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push(items.slice(i, i + 2));
    }
    return pairs;
  };

  // Define the sections for the FlatList, including headers and the grouped goals.
  const sections = [
    {
      type: 'header',
      id: 'header-in-progress',
      title: 'In Progress',
      isCollapsed: isInProgressCollapsed,
      onPress: () => setIsInProgressCollapsed(!isInProgressCollapsed),
    },
    // Only include the in-progress goals if the section is not collapsed.
    ...(!isInProgressCollapsed ? groupIntoPairs(inProgressGoals).map((pair, index) => ({ type: 'goal_pair', pair, id: `in-progress-${index}` })) : []),
    {
      type: 'divider',
      id: 'divider'
    },
    {
      type: 'header',
      id: 'header-completed',
      title: 'Completed',
      isCollapsed: isCompletedCollapsed,
      onPress: () => setIsCompletedCollapsed(!isCompletedCollapsed),
    },
    // Only include the completed goals if the section is not collapsed.
    ...(!isCompletedCollapsed ? groupIntoPairs(completedGoals).map((pair, index) => ({ type: 'goal_pair', pair, id: `completed-${index}` })) : []),
  ];

  /**
   * Renders a single item in the FlatList based on its type.
   * @param {object} item - The item to render.
   */
  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return <SectionHeader title={item.title} isCollapsed={item.isCollapsed} onPress={item.onPress} />;
      case 'divider':
        return <Divider />;
      case 'goal_pair':
        return (
          <View style={styles.row}>
            {item.pair.map(goal => {
              const progress =
                goal.totalAmount && typeof goal.currentAmount === 'number' && typeof goal.totalAmount === 'number'
                  ? goal.currentAmount / goal.totalAmount
                  : 0;
              return (
                <View style={styles.cardContainer} key={goal.id}>
                  <UpcomingCard
                    title={goal.name}
                    body={`${formatCurrency(goal.currentAmount)} / ${formatCurrency(goal.totalAmount)}`}
                    imageComponent={<PieChart progress={progress} size={100} />}
                  />
                </View>
              );
            })}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        // Make the section headers sticky.
        stickyHeaderIndices={sections.map((item, index) => item.type === 'header' ? index : -1).filter(index => index !== -1)}
      />
    </View>
  );
}
