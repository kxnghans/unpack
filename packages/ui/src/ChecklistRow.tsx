import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from './ThemeProvider';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

export interface ChecklistRowProps {
  text: string;
  checked: boolean;
  onToggle: () => void;
  onChangeText: (text: string) => void;
  onDelete: () => void;
  isActive?: boolean;
  onFocus: () => void;
  onBlur: () => void;
  isMandatory?: boolean;
  allowMandatoryEdit?: boolean;
  isToggleDisabled?: boolean;
}

const InsetNeumorphicWrapper = ({ children, style }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    inset: {
      borderRadius: 10,
      shadowColor: colors.highlight,
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.7,
      shadowRadius: 4,
      elevation: 5,
    },
    container: {
      borderRadius: 10,
      shadowColor: colors.shadow,
      shadowOffset: { width: -4, height: -4 },
      shadowOpacity: 0.75,
      shadowRadius: 4,
      elevation: 5,
      backgroundColor: colors.surface,
    },
  });

  return (
    <View style={styles.inset}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
};

const MandatoryTag = () => {
  const { colors, typography } = useTheme();
  const styles = StyleSheet.create({
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 4,
      backgroundColor: '#FBBF24', // A gold-like color
      marginLeft: 8,
    },
    tagText: {
      ...typography.fonts.caption,
      color: '#111827',
      textTransform: 'uppercase',
      marginLeft: 4,
    },
  });

  return (
    <View style={styles.tag}>
      <Feather name="shield" size={10} color={'#111827'} />
      <Text style={styles.tagText}>Mandatory</Text>
    </View>
  );
};

export const ChecklistRow = forwardRef<TextInput, ChecklistRowProps>(
  (
    {
      text,
      checked,
      onToggle,
      onChangeText,
      onDelete,
      isActive = false,
      onFocus,
      onBlur,
      isMandatory = false,
      allowMandatoryEdit = false,
      isToggleDisabled = false,
    },
    ref
  ) => {
    const { colors, typography } = useTheme();

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 16, // Indent row to align with headers
      },
      checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
      },
      checkedBox: {
        backgroundColor: colors.primary,
      },
      staticIconContainer: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
      },
      inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      input: {
        ...typography.fonts.body,
        color: colors.text,
        textDecorationLine: checked ? 'line-through' : 'none',
        padding: 10,
      },
      deleteButton: {
        marginLeft: 16,
      },
    });

    const inputContent = (
      <View style={styles.inputContainer}>
        <TextInput
          ref={ref}
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
          editable={!checked && (!isMandatory || allowMandatoryEdit)}
          onFocus={onFocus}
          onBlur={onBlur}
          autoFocus={isActive}
        />
        {isMandatory && <MandatoryTag />}
      </View>
    );

    return (
      <View style={styles.container}>
        {isToggleDisabled ? (
          <View style={styles.staticIconContainer}>
            <FontAwesome5 name="suitcase" size={16} color={colors.textSecondary} />
          </View>
        ) : (
          <TouchableOpacity
            onPress={onToggle}
            style={[styles.checkbox, checked && styles.checkedBox]}
          >
            {checked && (
              <FontAwesome name="check" size={12} color={colors.background} />
            )}
          </TouchableOpacity>
        )}
        <View style={{ flex: 1 }}>
          {isActive ? (
            <InsetNeumorphicWrapper>{inputContent}</InsetNeumorphicWrapper>
          ) : (
            inputContent
          )}
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    );
  }
);
