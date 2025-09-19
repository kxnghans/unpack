/**
 * This file defines the DocumentsScreen, which displays a list of the user's
 * uploaded documents.
 */
import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Alert, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
// Removed WebView import - using simpler approach
import { File } from 'expo-file-system';
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
  const [selectedDocUri, setSelectedDocUri] = useState<string | null>(null);
  const [webViewLoading, setWebViewLoading] = useState(true);

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
   * Handles pressing on a document card by attempting to open with system app first,
   * then falling back to share if that fails
   * @param {string} uri - The URI of the document to handle.
   * @param {string} title - The title of the document
   */
  const handlePressDocument = async (uri: string, title: string) => {
    try {
      const canOpen = await Linking.canOpenURL(uri);
      if (canOpen) {
        await Linking.openURL(uri);
      } else {
        // Automatically fallback to sharing
        await handleShareDocument(uri);
      }
    } catch (error) {
      console.error('Error opening document, falling back to share:', error);
      // Automatic fallback to sharing
      await handleShareDocument(uri);
    }
  };

  const handleShareDocument = async (uri: string) => {
    try {
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing document:', error);
      Alert.alert(
        'Share Error',
        'Failed to share the document. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleOpenExternally = async (uri: string) => {
    try {
      const canOpen = await Linking.canOpenURL(uri);
      if (canOpen) {
        await Linking.openURL(uri);
      } else {
        // Fallback to sharing if can't open directly
        Alert.alert(
          'Cannot Open',
          'Cannot open this file type directly. Would you like to share it to another app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Share', onPress: () => handleShareDocument(uri) },
          ]
        );
      }
    } catch (error) {
      console.error('Error opening document externally:', error);
      // Fallback to sharing
      await handleShareDocument(uri);
    }
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

  const getFileIcon = (uri: string) => {
    const extension = uri.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'file-pdf';
      case 'doc':
      case 'docx':
        return 'file-word';
      case 'xls':
      case 'xlsx':
        return 'file-excel';
      case 'ppt':
      case 'pptx':
        return 'file-powerpoint';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'file-image';
      default:
        return 'file-alt';
    }
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
    modalContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    modalTitle: {
        ...typography.fonts.subtitle,
        color: colors.text,
        flex: 1,
        marginRight: 10,
    },
    closeButton: {
        padding: 10,
    },
    webViewContainer: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
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
              imageUrl={item.type.imageUrl}
              icon={<FontAwesome5 name={item.type.icon!} size={24} color={colors.textOnOverlay} />}
              title={item.customName || item.type.name}
              body={getOriginalFileName(item.uri!)}
              onPress={() => handlePressDocument(item.uri!, item.customName || item.type.name)}
              onLongPress={() => handleDeleteDocument(item)}
            />
          )}
        />
      )}

      {selectedDocUri && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={!!selectedDocUri}
            onRequestClose={() => {
              setSelectedDocUri(null);
            }}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle} numberOfLines={1}>
                        Document Preview Not Available
                    </Text>
                    <TouchableOpacity 
                        style={styles.closeButton} 
                        onPress={() => setSelectedDocUri(null)}
                    >
                        <FontAwesome5 name="times" size={24} color={colors.text} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.webViewContainer}>
                    <View style={styles.loadingContainer}>
                        <FontAwesome5 name="file-alt" size={48} color={colors.textSecondary} />
                        <Text style={[styles.placeholderText, { marginTop: 20, textAlign: 'center' }]}>
                            In-app document viewing is not available.{'\n\n'}
                            Use "Open with System App" or "Share" to view this document.
                        </Text>
                        <TouchableOpacity 
                            style={{ 
                                backgroundColor: colors.primary, 
                                padding: 15, 
                                borderRadius: 8, 
                                marginTop: 20 
                            }}
                            onPress={() => {
                                handleOpenExternally(selectedDocUri);
                                setSelectedDocUri(null);
                            }}
                        >
                            <Text style={{ color: colors.textOnPrimary, fontWeight: 'bold' }}>
                                Open with System App
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
          </Modal>
      )}
    </View>
  );
}
