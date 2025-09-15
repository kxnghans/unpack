import { View, StyleSheet } from 'react-native';
import { DocumentsHub } from '../../../components/DocumentsHub';
import { useTheme } from '@ui';

export default function AddDocumentScreen() {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
      paddingTop: 20, // Add some padding to the top
    },
  });

  return (
    <View style={styles.container}>
      <DocumentsHub />
    </View>
  );
}
