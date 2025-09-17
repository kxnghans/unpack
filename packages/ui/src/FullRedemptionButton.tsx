/**
 * This file defines the FullRedemptionButton component, a button used to indicate
 * that a full redemption has been received for a reward.
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from './ThemeProvider';

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
 * A button that allows the user to indicate that they have received a full redemption.
 * @param {object} props - The component props.
 * @param {() => void} props.onPress - A function to call when the button is pressed.
 */
export const FullRedemptionButton = ({ onPress }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.mediumGrey,
    },
    text: {
      ...typography.fonts.caption,
      color: colors.text,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <NeumorphicWrapper style={{ borderRadius: 10 }}>
        <View style={styles.container}>
          <Text style={styles.text}>Full Redemption Received</Text>
        </View>
      </NeumorphicWrapper>
    </TouchableOpacity>
  );
};
