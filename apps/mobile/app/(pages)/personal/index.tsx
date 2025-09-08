import { View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme, BottomSheet } from '@ui';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';

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
        showsUserLocation
        followsUserLocation
        mapType="hybrid"
        pitchEnabled
        minZoomLevel={0}
        maxZoomLevel={20}
      />
      <BottomSheet>
        <View style={styles.sheetContent}>
            <Text style={styles.sheetTitle}>My Details</Text>
            <Text style={styles.placeholderText}>More user details will go here...</Text>
        </View>
      </BottomSheet>
    </View>
  );
}