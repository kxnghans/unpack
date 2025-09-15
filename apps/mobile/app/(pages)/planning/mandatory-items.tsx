import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useTheme, ChecklistRow } from '@ui';
import { MANDATORY_ITEMS } from '../../../lib/mock-data';

export default function MandatoryItemsScreen() {
  const { colors, typography } = useTheme();
  const [items, setItems] = useState(MANDATORY_ITEMS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    const newItem = { id: Date.now().toString(), name: '', packed: false, isMandatory: true };
    setItems((prevItems) => {
      const newItems = [...prevItems, newItem];
      setActiveIndex(newItems.length - 1);
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
            onToggle={() => {}} // No-op
            onChangeText={(newText) => handleChangeText(item.id, newText)}
            onDelete={() => handleDelete(item.id)}
            isActive={index === activeIndex}
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            isMandatory={item.isMandatory}
            allowMandatoryEdit={true}
            isToggleDisabled={true}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}
