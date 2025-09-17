/**
 * This file defines the WalletItemDetailPage, which displays the details of a
 * specific wallet item (e.g., a credit card) and its associated rewards.
 */
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTheme, DetailAccordionCard, ProgressBar, PillButton } from '@ui';
import { WALLET_CARDS } from '../../../../lib/mock-data';
import { amexRewards as initialAmexRewards } from '../../../../lib/amex-rewards';

/**
 * A wrapper component that creates a neumorphic effect by combining two shadows.
 * This gives the component a sense of depth.
 */
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

/**
 * Screen that displays the details of a specific wallet item (e.g., a credit card).
 */
export default function WalletItemDetailPage() {
  const { id } = useLocalSearchParams();
  const { colors, typography } = useTheme();
  // State for the rewards associated with the card.
  const [amexRewards, setAmexRewards] = useState(initialAmexRewards);
  // State to keep track of which accordion card is currently expanded.
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  // State to keep track of which months have been used for monthly rewards.
  const [usedMonths, setUsedMonths] = useState<string[]>([]);
  // State to keep track of the last year the monthly rewards were reset.
  const [lastResetYear, setLastResetYear] = useState(new Date().getFullYear());

  // This effect resets the used months at the beginning of a new year.
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (currentYear > lastResetYear) {
      setUsedMonths([]);
      setLastResetYear(currentYear);
    }
  });

  // Find the card from the mock data based on the ID from the URL.
  const card = WALLET_CARDS.find((c) => c.id === id);

  /**
   * A helper function to get the icon and color for a given reward status.
   * @param {string} status - The status of the reward (_used_, _inProgress_, or _unused_).
   * @returns {object} An object with the icon name and color.
   */
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

  /**
   * Handles a change in the status of a reward. This is called when the user
   * uses the swipeable actions on a reward card.
   * @param {object} reward - The reward object that is being changed.
   * @param {string} newStatus - The new status of the reward.
   */
  const handleStatusChange = (reward, newStatus) => {
    const oldStatus = reward.status;

    if (oldStatus === newStatus) return;

    // Update the state by moving the reward from its old status list to the new one.
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

  /**
   * Handles the press of an accordion card, expanding or collapsing it.
   * @param {string} title - The title of the accordion card.
   */
  const handleAccordionPress = (title: string) => {
    setExpandedAccordion((prev) => (prev === title ? null : title));
  };

  /**
   * Toggles the used status of a month for monthly rewards.
   * @param {string} month - The month to toggle.
   */
  const handleToggleMonth = (month: string) => {
    setUsedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month)
        : [...prev, month]
    );
  };

  /**
   * Handles changes to the redemption value from the input field.
   * @param {string} value - The new redemption value.
   */
  const handleRedemptionChange = (value: string) => {
    // In a real app, this would likely update the state.
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

  // If the card is not found, display a "not found" message.
  if (!card) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Card not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* The image of the credit card. */}
      <View style={styles.cardImageContainer}>
        <NeumorphicWrapper style={{ borderRadius: 16 }}>
          <Image source={{ uri: WALLET_CARDS.find(c => c.name === 'Amex Platinum').image }} style={styles.cardImage} />
        </NeumorphicWrapper>
      </View>

      {/* The progress bar for the card's redemption value. */}
      <View style={{ paddingHorizontal: 24 }}>
        <ProgressBar currentValue={card.currentRedemption} targetValue={card.targetRedemption} variant="full" />
      </View>

      {/* A button to see more details about the card on the American Express website. */}
      <View style={styles.buttonContainer}>
        <PillButton onPress={() => Linking.openURL('https://www.americanexpress.com/us/credit-cards/card/platinum/')}>See {card.name} Details</PillButton>
      </View>

      {/* The section for rewards that have been used. */}
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

      {/* The section for rewards that are in progress. */}
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

      {/* The section for rewards that are unused. */}
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

