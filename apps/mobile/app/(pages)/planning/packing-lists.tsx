import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UpcomingCard, useTheme, Divider, NeumorphicButton } from '@ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { PACKING_LISTS } from '../../../lib/mock-data';
import { useRouter } from 'expo-router';

export default function PackingListsScreen() {
  const { colors, typography } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginBottom: 16,
    },
    listContentContainer: {
      paddingHorizontal: 24,
    },
  });

  const renderPackingListItem = ({ item }) => {
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
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <NeumorphicButton
            title="Mandatory Items"
            onPress={() => router.push('/planning/mandatory-items')}
            style={{ paddingVertical: 12, paddingHorizontal: 24 }}
            textStyle={{ ...typography.fonts.subtitle }}
          />
        </View>
        <Divider />
      </View>
      <FlatList
        data={PACKING_LISTS}
        renderItem={renderPackingListItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}
