import { Slot } from 'expo-router';
import { ThemeProvider } from '@ui/ThemeProvider';

/**
 * The root layout for the entire app.
 * This component renders the current navigation stack.
 */
export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
