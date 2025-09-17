import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

export interface SectionHeaderProps {
  title: string;
  isCollapsed: boolean;
  onPress: () => void;
}

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
      <FontAwesome5 name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={16} color={colors.text} />
    </TouchableOpacity>
  );
}
