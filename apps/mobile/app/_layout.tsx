import { Slot } from 'expo-router';
import { ThemeProvider } from '@ui/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The root layout for the entire app.
 * This component renders the current navigation stack.
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  );
}
