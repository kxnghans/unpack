import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme, BottomSheet, StatCard } from '@ui';
import MapView, { PROVIDER_DEFAULT, Camera } from 'react-native-maps';
import * as Location from 'expo-location';
import { MOCK_STATS, MOCK_CREATOR_STATS, MOCK_USER } from '../../../lib/mock-data';
import { StatsHeader } from '../../../components/StatsHeader';

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
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [activeTab, setActiveTab] = useState('personal');

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
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 24,
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
          <StatsHeader
            user={MOCK_USER}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
          <FlatList
            key={activeTab} // Ensures re-render on tab change
            data={activeTab === 'personal' ? MOCK_STATS : MOCK_CREATOR_STATS}
            renderItem={({ item }) => (
              <StatCard
                label={item.label}
                value={item.value}
                unit={item.unit}
              />
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </BottomSheet>
    </View>
  );
}
