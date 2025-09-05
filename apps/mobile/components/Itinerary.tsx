import { View, Text } from "react-native";
import React from 'react';

/**
 * A component to display the user's travel itinerary.
 */
export function Itinerary() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your Itinerary will appear here ✈️</Text>
    </View>
  );
}
