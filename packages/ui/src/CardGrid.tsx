import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItem } from 'react-native';
import { useTheme } from './ThemeProvider';

interface CardGridProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T, index: number) => string;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
}

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
