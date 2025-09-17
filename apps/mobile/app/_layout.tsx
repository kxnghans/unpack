/**
 * This file defines the root layout for the application, which wraps all other
 * components and provides the theme and safe area context.
 */
import { Slot } from 'expo-router';
import { ThemeProvider, useTheme } from '@ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * A component that provides a themed safe area view.
 * It ensures that the content is rendered within the safe area of the device
 * and has the correct background color from the theme.
 */
function ThemedSafeArea() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      {/* The Slot component renders the current child route. */}
      <Slot />
    </SafeAreaView>
  );
}

/**
 * The root layout for the entire app.
 * This component wraps the entire application with the necessary providers.
 */
export default function RootLayout() {
  return (
    // GestureHandlerRootView is required for react-native-gesture-handler to work correctly.
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* The ThemeProvider provides the theme context to all components in the app. */}
      <ThemeProvider>
        <ThemedSafeArea />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
