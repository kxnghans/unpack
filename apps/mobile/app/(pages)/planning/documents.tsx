/**
 * This file defines the DocumentsScreen, which displays a list of the user's
 * uploaded documents.
 */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
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

  // The useFocusEffect hook runs when the screen comes into focus.
  // It's used here to load documents from the store and subscribe to updates.
  useFocusEffect(
    useCallback(() => {
      const storeDocs = documentStore.getDocuments();
      setUploadedDocs(storeDocs);

      // Subscribe to future updates to the document store.
      const unsubscribe = documentStore.subscribe(() => {
        const storeDocs = documentStore.getDocuments();
        setUploadedDocs(storeDocs);
      });

      // Unsubscribe from the document store when the screen goes out of focus.
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
            />
          )}
        />
      )}

    </View>
  );
}
