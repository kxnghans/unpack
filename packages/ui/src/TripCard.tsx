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
  const { typography } = useTheme();

  const styles = StyleSheet.create({
    card: {
      width: 160,
      height: 160,
      borderRadius: 8,
      marginHorizontal: 8,
      overflow: 'hidden',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'flex-end',
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
      color: '#FFFFFF',
      ...typography.fonts.title,
    },
    date: {
      color: '#FFFFFF',
      ...typography.fonts.subtitle,
    },
  });

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <ImageBackground source={{ uri: image }} style={styles.imageBackground}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
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