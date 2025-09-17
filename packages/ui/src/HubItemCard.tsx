/**
 * This file defines the HubItemCard component, a card used to display an item
 * within a hub, such as a news article or a video, with a background image.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useTheme } from './ThemeProvider';

/**
 * The props for the HubItemCard component.
 */
export interface HubItemCardProps {
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The URI of the image to display on the card.
   */
  imageUri: string;
}

/**
 * A card that displays an item in a hub, such as a news article or a video.
 * It features a title overlaid on a background image.
 */
export function HubItemCard({ title, imageUri }: HubItemCardProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      aspectRatio: 16 / 9,
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 16,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    overlay: {
      backgroundColor: colors.overlay,
      padding: 16,
    },
    title: {
      ...typography.fonts.title,
      color: colors.textOnOverlay,
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imageUri }} style={styles.image}>
        {/* The overlay provides a dark background for the title to ensure readability. */}
        <View style={styles.overlay}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
