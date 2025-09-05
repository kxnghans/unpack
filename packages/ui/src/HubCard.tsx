
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';

export interface HubCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  onPress?: () => void;
}

export function HubCard({ icon, title, items, onPress }: HubCardProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      width: 280,
      height: 200,
      marginHorizontal: 8,
      justifyContent: 'space-between',
    },
    iconContainer: {
      alignSelf: 'flex-start',
    },
    title: {
      fontSize: typography.sizes.l,
      fontWeight: 'bold',
      color: colors.text,
    },
    item: {
      fontSize: typography.sizes.m,
      color: colors.text,
    },
    chevronContainer: {
      position: 'absolute',
      bottom: 24,
      right: 24,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <View>
        <Text style={styles.title}>{title}</Text>
        {items.length > 0 ? (
          items.slice(0, 3).map((item, index) => (
            <Text key={index} style={styles.item}>
              - {item}
            </Text>
          ))
        ) : (
          <Text style={styles.item}>N/A</Text>
        )}
      </View>
      <View style={styles.chevronContainer}>
        <FontAwesome5 name="chevron-right" size={24} color={colors.text} />
      </View>
    </Pressable>
  );
}
