import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useTheme, BottomSheet } from '@ui';

export default function PersonalScreen() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EAECEE', // Grey background
    },
    placeholderText: {
      ...typography.fonts.description,
      color: colors.textSecondary,
    },
    sheetContent: {
        padding: 24,
        paddingTop: 0, // Padding is handled by the handle container now
    },
    sheetTitle: {
        ...typography.fonts.sectionHeader,
        color: colors.text,
        marginBottom: 16,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.placeholderText}>Main content behind the sheet</Text>
      <BottomSheet>
        <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>My Details</Text>
            <Text style={styles.placeholderText}>More user details will go here...</Text>
        </View>
      </BottomSheet>
    </View>
  );
}