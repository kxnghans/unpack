import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme, ChecklistRow, Divider } from '@ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PACKING_LISTS, MANDATORY_ITEMS } from '../../../../lib/mock-data';

export default function PackingItemDetailScreen() {
  const { colors, typography } = useTheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const packingList = useMemo(
    () => PACKING_LISTS.find((list) => list.id === id),
    [id]
  );

  const [items, setItems] = useState(() => {
    const listItems = packingList.items;
    const mandatoryItemsToAdd = MANDATORY_ITEMS.filter(
      (mandItem) => !listItems.some((item) => item.name === mandItem.name)
    );
    return [...mandatoryItemsToAdd, ...listItems];
  });
  const [packedVisible, setPackedVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const unpackedItems = useMemo(() => 
    items
      .filter((item) => !item.packed)
      .sort((a, b) => (b.isMandatory ? 1 : 0) - (a.isMandatory ? 1 : 0)),
    [items]
  );

  const packedItems = useMemo(() => 
    items
      .filter((item) => item.packed)
      .sort((a, b) => (b.isMandatory ? 1 : 0) - (a.isMandatory ? 1 : 0)),
    [items]
  );

  const handleToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const handleChangeText = (itemId, newText) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, name: newText } : item
      )
    );
  };

  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleAddItem = () => {
    const newItem = { id: Date.now().toString(), name: '', packed: false };
    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      const newUnpackedItems = newItems.filter((item) => !item.packed);
      setActiveIndex(newUnpackedItems.length - 1);
      return newItems;
    });
  };

  const canAddItem = items.length === 0 || items[items.length - 1].name !== '';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      paddingHorizontal: 24,
      paddingVertical: 24,
    },
    sectionHeader: {
      ...typography.fonts.title,
      color: colors.text,
      marginBottom: 16,
    },
    collapsibleHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    packedSection: {
      minHeight: 100,
    },
    addItemButton: {
      padding: 16,
      alignItems: 'center',
    },
    addItemButtonText: {
      ...typography.fonts.subtitle,
      color: colors.primary,
    },
    disabledText: {
      color: colors.textSecondary,
    },
  });

  const renderUnpackedFooter = () => (
    <TouchableOpacity
      onPress={handleAddItem}
      disabled={!canAddItem}
      style={styles.addItemButton}
    >
      <Text
        style={[
          styles.addItemButtonText,
          !canAddItem && styles.disabledText,
        ]}
      >
        + Add Item
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <FlatList
        data={unpackedItems}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <ChecklistRow
            text={item.name}
            checked={item.packed}
            onToggle={() => handleToggle(item.id)}
            onChangeText={(newText) => handleChangeText(item.id, newText)}
            onDelete={() => handleDelete(item.id)}
            isActive={index === activeIndex}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            isMandatory={item.isMandatory}
            allowMandatoryEdit={false}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.sectionHeader}>Unpacked</Text>}
        ListFooterComponent={renderUnpackedFooter}
        contentContainerStyle={styles.listContainer}
      />
      <Divider />
      {packedItems.length > 0 && (
        <View style={[styles.listContainer, styles.packedSection]}>
          <TouchableOpacity
            style={styles.collapsibleHeader}
            onPress={() => setPackedVisible(!packedVisible)}
          >
            <Text style={styles.sectionHeader}>Packed</Text>
            <Text style={styles.sectionHeader}>
              {packedVisible ? 'Hide' : `Show (${packedItems.length} items)`}
            </Text>
          </TouchableOpacity>
          {packedVisible && (
            <FlatList
              data={packedItems}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <ChecklistRow
                  text={item.name}
                  checked={item.packed}
                  onToggle={() => handleToggle(item.id)}
                  onChangeText={(newText) =>
                    handleChangeText(item.id, newText)
                  }
                  onDelete={() => handleDelete(item.id)}
                  isActive={false} // Packed items can't be active
                  onFocus={() => {}}
                  onBlur={() => {}}
                  isMandatory={item.isMandatory}
                  allowMandatoryEdit={false}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      )}
    </ScrollView>
  );
}
