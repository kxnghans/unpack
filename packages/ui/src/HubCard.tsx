import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Wave } from './Wave';

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
      width: 280,
      height: 160,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 8,
      overflow: 'hidden',
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'row',
    },
    leftColumn: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightColumn: {
      width: '70%',
      paddingLeft: 16,
    },
    iconContainer: {
      width: 64,
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      lineHeight: 28,
      fontWeight: '600',
      color: '#1A1A1A',
    },
    body: {
      marginTop: 8,
    },
    item: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      color: '#6B6B6B',
      marginBottom: 4,
    },
    chevronContainer: {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <LinearGradient
          colors={['#E8EFFF', '#F8F9FF']}
          style={styles.gradient}
        />
        <Wave />
        <View style={styles.contentContainer}>
          <View style={styles.leftColumn}>
            <View style={styles.iconContainer}>{icon}</View>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.body}>
              {items.length > 0 ? (
                items.slice(0, 3).map((item, index) => (
                  <Text key={index} style={styles.item}>
                    {item}
                  </Text>
                ))
              ) : (
                <Text style={styles.item}>N/A</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <FontAwesome5 name="chevron-right" size={24} color="#6B6B6B" />
        </View>
      </View>
    </Pressable>
  );
}