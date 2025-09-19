/**
 * useDocumentUploader hook
 *
 * Provides a function for uploading a document and manages loading/error state.
 */
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { Directory, Paths, File } from 'expo-file-system';
import * as Linking from 'expo-linking';
import documentStore from '../document-store';
import { UserDocument } from '@utils';
import { UPCOMING_ITEMS } from '../mock-data';

const documentsDirectory = new Directory(Paths.document, 'documents');

export const useDocumentUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setupDirectory = async () => {
    if (!documentsDirectory.exists) {
      console.log('Creating documents directory');
      await documentsDirectory.create({ intermediates: true });
    }
  };

  const getFileExtension = (filename: string): string => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot !== -1 ? filename.substring(lastDot) : '';
  };

  const openFile = async (fileUri: string) => {
    try {
      const canOpen = await Linking.canOpenURL(fileUri);
      if (canOpen) {
        await Linking.openURL(fileUri);
      } else {
        console.warn('Cannot open file:', fileUri);
      }
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  const uploadDocument = async (docToUpload: UserDocument) => {
    setLoading(true);
    setError(null);

    try {
      console.log('Picking document...');
      const result = await DocumentPicker.getDocumentAsync();
      console.log('Document picker result:', result);

      if (!result.canceled) {
        const asset = result.assets[0];
        console.log('Document asset:', asset);

        await setupDirectory();

        // Create filename with proper extension
        const fileExtension = getFileExtension(asset.name);
        const fileName = `${Date.now()}-${asset.name}`;
        
        // Create File objects for source and destination
        const sourceFile = new File(asset.uri);
        const destinationFile = new File(documentsDirectory, fileName);

        console.log(`Copying file from ${asset.uri} to ${destinationFile.uri}`);

        // Use the new File.copy() method
        await sourceFile.copy(destinationFile);

        console.log('File copied successfully');

        documentStore.addDocument({
          ...docToUpload,
          status: 'Uploaded',
          uploadedAt: new Date(),
          uri: destinationFile.uri,
          customName: docToUpload.type.isCustom
            ? docToUpload.customName
            : docToUpload.type.name,
        });

        const documentTitle = docToUpload.type.isCustom
          ? docToUpload.customName
          : docToUpload.type.name;

        UPCOMING_ITEMS.push({
          id: Date.now().toString(),
          type: 'document',
          title: documentTitle,
          body: 'Tap to open',
          url: destinationFile.uri,
          onPress: () => openFile(destinationFile.uri), // Add click handler
        });

        console.log('Upload successful.');
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
