import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';
import { WALLET_CARDS } from '../../../lib/mock-data';
import { View, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const NeumorphicAddButton = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    button: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      borderRadius: 24,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      borderRadius: 24,
    },
  });

  return (
    <Pressable onPress={() => router.push('/planning/add-card')}>
      <View style={styles.darkShadow}>
        <View style={styles.lightShadow}>
          <View style={styles.button}>
            <FontAwesome5 name="plus" size={20} color={colors.text} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

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
          ...typography.fonts.sectionHeader,
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen 
        name="wallets" 
        options={{
          title: 'Wallets Hub',
          headerRight: () => <NeumorphicAddButton />,
        }}
      />
      <Stack.Screen 
        name="wallet/[id]" 
        options={({ route }) => {
          const { id } = route.params;
          const card = WALLET_CARDS.find((c) => c.id === id);
          return { 
            title: card ? card.name : 'Wallet Details', 
            headerTitleStyle: { ...typography.fonts.title },
          };
        }}
      />
      <Stack.Screen name="add-card" options={{ title: 'Add New Card', headerTitleStyle: { ...typography.fonts.title } }} />
    </Stack>
  );
}
