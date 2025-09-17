/**
 * This file defines the useDocumentUploader hook, which provides a function for
 * uploading a document and manages the loading and error states of the upload.
 */
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import documentStore from '../document-store';
import { UserDocument } from '@utils';

/**
 * A hook to upload a document.
 * @returns An object with the upload function, loading state, and error state.
 */
export const useDocumentUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Uploads a document.
   * This function simulates an upload by using the DocumentPicker to select a
   * document and then adding it to the in-memory store.
   * @param {UserDocument} docToUpload - The document to upload.
   * @returns {Promise<{success: boolean}>} A promise that resolves with an object indicating whether the upload was successful.
   */
  const uploadDocument = async (docToUpload: UserDocument) => {
    setLoading(true);
    setError(null);

    try {
      const result = await DocumentPicker.getDocumentAsync();

      if (result.type === 'success') {
        // Simulate a network delay for the upload.
        console.log(`Simulating upload for: ${result.name}`);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add the document to the store with the URI from the document picker.
        documentStore.addDocument({
          ...docToUpload,
          status: 'Uploaded',
          uploadedAt: new Date(),
          uri: result.uri,
          // Use the user-provided name for custom docs, otherwise the type name.
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
