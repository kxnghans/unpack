import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "./ThemeProvider";

/**
 * The props for the Button component.
 */
type Props = {
  /**
   * The title of the button.
   */
  title: string;
  /**
   * The function to call when the button is pressed.
   */
  onPress: () => void;
};

/**
 * A reusable button component.
 */
export function Button({ title, onPress }: Props) {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      padding: 12,
      borderRadius: 8,
    },
    text: {
      color: colors.card,
      textAlign: "center",
      ...typography.fonts.title,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
