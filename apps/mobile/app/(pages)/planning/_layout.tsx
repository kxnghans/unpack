import { Stack, useRouter } from 'expo-router';
import { useTheme } from '@ui/ThemeProvider';
import { WALLET_CARDS, PACKING_LISTS } from '../../../lib/mock-data';
import { View, Pressable, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Generic Add button for headers
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
      <Stack.Screen name="index" options={{ title: 'Planning', headerShown: false }} />
      <Stack.Screen 
        name="wallets" 
        options={{
          title: 'Wallets Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-card" />,
        }}
      />
      <Stack.Screen 
        name="documents" 
        options={{
          title: 'Documents Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-document" />,
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
      <Stack.Screen name="add-document" options={{ title: 'Add a Document', headerTitleStyle: { ...typography.fonts.title } }} />
      <Stack.Screen
        name="music"
        options={{
          title: 'Music Hub',
        }}
      />
      <Stack.Screen
        name="packing-lists"
        options={{
          title: 'Packing Hub',
          headerRight: () => <NeumorphicAddButton href="/planning/add-packing-list" />,
        }}
      />
      <Stack.Screen name="add-packing-list" options={{ title: 'Add New Packing List', headerTitleStyle: { ...typography.fonts.title } }} />
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
      <Stack.Screen name="mandatory-items" options={{ title: 'Mandatory Items', headerTitleStyle: { ...typography.fonts.title } }} />
    </Stack>
  );
}
