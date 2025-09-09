
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

const NeumorphicWrapper = ({ children }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
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
      <View style={styles.lightShadow}>{children}</View>
    </View>
  );
};

export function UpcomingCard({ color, icon, title, body, onPress }: UpcomingCardProps) {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    card: {
      height: 240, // Fixed height for uniform size
      margin: spacing.medium,
      flex: 1,
    },
    colorBlockWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 140,
      borderRadius: 16,
      zIndex: 1, // Ensure color block is on top
    },
    colorBlock: {
      height: '100%',
      width: '100%',
      borderRadius: 16,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      padding: 12,
    },
    whiteBlockWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 120,
      borderRadius: 16,
    },
    whiteBlock: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      paddingTop: 40, // Adjust padding to make space for the overlay
      alignItems: 'center',
    },
    title: {
      color: colors.text,
      textAlign: 'center',
      ...typography.fonts.title,
    },
    body: {
      color: colors.text,
      textAlign: 'center',
      ...typography.fonts.description,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.colorBlockWrapper}>
        <NeumorphicWrapper>
          <View style={[styles.colorBlock, { backgroundColor: color }]}>
            {icon}
          </View>
        </NeumorphicWrapper>
      </View>
      <View style={styles.whiteBlockWrapper}>
        <NeumorphicWrapper>
          <View style={styles.whiteBlock}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body}>{body}</Text>
          </View>
        </NeumorphicWrapper>
      </View>
    </View>
  );
}
