/**
 * This file defines the layout for the planning section of the app, which
 * includes a stack navigator for all the planning-related screens.
 */
import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';
import { WALLET_CARDS, PACKING_LISTS } from '../../../lib/mock-data';
import { View, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * A neumorphic "add" button for headers, used for navigating to creation screens.
 * @param {object} props - The component props.
 * @param {string} props.href - The href to navigate to when the button is pressed.
 */
const NeumorphicAddButton = ({ href }) => {
  const { colors } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    button: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    lightShadow: { shadowColor: colors.shadow, shadowOffset: { width: 4, height: 4 }, shadowOpacity: 1, shadowRadius: 8, borderRadius: 24 },
    darkShadow: { shadowColor: colors.highlight, shadowOffset: { width: -4, height: -4 }, shadowOpacity: 1, shadowRadius: 8, borderRadius: 24 },
  });

  return (
    <Pressable onPress={() => router.push(href)}>
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
 * This component defines the stack navigator for the planning tab, including all
 * the screens related to planning.
 */
export default function PlanningLayout() {
  const { colors, typography } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { ...typography.fonts.sectionHeader },
      }}
    >
      {/* The main index screen for the planning tab. */}
      <Stack.Screen name="index" options={{ title: 'Planning', headerShown: false }} />
      {/* The screen for the wallets hub. */}
      <Stack.Screen 
        name="wallets" 
        options={{
          title: 'Wallets Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-card" />,
        }}
      />
      {/* The screen for the documents hub. */}
      <Stack.Screen 
        name="documents" 
        options={{
          title: 'Documents Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-document" />,
        }}
      />
      {/* The detail screen for a single wallet. */}
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
      {/* The screen for adding a new card. */}
      <Stack.Screen name="add-card" options={{ title: 'Add New Card', headerTitleStyle: { ...typography.fonts.title } }} />
      {/* The screen for adding a new document. */}
      <Stack.Screen name="add-document" options={{ title: 'Add a Document', headerTitleStyle: { ...typography.fonts.title } }} />
      {/* The screen for the music hub. */}
      <Stack.Screen
        name="music"
        options={{
          title: 'Music Hub',
        }}
      />
      {/* The screen for the packing lists hub. */}
      <Stack.Screen
        name="packing-lists"
        options={{
          title: 'Packing Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-packing-list" />,
        }}
      />
      {/* The screen for adding a new packing list. */}
      <Stack.Screen name="add-packing-list" options={{ title: 'Add New Packing List', headerTitleStyle: { ...typography.fonts.title } }} />
      {/* The detail screen for a single packing list. */}
      <Stack.Screen
        name="packing/[id]"
        options={({ route }) => {
          const { id } = route.params;
          const list = PACKING_LISTS.find((l) => l.id === id);
          return {
            title: list ? list.name : 'Packing List',
            headerTitleStyle: { ...typography.fonts.title },
          };
        }}
      />
      {/* The screen for managing mandatory items. */}
      <Stack.Screen name="mandatory-items" options={{ title: 'Mandatory Items', headerTitleStyle: { ...typography.fonts.title } }} />
      {/* The screen for the savings hub. */}
      <Stack.Screen 
        name="savings" 
        options={{
          title: 'Savings Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-savings-goal" />,
        }}
      />
      <Stack.Screen name="add-savings-goal" options={{ title: 'Add Savings Goal', headerTitleStyle: { ...typography.fonts.title } }} />
    </Stack>
  );
}

