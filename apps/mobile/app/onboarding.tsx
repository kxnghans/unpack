/**
 * This file defines the Onboarding screen, which is a placeholder for the
 * app's onboarding flow.
 */
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@ui/ThemeProvider";

/**
 * The onboarding screen.
 */
export default function Onboarding() {
  const { typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      ...typography.fonts.pageHeader,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Unpack! Forward travel emails to get started 📧</Text>
    </View>
  );
}
