/**
 * This file defines the AddDocumentScreen, which provides the UI for adding
 * new documents to the user's collection.
 */
import { View, StyleSheet } from 'react-native';
import { DocumentsHub } from '../../../components/DocumentsHub';
import { useTheme } from '@ui';
import { useDocumentUploader } from '../../../lib/hooks/useDocumentUploader';
import { UserDocument } from '@utils';
import { useRouter } from 'expo-router';

/**
 * Screen for adding a new document.
 * It simply renders the DocumentsHub component.
 */
export default function AddDocumentScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { uploadDocument, loading } = useDocumentUploader();

  const handleUpload = async (docToUpload: UserDocument) => {
    const result = await uploadDocument(docToUpload);
    if (result.success) {
      router.back();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: 20, // Add some padding to the top
    },
  });

  return (
    <View style={styles.container}>
      <DocumentsHub onUpload={handleUpload} disabled={loading} />
    </View>
  );
}
