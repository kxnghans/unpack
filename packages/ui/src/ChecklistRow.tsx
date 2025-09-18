/**
 * This file defines the ChecklistRow component, which is a single row in a checklist.
 * It includes a checkbox, a text input, and a delete button, with support for mandatory items.
 */
import React, { forwardRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from './ThemeProvider';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

/**
 * The props for the ChecklistRow component.
 */
export interface ChecklistRowProps {
  /**
   * The text of the checklist item.
   */
  text: string;
  /**
   * Whether the item is checked.
   */
  checked: boolean;
  /**
   * A function to call when the checked state is toggled.
   */
  onToggle: () => void;
  /**
   * A function to call when the text is changed.
   */
  onChangeText: (text: string) => void;
  /**
   * A function to call when the item is deleted.
   */
  onDelete: () => void;
  /**
   * Whether the item is currently active (e.g., being edited).
   */
  isActive?: boolean;
  /**
   * A function to call when the item is focused.
   */
  onFocus: () => void;
  /**
   * A function to call when the item is blurred.
   */
  onBlur: () => void;
  /**
   * Whether the item is mandatory.
   */
  isMandatory?: boolean;
  /**
   * Whether the mandatory item can be edited.
   */
  allowMandatoryEdit?: boolean;
  /**
   * Whether the toggle is disabled.
   */
  isToggleDisabled?: boolean;
}

/**
 * A wrapper component that creates an inset neumorphic effect.
 * This is used to give the active text input a "pressed in" look.
 */
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
      backgroundColor: colors.background,
    },
  });

  return (
    <View style={styles.inset}>
      <View style={[styles.container, style]}>{children}</View>
    </View>
  );
};

/**
 * A tag to indicate that a checklist item is mandatory.
 * It's a small, styled component with a shield icon.
 */
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

/**
 * A component that represents a single row in a checklist.
 * It's a forwardRef component to allow the parent to focus the TextInput.
 */
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
        {/* The checkbox or a static icon if the toggle is disabled. */}
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
        {/* The main content of the row, including the text input. */}
        <View style={{ flex: 1 }}>
          {/* The input is wrapped in a neumorphic wrapper when it's active. */}
          {isActive ? (
            <InsetNeumorphicWrapper>{inputContent}</InsetNeumorphicWrapper>
          ) : (
            inputContent
          )}
        </View>
        {/* The delete button on the right side of the row. */}
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    );
  }
);
