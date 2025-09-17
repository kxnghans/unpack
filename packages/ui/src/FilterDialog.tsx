/**
 * This file defines the FilterDialog component, a modal dialog that allows
 * users to select multiple options from a list for filtering content.
 */
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PillButton } from './PillButton';
import { useTheme } from './ThemeProvider';

/**
 * A dialog that allows the user to select multiple options from a list.
 * @param {object} props - The component props.
 * @param {boolean} props.isVisible - Whether the dialog is visible.
 * @param {() => void} props.onClose - A function to call when the dialog is closed.
 * @param {string} props.title - The title of the dialog.
 * @param {string[]} props.options - The options to display.
 * @param {string[]} props.selectedOptions - The currently selected options.
 * @param {(option: string) => void} props.onSelectionChange - A function to call when an option is selected or deselected.
 * @param {() => void} props.onClearAll - A function to call when the "Clear All" button is pressed.
 * @param {() => void} props.onSelectAll - A function to call when the "Select All" button is pressed.
 */
export const FilterDialog = ({
  isVisible,
  onClose,
  title,
  options,
  selectedOptions,
  onSelectionChange,
  onClearAll,
  onSelectAll,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.overlay,
    },
    dialogContainer: {
      backgroundColor: colors.background,
      borderRadius: 12,
      padding: 20,
      width: '85%',
      maxHeight: '70%',
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    headerActions: {
      flexDirection: 'row',
    },
    actionText: {
      color: colors.primary,
      marginLeft: 15,
    },
  });

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
    >
      {/* The modal overlay closes the dialog when pressed. */}
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={onClose}>
        {/* This View prevents the dialog from closing when the user interacts with it. */}
        <View style={styles.dialogContainer} onStartShouldSetResponder={() => true}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity onPress={onSelectAll}>
                <Text style={styles.actionText}>Select All</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClearAll}>
                <Text style={styles.actionText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* The options are displayed in a scrollable view. */}
          <ScrollView>
            {options.map((option) => (
              <PillButton
                key={option}
                label={option}
                isActive={selectedOptions.includes(option)}
                onPress={() => onSelectionChange(option)}
              />
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
