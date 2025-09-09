import { Stack } from 'expo-router'
import { useTheme } from '@ui/ThemeProvider'

/**
 * The layout for the community section of the app.
 * This component defines the stack navigator for the community tab.
 */
export default function CommunityLayout() {
  const { colors, typography } = useTheme()

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}
