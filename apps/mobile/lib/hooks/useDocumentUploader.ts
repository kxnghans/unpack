import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import documentStore from '../document-store';
import { UserDocument } from '@utils';

export const useDocumentUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadDocument = async (docToUpload: UserDocument) => {
    setLoading(true);
    setError(null);

    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.type === 'success') {
        console.log(`Simulating upload for: ${result.name}`);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add the document to the store with the URI
        documentStore.addDocument({
          ...docToUpload,
          status: 'Uploaded',
          uploadedAt: new Date(),
          uri: result.uri,
          // Use the user-provided name for custom docs, otherwise the type name
          customName: docToUpload.type.isCustom ? docToUpload.customName : docToUpload.type.name,
        });

        console.log('Upload successful (simulated).');
        setLoading(false);
        return { success: true };
      } else {
        console.log('Document picking cancelled.');
        setLoading(false);
        return { success: false };
      }
    } catch (err) {
      console.error('Error during document picking/upload:', err);
      setError(err as Error);
      setLoading(false);
      return { success: false };
    }
  };

  return { uploadDocument, loading, error };
};
