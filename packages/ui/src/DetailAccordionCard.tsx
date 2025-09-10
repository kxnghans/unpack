import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';
import { Divider } from './Divider';
import { Swipeable } from 'react-native-gesture-handler';

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
      shadowOpacity: 1,
      shadowRadius: 8,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
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
}

export function DetailAccordionCard({ 
  statusIcon, 
  statusColor, 
  title, 
  estimatedValue, 
  description, 
  activation, 
  conditions, 
  onStatusChange 
}: DetailAccordionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const { colors, typography } = useTheme();
  const swipeableRef = useRef<Swipeable>(null);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const handleStatusChange = (status: 'used' | 'inProgress' | 'unused') => {
    onStatusChange(status);
    swipeableRef.current?.close();
  };

  const renderLeftActions = (progress, dragX) => {
    return (
      <NeumorphicWrapper style={{ borderRadius: 8, marginHorizontal: 24 }}>
        <View style={[styles.leftActionContainer, { height: cardHeight, flexDirection: expanded ? 'column' : 'row' }]}>
          <TouchableOpacity onPress={() => handleStatusChange('used')} style={styles.actionButton}>
            <FontAwesome5 name="check-circle" size={24} color={colors.success} />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handleStatusChange('inProgress')} style={styles.actionButton}>
            <FontAwesome5 name="spinner" size={24} color={colors.warning} />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => handleStatusChange('unused')} style={styles.actionButton}>
            <FontAwesome5 name="times-circle" size={24} color={colors.danger} />
          </TouchableOpacity>
        </View>
      </NeumorphicWrapper>
    );
  };

  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: colors.surface,
      marginHorizontal: 24,
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
    },
    statusIcon: {
      marginRight: 12,
    },
    title: {
      ...typography.fonts.subtitle,
      color: colors.text,
    },
    estimatedValue: {
      ...typography.fonts.subtitle,
      color: colors.textSecondary,
      marginLeft: 8,
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
      ...typography.fonts.description,
      color: colors.textSecondary,
      marginBottom: 12,
    },
    leftActionContainer: {
      backgroundColor: colors.surface,
      justifyContent: 'space-evenly',
      borderRadius: 8,
    },
    actionButton: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  });

  const cardContent = (
    <View onLayout={(event) => setCardHeight(event.nativeEvent.layout.height)} style={styles.container}>
      <TouchableOpacity onPress={toggleExpand}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <FontAwesome5 name={statusIcon} size={20} color={statusColor} style={styles.statusIcon} />
            <Text style={styles.title}>{title}</Text>
            {estimatedValue && <Text style={styles.estimatedValue}>{estimatedValue}</Text>}
          </View>
          <FontAwesome5 name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={colors.text} />
        </View>
      </TouchableOpacity>
      {expanded && (
        <>
          <Divider />
          <View style={styles.body}>
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
    <Swipeable ref={swipeableRef} renderLeftActions={renderLeftActions}>
      <NeumorphicWrapper style={{ borderRadius: 8 }}>
        {cardContent}
      </NeumorphicWrapper>
    </Swipeable>
  );
}
