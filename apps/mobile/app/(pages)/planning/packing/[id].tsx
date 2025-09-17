/**
 * This file defines the screen for displaying the details of a specific packing
 * list. It allows the user to check off items, add new items, and edit existing
 * items.
 */
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

/**
 * Screen that displays the details of a specific packing list.
 * It separates the items into "Unpacked" and "Packed" sections.
 */
export default function PackingItemDetailScreen() {
  const { colors, typography } = useTheme();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the packing list from the mock data based on the ID from the URL.
  const packingList = useMemo(
    () => PACKING_LISTS.find((list) => list.id === id),
    [id]
  );

  // Initialize the list of items with mandatory items and the items from the packing list.
  const [items, setItems] = useState(() => {
    const listItems = packingList.items;
    // Add any mandatory items that are not already in the list.
    const mandatoryItemsToAdd = MANDATORY_ITEMS.filter(
      (mandItem) => !listItems.some((item) => item.name === mandItem.name)
    );
    return [...mandatoryItemsToAdd, ...listItems];
  });
  // State for the visibility of the "Packed" section.
  const [packedVisible, setPackedVisible] = useState(true);
  // The index of the currently active (focused) item.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Memoized list of unpacked items, sorted to show mandatory items first.
  const unpackedItems = useMemo(() => 
    items
      .filter((item) => !item.packed)
      .sort((a, b) => (b.isMandatory ? 1 : 0) - (a.isMandatory ? 1 : 0)),
    [items]
  );

  // Memoized list of packed items, sorted to show mandatory items first.
  const packedItems = useMemo(() => 
    items
      .filter((item) => item.packed)
      .sort((a, b) => (b.isMandatory ? 1 : 0) - (a.isMandatory ? 1 : 0)),
    [items]
  );

  /**
   * Toggles the 'packed' status of a checklist item.
   * @param {string} itemId - The ID of the item to toggle.
   */
  const handleToggle = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  /**
   * Handles changes to the text of a checklist item.
   * @param {string} itemId - The ID of the item to change.
   * @param {string} newText - The new text for the item.
   */
  const handleChangeText = (itemId, newText) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, name: newText } : item
      )
    );
  };

  /**
   * Deletes a checklist item from the list.
   * @param {string} itemId - The ID of the item to delete.
   */
  const handleDelete = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  /**
   * Adds a new, empty item to the checklist.
   */
  const handleAddItem = () => {
    const newItem = { id: Date.now().toString(), name: '', packed: false };
    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      // Set the new item as active to auto-focus the input.
      const newUnpackedItems = newItems.filter((item) => !item.packed);
      setActiveIndex(newUnpackedItems.length - 1);
      return newItems;
    });
  };

  // The "Add Item" button is disabled if the last item is empty.
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

  /**
   * Renders the footer component for the unpacked items FlatList, which contains
   * the "Add Item" button.
   */
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
      {/* The list of unpacked items. */}
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
      {/* The collapsible section for packed items. */}
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
                  isActive={false} // Packed items can't be active.
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
