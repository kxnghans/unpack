/**
 * This file defines the DetailAccordionCard component, a complex, expandable card
 * used to display detailed information about a reward or benefit. It supports
 * swipeable actions, different reward types, and conditional rendering of content.
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';
import { Divider } from './Divider';
import { Swipeable } from 'react-native-gesture-handler';
import { VerticalDivider } from './VerticalDivider';
import { RewardTypeLabel } from './RewardTypeLabel';
import { MonthTile } from './MonthTile';
import { InsetNeumorphicInput } from './InsetNeumorphicInput';
import { FullRedemptionButton } from './FullRedemptionButton';

// Enable layout animations on Android for a smoother accordion effect.
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
 * The props for the DetailAccordionCard component.
 */
export interface DetailAccordionCardProps {
  /**
   * The name of the icon to display for the status.
   */
  statusIcon: string;
  /**
   * The color of the status icon.
   */
  statusColor: string;
  /**
   * The title of the card.
   */
  title: string;
  /**
   * The estimated value of the reward.
   */
  estimatedValue?: string;
  /**
   * A description of the reward.
   */
  description: string;
  /**
   * Instructions on how to activate the reward.
   */
  activation: string;
  /**
   * The conditions of the reward.
   */
  conditions: string;
  /**
   * A function to call when the status of the reward changes.
   */
  onStatusChange?: (status: 'used' | 'inProgress' | 'unused') => void;
  /**
   * Whether the card is expanded.
   */
  expanded: boolean;
  /**
   * A function to call when the card is pressed.
   */
  onPress: () => void;
  /**
   * The type of the reward.
   */
  rewardType?: 'annual' | 'monthly' | 'asNeeded' | 'multiYear' | 'quarterly' | 'semiannual' | 'oneTime';
  /**
   * An array of months in which the reward has been used.
   */
  usedMonths?: string[];
  /**
   * A function to call when a month is toggled.
   */
  onToggleMonth?: (month: string) => void;
  /**
   * The current month.
   */
  currentMonth: number;
  /**
   * A function to call when the redemption value changes.
   */
  onRedemptionChange?: (value: string) => void;
}

/**
 * A card that displays details about a reward and can be expanded to show more information.
 */
export function DetailAccordionCard({ 
  statusIcon, 
  statusColor, 
  title, 
  estimatedValue, 
  description, 
  activation, 
  conditions, 
  onStatusChange,
  expanded,
  onPress,
  rewardType,
  usedMonths,
  onToggleMonth,
  currentMonth,
  onRedemptionChange,
}: DetailAccordionCardProps) {
  // State for the height of the card, used for the swipeable actions.
  const [cardHeight, setCardHeight] = useState(0);
  // State for the value of the redemption input.
  const [redemptionValue, setRedemptionValue] = useState('');
  // State to control the visibility of the scroll chevrons.
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);
  const { colors, typography } = useTheme();
  // Refs for the swipeable and scrollview components.
  const swipeableRef = useRef<Swipeable>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // When the redemption value changes, call the onRedemptionChange callback.
  // This is used to lift the state up to the parent component.
  useEffect(() => {
    if (onRedemptionChange) {
      onRedemptionChange(redemptionValue);
    }
  }, [redemptionValue]);

  /**
   * Handles a change in the status of the reward, called from the swipeable actions.
   * @param status The new status of the reward.
   */
  const handleStatusChange = (status: 'used' | 'inProgress' | 'unused') => {
    onStatusChange(status);
    // Close the swipeable actions after a status is selected.
    swipeableRef.current?.close();
  };

  /**
   * Handles a full redemption of the reward by setting the redemption value
   * to the estimated value and marking the reward as used.
   */
  const handleFullRedemption = () => {
    setRedemptionValue(estimatedValue.replace(/[^\d.]/g, ''));
    handleStatusChange('used');
  };

  /**
   * Handles the scroll event of the months ScrollView to show/hide the chevrons.
   * @param event The scroll event from the ScrollView.
   */
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    // Show the left chevron if the user has scrolled from the beginning.
    if (scrollX > 0) {
      setShowLeftChevron(true);
    } else {
      setShowLeftChevron(false);
    }

    // Show the right chevron if the user has not reached the end of the scroll view.
    if (scrollX < contentWidth - layoutWidth - 1) {
      setShowRightChevron(true);
    } else {
      setShowRightChevron(false);
    }
  };

  /**
   * Scrolls the months ScrollView by a certain amount.
   * This is used by the chevron buttons.
   * @param amount The amount to scroll by.
   */
  const scroll = (amount) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: amount, animated: true });
    }
  };

  /**
   * A simple vertical divider component for use within the swipeable actions.
   */
  const SimpleVerticalDivider = () => {
    return <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />;
  };

  /**
   * A simple horizontal divider component for use within the swipeable actions.
   */
  const SimpleDivider = () => {
    return <View style={{ height: 1, width: '100%', backgroundColor: colors.border }} />;
  };

  /**
   * Renders the left actions for the swipeable component, allowing the user to change the status of the reward.
   * The layout of the actions (horizontal or vertical) depends on whether the card is expanded.
   * @param progress The progress of the swipe gesture.
   * @param dragX The horizontal drag distance from the gesture.
   */
  const renderLeftActions = (progress, dragX) => {
    return (
      <NeumorphicWrapper style={{ borderRadius: 8, marginHorizontal: 24, marginVertical: 10 }}>
        <View style={[styles.leftActionContainer, { height: cardHeight, flexDirection: expanded ? 'column' : 'row' }]}>
          <TouchableOpacity onPress={() => handleStatusChange('used')} style={styles.actionButton}>
            <FontAwesome5 name="check-circle" size={20} color={colors.success} />
          </TouchableOpacity>
          {expanded ? <SimpleDivider /> : <SimpleVerticalDivider />}
          <TouchableOpacity onPress={() => handleStatusChange('inProgress')} style={styles.actionButton}>
            <FontAwesome5 name="spinner" size={20} color={colors.warning} />
          </TouchableOpacity>
          {expanded ? <SimpleDivider /> : <SimpleVerticalDivider />}
          <TouchableOpacity onPress={() => handleStatusChange('unused')} style={styles.actionButton}>
            <FontAwesome5 name="times-circle" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </NeumorphicWrapper>
    );
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      gap: 10
    },
    iconContainer: {
      width: 20,
      alignItems: 'center',
    },
    titleContainer: {
      width: '55%',
    },
    title: {
      ...typography.fonts.subtitle,
      color: colors.text,
      textAlign: 'left',
    },
    valueContainer: {
      width: 95,
      alignItems: 'center',
    },
    estimatedValue: {
      ...typography.fonts.subtitle,
      color: colors.textSecondary,
    },
    chevronContainer: {
      width: 15,
      alignItems: 'center',
    },
    body: {
      padding: 16,
    },
    sectionTitle: {
      ...typography.fonts.subtitle,
      color: colors.text,
      marginBottom: 8,
    },
    bodyText: {
      ...typography.fonts.body,
      color: colors.textSecondary,
      marginBottom: 12,
    },
    leftActionContainer: {
      backgroundColor: colors.background,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      borderRadius: 10,
    },
    actionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    monthsContainer: {
      marginBottom: 16,
      paddingVertical: 8,
    },
    redemptionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    redemptionInputContainer: {
      flex: 1,
    },
    orText: {
      ...typography.fonts.body,
      color: colors.textSecondary,
      marginHorizontal: 8,
    },
    scrollViewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    chevron: {
      padding: 8,
    },
  });

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const quarters = ['JAN-MAR', 'APR-JUN', 'JUL-SEP', 'OCT-DEC'];
  const semiAnnuals = ['JAN-JUN', 'JUL-DEC'];

  // The main content of the card, which is wrapped in a Swipeable component.
  const cardContent = (
    // The onLayout prop is used to get the height of the card, which is then used to set the height of the swipeable actions.
    <View onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)} style={styles.container}>
      {/* The header of the card, which is always visible. */}
      <TouchableOpacity onPress={onPress}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name={statusIcon} size={20} color={statusColor} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
          </View>
          {/* The estimated value and reward type are only shown if an estimated value is provided. */}
          {estimatedValue && (
            <View style={styles.valueContainer}>
              <Text style={styles.estimatedValue}>{estimatedValue}</Text>
              {rewardType && <RewardTypeLabel rewardType={rewardType} />}
            </View>
          )}
          <View style={styles.chevronContainer}>
            <FontAwesome5 name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.text} />
          </View>
        </View>
      </TouchableOpacity>
      {/* The body of the card, which is only visible when the card is expanded. */}
      {expanded && (
        <>
          <Divider />
          <View style={styles.body}>
            {/* The redemption section is only shown for rewards that are not one-time. */}
            {rewardType !== 'oneTime' && (
              <>
                <Text style={styles.sectionTitle}>Redemption</Text>
                {/* The monthly redemption tracker. */}
                {rewardType === 'monthly' && (
                  <View style={styles.scrollViewContainer}>
                    {showLeftChevron && (
                      <TouchableOpacity onPress={() => scroll(0)} style={styles.chevron}>
                        <FontAwesome5 name="chevron-left" size={16} color={colors.text} />
                      </TouchableOpacity>
                    )}
                    <ScrollView
                      ref={scrollViewRef}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.monthsContainer}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                    >
                      {months.map((month, index) => (
                        <MonthTile
                          key={index}
                          month={month}
                          isUsed={usedMonths.includes(month)}
                          estimatedValue={estimatedValue}
                          onToggle={() => onToggleMonth(month)}
                          currentMonth={currentMonth}
                        />
                      ))}
                    </ScrollView>
                    {showRightChevron && (
                      <TouchableOpacity onPress={() => scroll(500)} style={styles.chevron}>
                        <FontAwesome5 name="chevron-right" size={16} color={colors.text} />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {/* The quarterly redemption tracker. */}
                {rewardType === 'quarterly' && (
                  <View style={styles.scrollViewContainer}>
                    {showLeftChevron && (
                      <TouchableOpacity onPress={() => scroll(0)} style={styles.chevron}>
                        <FontAwesome5 name="chevron-left" size={16} color={colors.text} />
                      </TouchableOpacity>
                    )}
                    <ScrollView
                      ref={scrollViewRef}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.monthsContainer}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                    >
                      {quarters.map((quarter, index) => (
                        <MonthTile
                          key={index}
                          label={quarter}
                          isUsed={usedMonths.includes(quarter)}
                          onToggle={() => onToggleMonth(quarter)}
                          periodType="quarterly"
                        />
                      ))}
                    </ScrollView>
                    {showRightChevron && (
                      <TouchableOpacity onPress={() => scroll(500)} style={styles.chevron}>
                        <FontAwesome5 name="chevron-right" size={16} color={colors.text} />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {/* The semi-annual redemption tracker. */}
                {rewardType === 'semiannual' && (
                  <View style={styles.scrollViewContainer}>
                    {showLeftChevron && (
                      <TouchableOpacity onPress={() => scroll(0)} style={styles.chevron}>
                        <FontAwesome5 name="chevron-left" size={16} color={colors.text} />
                      </TouchableOpacity>
                    )}
                    <ScrollView
                      ref={scrollViewRef}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.monthsContainer}
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                    >
                      {semiAnnuals.map((semi, index) => (
                        <MonthTile
                          key={index}
                          label={semi}
                          isUsed={usedMonths.includes(semi)}
                          onToggle={() => onToggleMonth(semi)}
                          periodType="semiannual"
                        />
                      ))}
                    </ScrollView>
                    {showRightChevron && (
                      <TouchableOpacity onPress={() => scroll(500)} style={styles.chevron}>
                        <FontAwesome5 name="chevron-right" size={16} color={colors.text} />
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {/* For other reward types, show a simple redemption input. */}
                {rewardType !== 'monthly' && rewardType !== 'quarterly' && rewardType !== 'semiannual' && (
                  <View style={styles.redemptionContainer}>
                    <View style={styles.redemptionInputContainer}>
                      <InsetNeumorphicInput
                        value={redemptionValue}
                        onChangeText={setRedemptionValue}
                        placeholder="0.00"
                      />
                    </View>
                    <Text style={styles.orText}>or</Text>
                    <FullRedemptionButton onPress={handleFullRedemption} />
                  </View>
                )}
              </>
            )}
            {/* The description, activation, and conditions sections. */}
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.bodyText}>{description}</Text>
            <Text style={styles.sectionTitle}>Activation</Text>
            <Text style={styles.bodyText}>{activation}</Text>
            <Text style={styles.sectionTitle}>Conditions</Text>
            <Text style={styles.bodyText}>{conditions}</Text>
          </View>
        </>
      )}
    </View>
  );

  // The final component is a Swipeable that wraps the card content.
  return (
    <Swipeable ref={swipeableRef} renderLeftActions={renderLeftActions} leftThreshold={0.1}>
      <NeumorphicWrapper style={{ borderRadius: 8, marginHorizontal: 24, marginVertical: 10 }}>
        {cardContent}
      </NeumorphicWrapper>
    </Swipeable>
  );
}