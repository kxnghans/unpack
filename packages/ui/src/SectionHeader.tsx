/**
 * This file defines the SectionHeader component, a header for a section that
 * can be collapsed and expanded.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

/**
 * The props for the SectionHeader component.
 */
export interface SectionHeaderProps {
  /**
   * The title of the section.
   */
  title: string;
  /**
   * Whether the section is collapsed.
   */
  isCollapsed: boolean;
  /**
   * A function to call when the header is pressed.
   */
  onPress: () => void;
}

/**
 * A header for a section that can be collapsed and expanded.
 * It displays a title and a chevron icon that indicates the collapsed state.
 */
export function SectionHeader({ title, isCollapsed, onPress }: SectionHeaderProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 16,
      backgroundColor: colors.background,
    },
    title: {
      ...typography.fonts.sectionHeader,
      color: colors.text,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* The chevron icon rotates based on the collapsed state. */}
      <FontAwesome5 name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={16} color={colors.text} />
    </TouchableOpacity>
  );
}
