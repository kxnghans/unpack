import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { useTheme } from './ThemeProvider';

const InsetNeumorphicWrapper = ({ children, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    inset: {
      borderRadius: 10,
      shadowColor: colors.highlight,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      borderRadius: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.75,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colors.surface,
    },
  });

  return (
    <View style={styles.inset}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
};

export const InsetNeumorphicInput = ({ value, onChangeText, placeholder }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    dollarSign: {
      ...typography.fonts.body,
      color: colors.textSecondary,
      marginRight: 4,
    },
    input: {
      ...typography.fonts.body,
      color: colors.text,
      flex: 1,
    },
  });

  return (
    <InsetNeumorphicWrapper>
      <View style={styles.container}>
        <Text style={styles.dollarSign}>$</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType="numeric"
        />
      </View>
    </InsetNeumorphicWrapper>
  );
};
