import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';

export interface DocumentCardProps {
  title: string;
  body: string;
  onPress?: () => void;
}

export function DocumentCard({ title, body, onPress }: DocumentCardProps) {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: spacing.medium,
      marginVertical: spacing.small,
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: spacing.medium,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      color: colors.text,
      ...typography.fonts.title,
    },
    body: {
      color: colors.textSecondary,
      ...typography.fonts.body,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="file-alt" size={24} color={colors.text} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </TouchableOpacity>
  );
}
