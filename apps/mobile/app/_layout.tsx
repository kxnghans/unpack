import { Slot } from 'expo-router';
import { ThemeProvider, useTheme } from '@ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function ThemedSafeArea() {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <Slot />
    </SafeAreaView>
  );
}

/**
 * The root layout for the entire app.
 * This component renders the current navigation stack.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ThemedSafeArea />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
