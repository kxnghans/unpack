
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

export interface QuickAccessCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  colors: string[];
  onPress?: () => void;
}

export function QuickAccessCard({ title, subtitle, icon, colors, onPress }: QuickAccessCardProps) {
  const { typography } = useTheme();

  const styles = StyleSheet.create({
    card: {
      borderRadius: 8,
      width: 160,
      height: 80,
      padding: 12,
      marginHorizontal: 8,
    },
    title: {
      fontSize: typography.sizes.m,
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontFamily: typography.nunitoSans,
    },
    subtitle: {
      fontSize: typography.sizes.s,
      color: '#FFFFFF',
      fontFamily: typography.inter,
    },
    iconContainer: {
      position: 'absolute',
      top: 12,
      right: 12,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <LinearGradient colors={colors} style={styles.card}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </LinearGradient>
    </Pressable>
  );
}
