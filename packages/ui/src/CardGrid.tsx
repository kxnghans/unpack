/**
 * This file defines a CardGrid component that displays a grid of cards.
 * It's a generic component that can be used to display any type of data in a grid format.
 */
import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * The props for the CardGrid component.
 * @template T The type of the data in the grid.
 */
interface CardGridProps<T> {
  /**
   * The data to display in the grid.
   */
  data: T[];
  /**
   * The function to render each item in the grid.
   */
  renderItem: ListRenderItem<T>;
  /**
   * The function to extract a key for each item.
   */
  keyExtractor: (item: T, index: number) => string;
  /**
   * An optional component to render at the top of the grid.
   */
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

/**
 * A component that displays a grid of cards.
 * @template T The type of the data in the grid.
 */
export function CardGrid<T>({ data, renderItem, keyExtractor, ListHeaderComponent }: CardGridProps<T>) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    listContentContainer: {
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    cardContainer: {
        width: '48%',
        marginBottom: 16,
    }
  });

  return (
    <FlatList
      data={data}
      renderItem={(item) => (
        // The card container ensures that each card takes up 48% of the width,
        // allowing for a two-column grid with spacing.
        <View style={styles.cardContainer}>
          {renderItem(item)}
        </View>
      )}
      keyExtractor={keyExtractor}
      numColumns={2}
      contentContainerStyle={styles.listContentContainer}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}
