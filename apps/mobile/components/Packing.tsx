/**
 * This file defines the Packing component, which is a placeholder for
 * displaying the user's smart packing list.
 */
import { View, Text, StyleSheet } from "react-native";
import React from 'react';
import { useTheme } from "@ui/ThemeProvider";

/**
 * A component to display the user's smart packing list.
 */
export function Packing() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
            ...typography.fonts.body,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Smart Packing List 🎒</Text>
    </View>
  );
}
