import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UpcomingCard, useTheme } from '@ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { PACKING_LISTS, MANDATORY_ITEMS } from '../../../lib/mock-data';
import { useRouter } from 'expo-router';

const mandatoryItemsCard = {
  id: 'mandatory-items-card',
  isMandatoryCard: true,
  name: 'Mandatory Items',
  items: MANDATORY_ITEMS,
};

const allLists = [mandatoryItemsCard, ...PACKING_LISTS];

export default function PackingListsScreen() {
  const { colors, typography, spacing } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContentContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
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
      marginHorizontal: spacing.small,
    },
    star: {
      color: '#FBBF24',
    },
  });

  const renderPackingListItem = ({ item }) => {
    if (item.isMandatoryCard) {
      const titleComponent = (
        <View style={styles.titleContainer}>
          <FontAwesome5 name="star" solid size={16} style={styles.star} />
          <Text style={styles.title}>{item.name}</Text>
          <FontAwesome5 name="star" solid size={16} style={styles.star} />
        </View>
      );

      return (
        <UpcomingCard
          imageUrl="https://picsum.photos/seed/mandatory/400/300" // Placeholder image
          icon={<FontAwesome5 name="compass" size={24} color={colors.textOnOverlay} />}
          title={titleComponent}
          body={`${item.items.length} items`}
          onPress={() => router.push('/planning/mandatory-items')}
        />
      );
    }

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
      <FlatList
        data={allLists}
        renderItem={renderPackingListItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}
