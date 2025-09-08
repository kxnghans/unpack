
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
    },
    fee: {
      color: colors.textSecondary,
      ...typography.fonts.subtitle,
    },
  });

  const rewards = [
    { text: `${amexRewards.used.length} used`, icon: 'check-circle', color: '#2ECC71' },
    { text: `${amexRewards.inProgress.length} in progress`, icon: 'spinner', color: '#F1C40F' },
    { text: `${amexRewards.unused.length} not used`, icon: 'times-circle', color: '#E74C3C' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={WALLET_CARDS}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <HubRow
            icon={<FontAwesome5 name="credit-card" size={24} color="#1A1A1A" />}
            title={<Text style={styles.cardTitle}>{item.name} <Text style={styles.fee}>${item.annualFee}</Text></Text>}
            rewards={rewards}
            onPress={() => item.name === 'Amex Platinum' && router.push(`/planning/wallet/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
