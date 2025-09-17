/**
 * This file defines the layout for the personal section of the app.
 */
import { Stack } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';

/**
 * The layout for the personal section of the app.
 * This component defines the stack navigator for the personal tab.
 */
export default function PersonalLayout() {
  const { colors, typography } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          ...typography.fonts.sectionHeader,
        },
      }}
    >
      {/* The index screen of the personal tab. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
