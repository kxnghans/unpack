
/**
 * This file defines the QuickAccessCard component, a small card with a gradient
 * background used for providing quick access to a feature.
 */
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './tokens';

/**
 * The props for the QuickAccessCard component.
 */
export interface QuickAccessCardProps {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The subtitle of the card.
   */
  subtitle: string;
  /**
   * The icon to display on the card.
   */
  icon: React.ReactNode;
  /**
   * The gradient to use for the card background.
   */
  gradient: keyof typeof theme.light.gradients;
  /**
   * A function to call when the card is pressed.
   */
  onPress?: () => void;
}

/**
 * A card that provides quick access to a feature.
 * It features a title, subtitle, and an icon, with a gradient background.
 */
export function QuickAccessCard({ title, subtitle, icon, gradient, onPress }: QuickAccessCardProps) {
  const { colors, typography, gradients } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 8,
      width: 160,
      height: 80,
      padding: 12,
      marginHorizontal: 8,
    },
    title: {
      color: colors.textOnPrimary,
      ...typography.fonts.title,
    },
    subtitle: {
      color: colors.textOnPrimary,
      ...typography.fonts.subtitle,
    },
    iconContainer: {
      position: 'absolute',
      top: 12,
      right: 12,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <LinearGradient colors={gradients[gradient]} style={styles.card}>
        {/* The icon is positioned in the top right corner of the card. */}
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </LinearGradient>
    </Pressable>
  );
}
