/**
 * This file defines the HubCard component, a large, stylized card used to represent
 * a "hub" or category of items in the app.
 */
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Wave } from './Wave';

/**
 * The props for the HubCard component.
 */
export interface HubCardProps {
  /**
   * The icon to display on the card.
   */
  icon: React.ReactNode;
  /**
   * The title of the card.
   */
  title: string;
  /**
   * A list of items to display on the card.
   */
  items: string[];
  /**
   * A function to call when the card is pressed.
   */
  onPress?: () => void;
}

/**
 * A wrapper component that creates a neumorphic effect by combining two shadows.
 * This gives the component a sense of depth.
 */
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

/**
 * A card that displays a hub of information, such as a category of items.
 * It features a prominent icon, a title, and a short list of items.
 */
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
        {/* A subtle gradient and wave pattern for visual interest. */}
        <LinearGradient
          colors={[colors.background, colors.card]}
          style={styles.gradient}
        />
        <Wave />
        <View style={styles.contentContainer}>
          {/* The left column contains the main icon for the hub. */}
          <View style={styles.leftColumn}>
            <View style={styles.iconContainer}>{icon}</View>
          </View>
          {/* The right column contains the title and a preview of the items. */}
          <View style={styles.rightColumn}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            <View style={styles.body}>
              {/* Show the first two items in the list as a preview. */}
              {items.slice(0, 2).map((item, index) => (
                <Text key={index} style={styles.item} numberOfLines={1}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        </View>
        {/* A chevron icon to indicate that the card is pressable. */}
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
    // The card is wrapped in two views to create the neumorphic shadow effect.
    <View style={[styles.darkShadow, styles.cardWrapper]}>
      <View style={styles.lightShadow}>{cardContent}</View>
    </View>
  );
}
