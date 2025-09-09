import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from './ThemeProvider'
import { FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Wave } from './Wave'

export interface HubCardProps {
  icon: React.ReactNode
  title: string
  items: string[]
  onPress?: () => void
}

export function HubCard({ icon, title, items, onPress }: HubCardProps) {
  const { colors, typography } = useTheme()

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
      justifyContent: 'center',
    },
    iconContainer: {
      width: 64,
      height: 64,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: colors.text,
      ...typography.fonts.sectionHeader,
    },
    body: {
      marginTop: 8,
    },
    item: {
      color: colors.text,
      ...typography.fonts.description,
      marginBottom: 4,
    },
    chevronContainer: {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
  })

  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <LinearGradient
          colors={[colors.background, colors.card]}
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
              {items.slice(0, 2).map((item, index) => (
                <Text key={index} style={styles.item}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <FontAwesome5
            name="chevron-right"
            size={24}
            color={colors.textSecondary}
          />
        </View>
      </View>
    </Pressable>
  )
}
