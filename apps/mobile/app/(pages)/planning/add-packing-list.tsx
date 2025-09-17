/**
 * This file defines the AddPackingListScreen, a form for creating a new
 * packing list with a name and a list of items.
 */
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme, ChecklistRow, NeumorphicButton } from '@ui';
import { useRouter } from 'expo-router';
import { MANDATORY_ITEMS } from '../../../lib/mock-data';

/**
 * Screen for adding a new packing list.
 * It includes fields for the list name and items, and uses the ChecklistRow component.
 */
export default function AddPackingListScreen() {
  const { colors, typography } = useTheme();
  const [name, setName] = useState('');
  // The list of items starts with the mandatory items.
  const [items, setItems] = useState([...MANDATORY_ITEMS]);
  // The index of the currently active (focused) item.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

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
      setActiveIndex(newItems.length - 1);
      return newItems;
    });
  };

  /**
   * Handles the creation of the new packing list.
   * In a real app, this would likely involve making an API call.
   */
  const handleCreate = () => {
    // For now, we'll just log the name and items and go back.
    console.log('New packing list name:', name);
    console.log('Items:', items);
    router.back();
  };

  // The "Add Item" button is disabled if the last item is empty.
  const canAddItem = items.length === 0 || items[items.length - 1].name !== '';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    inputContainer: {
      paddingHorizontal: 24,
    },
    input: {
      ...typography.fonts.title,
      backgroundColor: colors.card,
      color: colors.text,
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    listContainer: {
      paddingHorizontal: 24,
    },
    sectionHeader: {
      ...typography.fonts.title,
      color: colors.text,
      marginBottom: 16,
      paddingLeft: 16,
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
    buttonContainer: {
      padding: 24,
      alignItems: 'center',
    },
  });

  /**
   * Renders the footer component for the FlatList, which includes the "Add Item"
   * and "Create" buttons.
   */
  const renderFooter = () => (
    <View style={styles.buttonContainer}>
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
      <NeumorphicButton 
        title="Create" 
        onPress={handleCreate} 
        style={{ backgroundColor: colors.primary }}
        textStyle={{ color: colors.card }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
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
        ListHeaderComponent={
          <View style={styles.inputContainer}>
            {/* The input for the packing list name. */}
            <TextInput
              style={styles.input}
              placeholder="Packing List Name"
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.sectionHeader}>Items</Text>
          </View>
        }
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
