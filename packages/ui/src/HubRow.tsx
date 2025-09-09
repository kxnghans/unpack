
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import { theme } from './tokens';

export interface HubRowProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  rewards?: {
    text: string;
    icon: string;
    color: keyof typeof theme.light.colors;
  }[];
  onPress?: () => void;
}

export function HubRow({ icon, title, rewards, onPress }: HubRowProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconContainer: {
      marginRight: 16,
    },
    textContainer: {
      flex: 1,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rewardsContainer: {
      marginTop: 8,
    },
    rewardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    rewardText: {
      ...typography.fonts.description,
      color: colors.textSecondary,
      marginLeft: 8,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>{title}</View>
        {rewards && (
          <View style={styles.rewardsContainer}>
            {rewards.map((reward, index) => (
              <View key={index} style={styles.rewardRow}>
                <FontAwesome5
                  name={reward.icon}
                  size={12}
                  color={colors[reward.color]}
                />
                <Text style={styles.rewardText}>{reward.text}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <FontAwesome5 name="chevron-right" size={16} color={colors.text} />
    </Pressable>
  );
}
