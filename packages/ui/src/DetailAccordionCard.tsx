import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from './ThemeProvider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export interface DetailAccordionCardProps {
  statusIcon: string;
  statusColor: string;
  title: string;
  estimatedValue?: string;
  description: string;
  activation: string;
  conditions: string;
}

export function DetailAccordionCard({ 
  statusIcon, 
  statusColor, 
  title, 
  estimatedValue, 
  description, 
  activation, 
  conditions 
}: DetailAccordionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { colors, typography } = useTheme();

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 8,
      marginBottom: 16,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors.surface,
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
  });

  return (
    <View style={styles.container}>
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
        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.bodyText}>{description}</Text>
          <Text style={styles.sectionTitle}>Activation</Text>
          <Text style={styles.bodyText}>{activation}</Text>
          <Text style={styles.sectionTitle}>Conditions</Text>
          <Text style={styles.bodyText}>{conditions}</Text>
        </View>
      )}
    </View>
  );
}
