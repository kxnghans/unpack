/**
 * This file defines the DocumentsHub component, which allows users to manage
 * and upload their travel documents.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { InsetNeumorphicInput, UpcomingCard, useTheme } from '@ui';
import { POPULAR_DOCUMENTS } from '../lib/mock-data';
import { UserDocument } from '@utils';
import { nanoid } from 'nanoid/non-secure';
import { useDocumentUploader } from '../lib/hooks/useDocumentUploader';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

/**
 * A component that displays a single document item, with a button to upload it.
 * @param {object} props - The component props.
 * @param {UserDocument} props.document - The document to display.
 * @param {() => void} props.onUpload - A function to call when the upload button is pressed.
 * @param {boolean} props.disabled - Whether the upload button is disabled.
 */
const DocumentItem = ({
  document,
  onUpload,
  disabled,
}: {
  document: UserDocument;
  onUpload: () => void;
  disabled: boolean;
}) => {
  const { colors } = useTheme();
  const isUploaded = document.status === 'Uploaded';

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      opacity: disabled && !isUploaded ? 0.5 : 1,
    },
    name: {
      color: isUploaded ? colors.textSecondary : colors.text,
      flex: 1,
    },
    uploadButton: {
      backgroundColor: isUploaded ? colors.success : colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      minWidth: 80,
      alignItems: 'center',
    },
    uploadButtonText: {
      color: colors.white,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{document.type.name}</Text>
      <TouchableOpacity
        onPress={onUpload}
        style={styles.uploadButton}
        disabled={isUploaded || disabled}
      >
        {/* Show a loading indicator when the upload is in progress. */}
        {disabled && !isUploaded ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.uploadButtonText}>
            {isUploaded ? 'Uploaded' : 'Upload'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

/**
 * A component that allows the user to upload a custom document with a custom name.
 * @param {object} props - The component props.
 * @param {(customName: string) => void} props.onUpload - A function to call when the upload button is pressed.
 * @param {boolean} props.disabled - Whether the upload button is disabled.
 */
const OtherDocumentItem = ({
  onUpload,
  disabled,
}: {
  onUpload: (customName: string) => void;
  disabled: boolean;
}) => {
  const { colors } = useTheme();
  const [isAddingOther, setIsAddingOther] = useState(false);
  const [customName, setCustomName] = useState('');

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    name: {
      color: colors.text,
      flex: 1,
    },
    iconButton: {
      padding: 8,
    },
    inputContainer: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      marginRight: 8,
    },
    uploadButton: {
      backgroundColor: customName ? colors.primary : colors.disabled,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      minWidth: 80,
      alignItems: 'center',
    },
    uploadButtonText: {
      color: colors.white,
      fontWeight: 'bold',
    },
    asterisk: {
      color: 'red',
      marginRight: 4,
    },
  });

  /**
   * Handles the upload of a custom document, then resets the state.
   */
  const handleUpload = () => {
    onUpload(customName);
    setCustomName('');
    setIsAddingOther(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.name}>Other</Text>
        {/* The plus/minus button toggles the visibility of the custom input field. */}
        <TouchableOpacity
          onPress={() => setIsAddingOther(!isAddingOther)}
          style={styles.iconButton}
        >
          <Feather name={isAddingOther ? 'minus-circle' : 'plus-circle'} size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {/* The custom input field is only shown when isAddingOther is true. */}
      {isAddingOther && (
        <View style={styles.inputContainer}>
          <Text style={styles.asterisk}>*</Text>
          <View style={styles.input}>
            <InsetNeumorphicInput
              placeholder="Document Type"
              value={customName}
              onChangeText={setCustomName}
              showDollarSign={false}
              keyboardType="default"
            />
          </View>
          <TouchableOpacity
            onPress={handleUpload}
            style={styles.uploadButton}
            disabled={disabled || !customName}
          >
            {disabled && customName ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.uploadButtonText}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

/**
 * A component that displays a list of documents and allows the user to upload them.
 * It manages the state of pending and uploaded documents.
 */
export const DocumentsHub = () => {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const { uploadDocument, loading } = useDocumentUploader();

  // The list of documents that have not yet been uploaded.
  const [pendingDocuments, setPendingDocuments] = useState<UserDocument[]>(
    POPULAR_DOCUMENTS.filter((doc) => !doc.isCustom).map((doc) => ({
      id: nanoid(),
      type: doc,
      status: 'Pending',
      customName: '',
    }))
  );
  // The list of documents that have been successfully uploaded.
  const [uploadedDocuments, setUploadedDocuments] = useState<UserDocument[]>([]);

  /**
   * Handles the upload of a document.
   * @param {UserDocument} docToUpload - The document to upload.
   */
  const handleUpload = async (docToUpload: UserDocument) => {
    const result = await uploadDocument(docToUpload);
    if (result.success) {
      const uploadedDoc = { ...docToUpload, status: 'Uploaded' as const };
      // Move the document from the pending list to the uploaded list.
      setUploadedDocuments((docs) => [...docs, uploadedDoc]);
      setPendingDocuments((docs) =>
        docs.filter((d) => d.id !== docToUpload.id)
      );
      // Navigate back to the previous screen after a short delay.
      setTimeout(() => router.back(), 500);
    }
  };

  /**
   * Handles the upload of a custom document.
   * @param {string} customName - The name of the custom document.
   */
  const handleOtherUpload = async (customName: string) => {
    const otherDocType = POPULAR_DOCUMENTS.find((doc) => doc.isCustom);
    if (otherDocType) {
      const newDoc: UserDocument = {
        id: nanoid(),
        type: otherDocType,
        status: 'Pending',
        customName,
      };
      const result = await uploadDocument(newDoc);
      if (result.success) {
        const uploadedDoc = { ...newDoc, status: 'Uploaded' as const };
        setUploadedDocuments((docs) => [...docs, uploadedDoc]);
        setTimeout(() => router.back(), 500);
      }
    }
  };

  const styles = StyleSheet.create({
    card: {
      width: 280,
      height: 'auto',
      borderRadius: 20,
      padding: 16,
      marginHorizontal: 16,
      backgroundColor: colors.card,
    },
    title: {
      ...typography.fonts.sectionHeader,
      color: colors.text,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Documents</Text>
      <ScrollView>
        {/* Display the list of uploaded documents. */}
        {uploadedDocuments.map((doc) => (
          <UpcomingCard
            key={doc.id}
            title={doc.customName || doc.type.name}
            body={doc.status}
            imageUrl="https://picsum.photos/200"
            icon={<Feather name="check-circle" size={24} color="white" />}
          />
        ))}
        {/* Display the list of pending documents. */}
        {pendingDocuments.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            onUpload={() => handleUpload(doc)}
            disabled={loading}
          />
        ))}
        {/* The component for uploading a custom document. */}
        <OtherDocumentItem onUpload={handleOtherUpload} disabled={loading} />
      </ScrollView>
    </View>
  );
};
