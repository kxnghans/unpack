import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from './ThemeProvider';

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

export const PillButton = ({ children, onPress }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      backgroundColor: colors.primary,
    },
    text: {
      ...typography.fonts.title,
      color: colors.white,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <NeumorphicWrapper style={{ borderRadius: 30 }}>
        <View style={styles.container}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </NeumorphicWrapper>
    </TouchableOpacity>
  );
};
