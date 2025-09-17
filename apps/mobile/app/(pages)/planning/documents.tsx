/**
 * This file defines the DocumentsScreen, which displays a list of the user's
 * uploaded documents.
 */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { UpcomingCard, useTheme, CardGrid } from '@ui';
import documentStore from '../../../lib/document-store';
import { UserDocument } from '@utils';
import { FontAwesome5 } from '@expo/vector-icons';
import { MOCK_UPLOADED_DOCUMENTS } from '../../../lib/mock-data';

/**
 * Screen that displays a list of uploaded documents.
 * It uses a simple in-memory store to persist documents across screen navigations.
 */
export default function DocumentsScreen() {
  const { colors, typography } = useTheme();
  const [uploadedDocs, setUploadedDocs] = useState<UserDocument[]>(MOCK_UPLOADED_DOCUMENTS);

  // The useFocusEffect hook runs when the screen comes into focus.
  // It's used here to load documents from the store and subscribe to updates.
  useFocusEffect(
    useCallback(() => {
      const storeDocs = documentStore.getDocuments();
      // Merge the documents from the store with the existing documents in state, avoiding duplicates.
      setUploadedDocs(prevDocs => {
        const allDocs = [...prevDocs];
        storeDocs.forEach(storeDoc => {
          if (!allDocs.find(d => d.id === storeDoc.id)) {
            allDocs.push(storeDoc);
          }
        });
        return allDocs;
      });

      // Subscribe to future updates to the document store.
      const unsubscribe = documentStore.subscribe(() => {
        const storeDocs = documentStore.getDocuments();
        setUploadedDocs(prevDocs => {
          const allDocs = [...prevDocs];
          storeDocs.forEach(storeDoc => {
            if (!allDocs.find(d => d.id === storeDoc.id)) {
              allDocs.push(storeDoc);
            }
          });
          return allDocs;
        });
      });

      // Unsubscribe from the document store when the screen goes out of focus.
      return () => unsubscribe();
    }, [])
  );

  /**
   * Handles pressing on a document card by opening the document's URI.
   * @param {string} uri - The URI of the document to open.
   */
  const handlePressDocument = (uri: string) => {
    Linking.canOpenURL(uri).then(supported => {
      if (supported) {
        Linking.openURL(uri);
      } else {
        console.log("Don't know how to open URI: " + uri);
      }
    });
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
  });

  // If there are no uploaded documents, display a placeholder message.
  if (uploadedDocs.length === 0) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>You have no uploaded documents.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* The CardGrid component is used to display the documents in a grid format. */}
      <CardGrid
        data={uploadedDocs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <UpcomingCard
              title={item.customName || item.type.name}
              body={`Uploaded on ${item.uploadedAt?.toLocaleDateString()}`}
              icon={<FontAwesome5 name="file-alt" size={24} color={colors.textOnOverlay} />}
              onPress={() => handlePressDocument(item.uri!)}
              imageUrl="https://images.unsplash.com/photo-1583322097458-1d9b23641b46?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
        )}
      />
    </View>
  );
}

