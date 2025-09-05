import { Stack } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';

/**
 * The layout for the planning section of the app.
 * This component defines the stack navigator for the planning tab.
 */
export default function PlanningLayout() {
  const { colors, typography } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: typography.sizes.l,
          fontFamily: typography.nunitoSans,
        },
      }}
    />
  );
}
