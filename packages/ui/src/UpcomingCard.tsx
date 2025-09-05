
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';

export interface UpcomingCardProps {
  color: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  onPress?: () => void;
}

export function UpcomingCard({ color, icon, title, body, onPress }: UpcomingCardProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    card: {
      flex: 1,
      height: 240, // Fixed height for uniform size
      margin: 8,
    },
    colorBlock: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 140,
      borderRadius: 16,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 12,
      zIndex: 1, // Ensure color block is on top
    },
    whiteBlock: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 120,
      borderRadius: 16,
      backgroundColor: 'white',
      padding: 16,
      paddingTop: 40, // Adjust padding to make space for the overlay
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#1A1A1A',
      fontFamily: typography.nunitoSans,
      textAlign: 'center',
    },
    body: {
      fontSize: 14,
      color: '#6B6B6B',
      fontFamily: typography.inter,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.card}>
      <View style={[styles.colorBlock, { backgroundColor: color }]}>
        {icon}
      </View>
      <View style={styles.whiteBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
}
