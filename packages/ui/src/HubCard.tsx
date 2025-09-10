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

const NeumorphicWrapper = ({ children, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
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
    <View style={[styles.darkShadow, style]}>
      <View style={styles.lightShadow}>{children}</View>
    </View>
  );
};

export function HubCard({ icon, title, items, onPress }: HubCardProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    cardWrapper: {
      marginVertical: 16,
      borderRadius: 20,
    },
    card: {
      width: 280,
      height: 160,
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 16,
      overflow: 'hidden',
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 20,
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
            ...typography.fonts.body,
      marginBottom: 4,
    },
    chevronContainer: {
      position: 'absolute',
      bottom: 16,
      right: 16,
    },
    chevronPlate: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
    },
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 6,
      borderRadius: 20,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      borderRadius: 20,
    },
  });

  const cardContent = (
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
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={styles.body}>
              {items.slice(0, 2).map((item, index) => (
                <Text key={index} style={styles.item} numberOfLines={1}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.chevronContainer}>
          <NeumorphicWrapper style={{ borderRadius: 16 }}>
            <View style={styles.chevronPlate}>
              <FontAwesome5
                name="chevron-right"
                size={16}
                color={colors.textSecondary}
              />
            </View>
          </NeumorphicWrapper>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.darkShadow, styles.cardWrapper]}>
      <View style={styles.lightShadow}>{cardContent}</View>
    </View>
  );
}
