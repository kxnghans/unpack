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
import { InsetNeumorphicInput, useTheme } from '@ui';
import { QUICK_ACCESS_DOCS } from '../lib/mock-data';
import { UserDocument } from '@utils';
import { nanoid } from 'nanoid/non-secure';
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

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      opacity: disabled ? 0.5 : 1,
    },
    name: {
      color: colors.text,
      flex: 1,
    },
    uploadButton: {
      backgroundColor: colors.primary,
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
        disabled={disabled}
      >
        {disabled ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={styles.uploadButtonText}>Upload</Text>
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
const OtherDocumentItem = ({ onUpload, disabled }: { onUpload: (customName: string) => void; disabled: boolean; }) => {
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

  const handleUpload = () => {
    onUpload(customName);
    setCustomName('');
    setIsAddingOther(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.name}>Other</Text>
        <TouchableOpacity
          onPress={() => setIsAddingOther(!isAddingOther)}
          style={styles.iconButton}
        >
          <Feather name={isAddingOther ? 'minus-circle' : 'plus-circle'} size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
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
export const DocumentsHub = ({ onUpload, disabled }: { onUpload: (doc: UserDocument) => void, disabled: boolean }) => {
  const { colors, typography } = useTheme();

  const quickAccessDocs = QUICK_ACCESS_DOCS.filter((doc) => !doc.isCustom).map((doc) => ({
    id: nanoid(),
    type: doc,
    status: 'Pending',
    customName: '',
  }));

  const handleOtherUpload = (customName: string) => {
    const otherDocType = QUICK_ACCESS_DOCS.find((doc) => doc.isCustom);
    if (otherDocType) {
      const newDoc: UserDocument = {
        id: nanoid(),
        type: otherDocType,
        status: 'Pending',
        customName,
      };
      onUpload(newDoc);
    }
  };

  const styles = StyleSheet.create({
    card: {
      height: 'auto',
      borderRadius: 20,
      padding: 16,
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
        {quickAccessDocs.map((doc) => (
          <DocumentItem
            key={doc.id}
            document={doc}
            onUpload={() => onUpload(doc)}
            disabled={disabled}
          />
        ))}
        <OtherDocumentItem onUpload={handleOtherUpload} disabled={disabled} />
      </ScrollView>
    </View>
  );
};