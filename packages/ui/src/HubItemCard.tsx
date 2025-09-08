import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useTheme } from './ThemeProvider';

export interface HubItemCardProps {
  title: string;
  imageUri: string;
}

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
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: 16,
    },
    title: {
      ...typography.fonts.title,
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: imageUri }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
