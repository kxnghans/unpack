import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTheme, HubItemCard, DetailAccordionCard } from '@ui';
import { WALLET_CARDS } from '../../../../lib/mock-data';
import { amexRewards } from '../../../../lib/amex-rewards';

export default function WalletItemDetailPage() {
  const { id } = useLocalSearchParams();
  const { colors, typography } = useTheme();

  const card = WALLET_CARDS.find((c) => c.id === id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 24,
    },
    sectionTitle: {
      ...typography.fonts.sectionHeader,
      color: colors.text,
      marginBottom: 16,
      marginTop: 24,
    },
  });

  if (!card) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <HubItemCard title={card.name} imageUri={card.image} />

      <Text style={styles.sectionTitle}>Rewards Used</Text>
      {amexRewards.used.map((reward, index) => (
        <DetailAccordionCard key={index} {...reward} />
      ))}

      <Text style={styles.sectionTitle}>Rewards In Progress</Text>
      {amexRewards.inProgress.map((reward, index) => (
        <DetailAccordionCard key={index} {...reward} />
      ))}

      <Text style={styles.sectionTitle}>Rewards Unused</Text>
      {amexRewards.unused.map((reward, index) => (
        <DetailAccordionCard key={index} {...reward} />
      ))}
    </ScrollView>
  );
}
