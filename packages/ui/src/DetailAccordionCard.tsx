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

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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

export interface DetailAccordionCardProps {
  statusIcon: string;
  statusColor: string;
  title: string;
  estimatedValue?: string;
  description: string;
  activation: string;
  conditions: string;
  onStatusChange?: (status: 'used' | 'inProgress' | 'unused') => void;
  expanded: boolean;
  onPress: () => void;
  rewardType?: 'annual' | 'monthly' | 'asNeeded' | 'multiYear' | 'quarterly' | 'semiannual' | 'oneTime';
  usedMonths?: string[];
  onToggleMonth?: (month: string) => void;
  currentMonth: number;
  onRedemptionChange?: (value: string) => void;
}

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
  const [cardHeight, setCardHeight] = useState(0);
  const [redemptionValue, setRedemptionValue] = useState('');
  const [showLeftChevron, setShowLeftChevron] = useState(false);
  const [showRightChevron, setShowRightChevron] = useState(true);
  const { colors, typography } = useTheme();
  const swipeableRef = useRef<Swipeable>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (onRedemptionChange) {
      onRedemptionChange(redemptionValue);
    }
  }, [redemptionValue]);

  const handleStatusChange = (status: 'used' | 'inProgress' | 'unused') => {
    onStatusChange(status);
    swipeableRef.current?.close();
  };

  const handleFullRedemption = () => {
    setRedemptionValue(estimatedValue.replace(/[^\d.]/g, ''));
    handleStatusChange('used');
  };

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    if (scrollX > 0) {
      setShowLeftChevron(true);
    } else {
      setShowLeftChevron(false);
    }

    if (scrollX < contentWidth - layoutWidth - 1) {
      setShowRightChevron(true);
    } else {
      setShowRightChevron(false);
    }
  };

  const scroll = (amount) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: amount, animated: true });
    }
  };

  const SimpleVerticalDivider = () => {
    return <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />;
  };

  const SimpleDivider = () => {
    return <View style={{ height: 1, width: '100%', backgroundColor: colors.border }} />;
  };

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
      backgroundColor: colors.surface,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    statusIcon: {
      marginRight: 12,
    },
    titleContainer: {
      flex: 1,
      marginRight: 8,
    },
    title: {
      ...typography.fonts.subtitle,
      color: colors.text,
    },
    estimatedValueContainer: {
      alignItems: 'center',
    },
    estimatedValue: {
      ...typography.fonts.subtitle,
      color: colors.textSecondary,
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
      backgroundColor: colors.surface,
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

  const cardContent = (
    <View onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)} style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesome5 name={statusIcon} size={20} color={statusColor} style={styles.statusIcon} />
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>{title}</Text>
            </View>
          </View>
          {estimatedValue && (
            <View style={styles.estimatedValueContainer}>
              <Text style={styles.estimatedValue}>{estimatedValue}</Text>
              {rewardType && <RewardTypeLabel rewardType={rewardType} />}
            </View>
          )}
          <FontAwesome5 name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.text} />
        </View>
      </TouchableOpacity>
      {expanded && (
        <>
          <Divider />
          <View style={styles.body}>
            {rewardType !== 'oneTime' && (
              <>
                <Text style={styles.sectionTitle}>Redemption</Text>
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

  return (
    <Swipeable ref={swipeableRef} renderLeftActions={renderLeftActions} leftThreshold={0.1}>
      <NeumorphicWrapper style={{ borderRadius: 8, marginHorizontal: 24, marginVertical: 10 }}>
        {cardContent}
      </NeumorphicWrapper>
    </Swipeable>
  );
}