/**
 * This file defines the AddDocumentScreen, which provides the UI for adding
 * new documents to the user's collection.
 */
import { View, StyleSheet } from 'react-native';
import { DocumentsHub } from '../../../components/DocumentsHub';
import { useTheme } from '@ui';

/**
 * Screen for adding a new document.
 * It simply renders the DocumentsHub component.
 */
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
