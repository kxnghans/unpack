/**
 * This file defines the DocumentsScreen, which displays a list of the user's
 * uploaded documents.
 */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { File } from 'expo-file-system'; // Import File from new API
import { UpcomingCard, useTheme, CardGrid } from '@ui';
import documentStore from '../../../lib/document-store';
import { UserDocument } from '@utils';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * Screen that displays a list of uploaded documents.
 * It uses a simple in-memory store to persist documents across screen navigations.
 */
export default function DocumentsScreen() {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const [uploadedDocs, setUploadedDocs] = useState<UserDocument[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadDocuments = async () => {
        const storeDocs = await documentStore.getDocuments();
        setUploadedDocs(storeDocs);
      };

      loadDocuments();

      const unsubscribe = documentStore.subscribe(() => {
        loadDocuments();
      });

      return () => unsubscribe();
    }, [])
  );

  /**
   * Handles pressing on a document card by opening the document's URI.
   * @param {string} uri - The URI of the document to open.
   */
  const handlePressDocument = async (uri: string) => {
    await Sharing.shareAsync(uri);
  };

  const handleDeleteDocument = (doc: UserDocument) => {
    Alert.alert(
      'Delete Document',
      `Are you sure you want to delete ${doc.customName || doc.type.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Remove from document store first
              await documentStore.deleteDocument(doc.id);
              
              // Delete the physical file using new File API
              if (doc.uri) {
                const file = new File(doc.uri);
                if (file.exists) {
                  await file.delete();
                  console.log('File deleted successfully:', doc.uri);
                } else {
                  console.warn('File does not exist:', doc.uri);
                }
              }
            } catch (error) {
              console.error('Error deleting document:', error);
              Alert.alert(
                'Delete Error',
                'Failed to delete the document. Please try again.',
                [{ text: 'OK' }]
              );
            }
          },
        },
      ]
    );
  };

  const getOriginalFileName = (uri: string) => {
    if (!uri) return '';
    const filename = uri.split('/').pop();
    if (!filename) return '';
    const hyphenIndex = filename.indexOf('-');
    if (hyphenIndex === -1) return filename;
    return filename.substring(hyphenIndex + 1);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
      ...typography.fonts.body,
      color: colors.textSecondary,
    },
    addButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {uploadedDocs.length === 0 ? (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>You have no uploaded documents.</Text>
        </View>
      ) : (
        <CardGrid
          data={uploadedDocs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UpcomingCard
              icon={<FontAwesome5 name="file-alt" size={24} color={colors.textOnOverlay} />}
              title={item.customName || item.type.name}
              body={getOriginalFileName(item.uri!)}
              onPress={() => handlePressDocument(item.uri!)}
              onLongPress={() => handleDeleteDocument(item)}
            />
          )}
        />
      )}

    </View>
  );
}
