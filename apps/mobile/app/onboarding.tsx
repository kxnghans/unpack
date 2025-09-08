import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@ui/ThemeProvider";

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
