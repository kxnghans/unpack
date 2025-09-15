import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

export const NeumorphicButton = ({ onPress, title, style, textStyle }) => {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 10,
      shadowColor: colors.highlight,
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.75,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colors.surface, // Default to neutral surface color
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      ...typography.fonts.title,
      color: colors.text, // Default to primary text color
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={[styles.button, style]}>
          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
