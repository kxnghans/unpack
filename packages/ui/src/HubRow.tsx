
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';

export interface HubRowProps {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

export function HubRow({ icon, title, onPress }: HubRowProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.background,
    },
    iconContainer: {
      marginRight: 16,
    },
    title: {
      fontSize: typography.sizes.m,
      color: colors.text,
      flex: 1,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <FontAwesome5 name="chevron-right" size={16} color={colors.text} />
    </Pressable>
  );
}
