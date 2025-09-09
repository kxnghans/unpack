import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeProvider';
import { LinearGradient } from 'expo-linear-gradient';

export interface TripCardProps {
  location: string;
  date: string;
  image: string;
  onPress?: () => void;
}

export function TripCard({ location, date, image, onPress }: TripCardProps) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    card: {
      width: 160,
      height: 160,
      borderRadius: 8,
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      borderRadius: 8,
      overflow: 'hidden',
    },
    gradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '50%',
    },
    textContainer: {
      padding: 12,
    },
    location: {
      color: colors.textOnOverlay,
      ...typography.fonts.title,
    },
    date: {
      color: colors.textOnOverlay,
      ...typography.fonts.subtitle,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
        <LinearGradient
          colors={['transparent', colors.overlay]}
          style={styles.gradient}
        />
        <View style={styles.textContainer}>
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
          <Text style={styles.date} numberOfLines={1}>{date}</Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
