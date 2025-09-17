/**
 * This file defines the PersonalScreen, which is the main screen for the
 * personal tab. It displays user stats on a map with an interactive bottom sheet.
 */
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import React, { useState, useMemo } from 'react';
import { BottomSheet, StatCard } from '@ui';
import MapView, { PROVIDER_DEFAULT, Camera } from 'react-native-maps';
import { MOCK_STATS, MOCK_CREATOR_STATS, MOCK_USER } from '../../../lib/mock-data';
import { StatsHeader } from '../../../components/StatsHeader';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define the initial camera position to show a globe-like view of the Earth.
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

/**
 * The main personal screen, displaying user stats and a map.
 * It features a MapView with a BottomSheet that can be snapped to different points.
 */
export default function PersonalScreen() {
  const [activeTab, setActiveTab] = useState('personal');
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0);
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);

  // Memoize the snap points for the bottom sheet to prevent re-calculation on every render.
  const snapPoints = useMemo(
    () => [60, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.65, SCREEN_HEIGHT * 0.93],
    []
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      {/* The map view is displayed in the background. */}
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        mapType="hybridFlyover"
        showsUserLocation
        initialCamera={INITIAL_GLOBE_CAMERA}
        pitchEnabled
      />
      {/* The bottom sheet contains the user stats and controls. */}
      <BottomSheet
        snapPoints={snapPoints}
        snapToIndex={bottomSheetIndex}
        onSnap={setBottomSheetIndex}
      >
        <View style={styles.sheetContent}>
          <StatsHeader
            user={MOCK_USER}
            activeTab={activeTab}
            onTabPress={setActiveTab}
            isThemeExpanded={isThemeExpanded}
            onToggleThemeExpanded={() => setIsThemeExpanded(!isThemeExpanded)}
          />
          {/* The list of stats, which changes based on the active tab. */}
          <FlatList
            key={activeTab} // Ensures the list re-renders when the tab changes.
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
