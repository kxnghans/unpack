import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * The props for the Card component.
 */
export interface CardProps {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The subtitle of the card.
   */
  subtitle?: string;
  /**
   * The function to call when the card is pressed.
   */
  onPress?: () => void;
}

/**
 * A reusable card component.
 * This component can be used to display a title, subtitle, and handle a press event.
 */
export function Card({ title, subtitle, onPress }: CardProps) {
  const { colors, typography, theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    cardInner: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
    },
    title: {
      color: colors.text,
      ...typography.fonts.title,
    },
    subtitle: {
      color: colors.text,
      ...typography.fonts.subtitle,
    },
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
    },
  });

  return (
    <View style={styles.darkShadow}>
      <View style={styles.lightShadow}>
        <Pressable onPress={onPress} style={styles.card}>
          <View style={styles.cardInner}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
