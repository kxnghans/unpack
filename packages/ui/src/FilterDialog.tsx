import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { PillButton } from './PillButton'
import { useTheme } from './ThemeProvider'

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
  const { colors } = useTheme()

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
  })

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <View
          style={styles.dialogContainer}
          onStartShouldSetResponder={() => true}
        >
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
  )
}
