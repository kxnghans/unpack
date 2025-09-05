import { StyleSheet, View } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps';

/**
 * The main screen for the profile tab.
 * This component displays a placeholder for the user's profile.
 */
export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        style={StyleSheet.absoluteFill}
        mapType="hybridFlyover"
        camera={{
          center: { latitude: 0, longitude: 0 },
          pitch: 0,
          heading: 0,
          altitude: 20000000, // High altitude to show the globe
        }}
      />
    </View>
  );
}
