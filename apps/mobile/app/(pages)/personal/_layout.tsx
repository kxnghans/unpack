import { Stack } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';

/**
 * The layout for the personal section of the app.
 * This component defines the stack navigator for the personal tab.
 */
import { Text, View } from 'react-native';
import React from 'react';

/**
 * The main screen for the profile tab.
 * This component displays a placeholder for the user's profile.
 */
export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}