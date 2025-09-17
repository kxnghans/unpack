
/**
 * This file defines the UpcomingCard component, a card used for displaying an
 * upcoming event or item with an image, icon, title, and body.
 */
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';

/**
 * The props for the UpcomingCard component.
 */
export interface UpcomingCardProps {
  /**
   * The URL of the image to display.
   */
  imageUrl?: string;
  /**
   * A component to display as the image.
   */
  imageComponent?: React.ReactNode;
  /**
   * An icon to display on the card.
   */
  icon?: React.ReactNode;
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The body text of the card.
   */
  body: string;
  /**
   * A function to call when the card is pressed.
   */
  onPress?: () => void;
}

/**
 * A wrapper component that creates a neumorphic effect by combining two shadows.
 * This gives the component a sense of depth.
 */
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
      shadowRadius: 6,
    },
  });

  return (
    <View style={styles.darkShadow}>
      <View style={styles.lightShadow}>{children}</View>
    </View>
  );
};

/**
 * A card that displays an upcoming event or item.
 * It features a prominent image or icon, with a title and body text below.
 */
export function UpcomingCard({ imageUrl, imageComponent, icon, title, body, onPress }: UpcomingCardProps) {
  const { colors, typography, spacing } = useTheme();

  const styles = StyleSheet.create({
    card: {
      height: 240, // Fixed height for uniform size
      margin: spacing.medium,
      flex: 1,
    },
    imageContainer: {
      height: 140,
      borderRadius: 20,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '100%',
    },
    iconContainer: {
      padding: 12,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
            ...typography.fonts.body,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* The image container is elevated with a neumorphic shadow. */}
      <View style={{ zIndex: 1, marginTop: 14 }}>
        <NeumorphicWrapper>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <ImageBackground source={{ uri: imageUrl }} style={styles.image}>
                <View style={styles.overlay} />
                {/* The imageComponent is rendered on top of the image if provided. */}
                {imageComponent ? <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>{imageComponent}</View> : <View style={styles.iconContainer}>{icon}</View>}
              </ImageBackground>
            ) : (
              imageComponent
            )}
          </View>
        </NeumorphicWrapper>
      </View>
      {/* The text content is in a separate block that overlaps the image. */}
      <View style={styles.whiteBlockWrapper}>
        <NeumorphicWrapper>
          <View style={styles.whiteBlock}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.body} numberOfLines={2}>{body}</Text>
          </View>
        </NeumorphicWrapper>
      </View>
    </TouchableOpacity>
  );
}

