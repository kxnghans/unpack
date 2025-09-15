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

export default function AddPackingListScreen() {
  const { colors, typography } = useTheme();
  const [name, setName] = useState('');
  const [items, setItems] = useState([...MANDATORY_ITEMS]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

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
      setActiveIndex(newItems.length - 1);
      return newItems;
    });
  };

  const handleCreate = () => {
    // For now, we'll just log the name and items and go back.
    console.log('New packing list name:', name);
    console.log('Items:', items);
    router.back();
  };

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
