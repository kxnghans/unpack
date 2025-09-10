import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTheme, DetailAccordionCard, ProgressBar, PillButton } from '@ui';
import { WALLET_CARDS } from '../../../../lib/mock-data';
import { amexRewards as initialAmexRewards } from '../../../../lib/amex-rewards';

const NeumorphicWrapper = ({ children, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity:0.75,
      shadowRadius: 4,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 0.7,
      shadowRadius: 4,
    },
  });

  return (
    <View style={[styles.darkShadow, style]}>
      <View style={styles.lightShadow}>{children}</View>
    </View>
  );
};

export default function WalletItemDetailPage() {
  const { id } = useLocalSearchParams();
  const { colors, typography } = useTheme();
  const [amexRewards, setAmexRewards] = useState(initialAmexRewards);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const [usedMonths, setUsedMonths] = useState<string[]>([]);
  const [lastResetYear, setLastResetYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (currentYear > lastResetYear) {
      setUsedMonths([]);
      setLastResetYear(currentYear);
    }
  });

  const card = WALLET_CARDS.find((c) => c.id === id);

  const getStatusAttributes = (status) => {
    switch (status) {
      case 'used':
        return { icon: 'check-circle', color: '#2ECC71' };
      case 'inProgress':
        return { icon: 'spinner', color: '#F1C40F' };
      case 'unused':
        return { icon: 'times-circle', color: '#E74C3C' };
      default:
        return { icon: '', color: '' };
    }
  };

  const handleStatusChange = (reward, newStatus) => {
    const oldStatus = reward.status;

    if (oldStatus === newStatus) return;

    setAmexRewards((prevRewards) => {
      const oldStatusRewards = prevRewards[oldStatus].filter((r) => r.title !== reward.title);
      
      const statusAttributes = getStatusAttributes(newStatus);
      const newReward = { 
        ...reward, 
        status: newStatus,
        statusIcon: statusAttributes.icon,
        statusColor: statusAttributes.color,
      };
      
      const newStatusRewards = [...prevRewards[newStatus], newReward];

      return {
        ...prevRewards,
        [oldStatus]: oldStatusRewards,
        [newStatus]: newStatusRewards,
      };
    });
  };

  const handleAccordionPress = (title: string) => {
    setExpandedAccordion((prev) => (prev === title ? null : title));
  };

  const handleToggleMonth = (month: string) => {
    setUsedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    );
  };

  const handleRedemptionChange = (value: string) => {
    console.log('Redemption value:', value);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      paddingVertical: 24,
    },
    cardImageContainer: {
      borderRadius: 16,
      marginHorizontal: 24,
      marginBottom: 24,
    },
    cardImage: {
      width: '100%',
      aspectRatio: 1.586, // Standard credit card aspect ratio
      borderRadius: 16,
    },
    sectionTitle: {
      ...typography.fonts.sectionHeader,
      color: colors.text,
      marginBottom: 16,
      marginTop: 24,
      paddingHorizontal: 24,
    },
    notFoundContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notFoundText: {
      ...typography.fonts.body,
      color: colors.text,
    },
    buttonContainer: {
      paddingHorizontal: 24,
      marginTop: 24,
      alignItems: 'center',
    },
  });

  if (!card) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.cardImageContainer}>
        <NeumorphicWrapper style={{ borderRadius: 16 }}>
          <Image source={{ uri: WALLET_CARDS.find(c => c.name === 'Amex Platinum').image }} style={styles.cardImage} />
        </NeumorphicWrapper>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <ProgressBar currentValue={card.currentRedemption} targetValue={card.targetRedemption} variant="full" />
      </View>

      <View style={styles.buttonContainer}>
        <PillButton onPress={() => Linking.openURL('https://www.americanexpress.com/us/credit-cards/card/platinum/')}>See {card.name} Details</PillButton>
      </View>

      <Text style={styles.sectionTitle}>Rewards Used</Text>
      {amexRewards.used.map((reward, index) => (
        <DetailAccordionCard
          key={index}
          {...reward}
          expanded={expandedAccordion === reward.title}
          onPress={() => handleAccordionPress(reward.title)}
          onStatusChange={(newStatus) => handleStatusChange({ ...reward, status: 'used' }, newStatus)}
          rewardType={reward.rewardType}
          onRedemptionChange={handleRedemptionChange}
        />
      ))}

      <Text style={styles.sectionTitle}>Rewards In Progress</Text>
      {amexRewards.inProgress.map((reward, index) => (
        <DetailAccordionCard
          key={index}
          {...reward}
          expanded={expandedAccordion === reward.title}
          onPress={() => handleAccordionPress(reward.title)}
          onStatusChange={(newStatus) => handleStatusChange({ ...reward, status: 'inProgress' }, newStatus)}
          rewardType={reward.rewardType}
          usedMonths={usedMonths}
          onToggleMonth={handleToggleMonth}
          onRedemptionChange={handleRedemptionChange}
        />
      ))}

      <Text style={styles.sectionTitle}>Rewards Unused</Text>
      {amexRewards.unused.map((reward, index) => (
        <DetailAccordionCard
          key={index}
          {...reward}
          expanded={expandedAccordion === reward.title}
          onPress={() => handleAccordionPress(reward.title)}
          onStatusChange={(newStatus) => handleStatusChange({ ...reward, status: 'unused' }, newStatus)}
          rewardType={reward.rewardType}
          onRedemptionChange={handleRedemptionChange}
        />
      ))}
    </ScrollView>
  );
}
