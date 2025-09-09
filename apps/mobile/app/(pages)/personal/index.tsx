import { View, StyleSheet, FlatList, Dimensions } from 'react-native'
import React, { useState, useMemo } from 'react'
import { BottomSheet, StatCard } from '@ui'
import MapView, { PROVIDER_DEFAULT, Camera } from 'react-native-maps'
import {
  MOCK_STATS,
  MOCK_CREATOR_STATS,
  MOCK_USER,
} from '../../../lib/mock-data'
import { StatsHeader } from '../../../components/StatsHeader'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

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
}

export default function PersonalScreen() {
  const [activeTab, setActiveTab] = useState('personal')
  const [bottomSheetIndex, setBottomSheetIndex] = useState(0)
  const [isThemeExpanded, setIsThemeExpanded] = useState(false)

  const snapPoints = useMemo(
    () => [60, SCREEN_HEIGHT * 0.3, SCREEN_HEIGHT * 0.65, SCREEN_HEIGHT * 0.93],
    [],
  )

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
  })

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        mapType="hybridFlyover"
        showsUserLocation
        initialCamera={INITIAL_GLOBE_CAMERA}
        pitchEnabled
      />
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
  )
}
