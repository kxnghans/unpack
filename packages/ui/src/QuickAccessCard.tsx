
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from './tokens';

export interface QuickAccessCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: keyof typeof theme.light.gradients;
  onPress?: () => void;
}

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
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
      </LinearGradient>
    </Pressable>
  );
}
