
/**
 * This file defines the WalletsScreen, which displays a list of the user's
 * wallet cards and their redemption progress.
 */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { WALLET_CARDS } from '../../../lib/mock-data';
import { useTheme, HubRow } from '@ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { amexRewards } from '../../../lib/amex-rewards';

/**
 * The wallets screen, displaying a list of wallet cards.
 */
export default function WalletsScreen() {
  const { colors, typography } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 24,
    },
    cardTitle: {
      ...typography.fonts.title,
      color: colors.text,
    },
    fee: {
      color: colors.textSecondary,
      ...typography.fonts.subtitle,
    },
  });

  // Calculate the number of rewards in each status category.
  const rewards = [
    { text: `${amexRewards.used.length} used`, icon: 'check-circle', color: 'success' },
    { text: `${amexRewards.inProgress.length} in progress`, icon: 'spinner', color: 'warning' },
    { text: `${amexRewards.unused.length} not used`, icon: 'times-circle', color: 'danger' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={WALLET_CARDS}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <HubRow
            icon={<FontAwesome5 name="credit-card" size={24} color={colors.text} />}
            title={<Text style={styles.cardTitle}>{item.name} <Text style={styles.fee}>{item.subtitle}</Text></Text>}
            rewards={rewards}
            progress={{
              currentValue: item.currentRedemption,
              targetValue: item.targetRedemption,
              variant: 'simplified',
            }}
            // Only the Amex Platinum card is pressable in this mock data.
            onPress={() => item.name === 'Amex Platinum' && router.push(`/planning/wallet/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
