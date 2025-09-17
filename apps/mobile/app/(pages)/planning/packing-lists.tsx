/**
 * This file defines the PackingListsScreen, which displays a list of packing
 * lists, including a special card for mandatory items.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UpcomingCard, useTheme, CardGrid, PieChart, Card } from '@ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { PACKING_LISTS, MANDATORY_ITEMS } from '../../../lib/mock-data';
import { useRouter } from 'expo-router';

/**
 * A special card object for the mandatory items list.
 * This is used to differentiate it from the other packing lists.
 */
const mandatoryItemsCard = {
  id: 'mandatory-items-card',
  isMandatoryCard: true,
  name: 'Mandatory Items',
  items: MANDATORY_ITEMS,
};

/**
 * An array that combines the mandatory items card with the other packing lists.
 */
const allLists = [mandatoryItemsCard, ...PACKING_LISTS];

/**
 * Screen that displays a list of packing lists, including a special card for mandatory items.
 */
export default function PackingListsScreen() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
      textAlign: 'center',
      ...typography.fonts.title,
      marginHorizontal: 5,
      flexShrink: 1,
    },
    star: {
      color: '#FBBF24',
    },
  });

  /**
   * Renders a single packing list item as a card.
   * It handles the special case for the mandatory items card.
   * @param {object} item - The packing list item to render.
   */
  const renderPackingListItem = ({ item }) => {
    // If the item is the mandatory items card, render it with a special style.
    if (item.isMandatoryCard) {
      return (
        <UpcomingCard
          imageUrl="https://picsum.photos/seed/mandatory/400/300" // Placeholder image
          icon={<FontAwesome5 name="suitcase" solid size={24} color={'#FBBF24'} />}
          title={item.name}
          body={`${item.items.length} items`}
          onPress={() => router.push('/planning/mandatory-items')}
        />
      );
    }

    // For regular packing lists, calculate the number of packed items.
    const packedItems = item.items.filter((item) => item.packed).length;
    const totalItems = item.items.length;
    const body = `${packedItems} of ${totalItems} items packed`;

    return (
      <UpcomingCard
        imageUrl="https://picsum.photos/seed/packing/400/300"
        icon={<FontAwesome5 name="suitcase" size={24} color={colors.textOnOverlay} />}
        title={item.name}
        body={body}
        onPress={() => router.push(`/planning/packing/${item.id}`)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* The CardGrid component is used to display the packing lists in a grid format. */}
      <CardGrid
        data={allLists}
        renderItem={renderPackingListItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
