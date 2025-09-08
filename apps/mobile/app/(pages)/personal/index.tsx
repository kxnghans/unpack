import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme, BottomSheet } from '@ui';
import MapView, { PROVIDER_DEFAULT, Camera } from 'react-native-maps';
import * as Location from 'expo-location';

// Define the initial camera position to show the globe
const INITIAL_GLOBE_CAMERA: Camera = {
  center: {
    latitude: 39.7392, // Centered roughly on the US
    longitude: -98.5795,
  },
  pitch: 0,
  heading: 0,
  altitude: 15000000, // Zoom out far enough to see the globe
  zoom: 1,
};

export default function PersonalScreen() {
  const { colors, typography } = useTheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    sheetContent: {
      padding: 24,
      paddingTop: 0,
    },
    sheetTitle: {
      ...typography.fonts.sectionHeader,
      color: colors.text,
      marginBottom: 16,
    },
    placeholderText: {
      ...typography.fonts.description,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        mapType="hybridFlyover" // <-- Key change for Globe View
        showsUserLocation
        initialCamera={INITIAL_GLOBE_CAMERA} // <-- Set initial view to be zoomed out
        pitchEnabled
      />
      <BottomSheet>
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>My Details</Text>
          <Text style={styles.placeholderText}>
            More user details will go here...
          </Text>
        </View>
      </BottomSheet>
    </View>
  );
}