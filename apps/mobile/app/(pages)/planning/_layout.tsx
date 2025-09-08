import { Stack } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';
import { WALLET_CARDS } from '../../../lib/mock-data';

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
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="wallets" options={{ title: 'Wallets Hub' }} />
      <Stack.Screen 
        name="wallet/[id]" 
        options={({ route }) => {
          const { id } = route.params;
          const card = WALLET_CARDS.find((c) => c.id === id);
          return { title: card ? card.name : 'Wallet Details' };
        }}
      />
    </Stack>
  );
}
