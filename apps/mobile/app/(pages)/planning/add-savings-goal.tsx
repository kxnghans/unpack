/**
 * This file defines the AddSavingsGoal screen, a form for adding a new savings
 * goal to the user's account.
 */
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTheme, InsetNeumorphicInput, NeumorphicButton, NeumorphicToggle } from '@ui';
import { useRouter } from 'expo-router';
import { addSavingsGoal } from '../../../lib/mock-data';
import { FontAwesome5 } from '@expo/vector-icons';

/**
 * The screen for adding a new savings goal.
 * This component renders a form with fields for the goal name, target amount,
 * and a toggle to mark the goal as completed.
 */
export default function AddSavingsGoal() {
  const { colors, typography } = useTheme();
  const router = useRouter();
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState({ goalName: false, targetAmount: false });

  /**
   * Handles the submission of the form.
   * Validates the form fields and, if valid, adds the new savings goal to the
   * mock data and navigates back to the previous screen.
   */
  const handleSubmit = () => {
    const newErrors = { goalName: !goalName, targetAmount: !targetAmount };
    if (newErrors.goalName || newErrors.targetAmount) {
      setErrors(newErrors);
      return;
    }

    const newGoal = {
      name: goalName,
      totalAmount: parseFloat(targetAmount),
      status: isCompleted ? 'Completed' : 'In Progress',
      currentAmount: isCompleted ? parseFloat(targetAmount) : 0,
    };
    addSavingsGoal(newGoal);
    router.back();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 24,
    },
    label: {
      ...typography.fonts.title,
      color: colors.text,
      marginBottom: 12,
    },
    formElement: {
      marginBottom: 24,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    errorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    errorText: {
      ...typography.fonts.body,
      color: colors.danger,
      marginLeft: 8,
    },
  });

  return (
    <View style={styles.container}>
      {/* The goal name input field. */}
      <View style={styles.formElement}>
        <Text style={styles.label}>Goal Name</Text>
        <InsetNeumorphicInput
          value={goalName}
          onChangeText={(text) => {
            setGoalName(text);
            setErrors({ ...errors, goalName: false });
          }}
          placeholder="e.g., Summer Vacation"
          showDollarSign={false}
          keyboardType="default"
        />
        {errors.goalName && (
          <View style={styles.errorContainer}>
            <FontAwesome5 name="exclamation-circle" size={16} color={colors.danger} />
            <Text style={styles.errorText}>Goal name is required.</Text>
          </View>
        )}
      </View>

      {/* The target amount input field. */}
      <View style={styles.formElement}>
        <Text style={styles.label}>Target Amount</Text>
        <InsetNeumorphicInput
          value={targetAmount}
          onChangeText={(text) => {
            setTargetAmount(text);
            setErrors({ ...errors, targetAmount: false });
          }}
          placeholder="0.00"
        />
        {errors.targetAmount && (
          <View style={styles.errorContainer}>
            <FontAwesome5 name="exclamation-circle" size={16} color={colors.danger} />
            <Text style={styles.errorText}>Target amount is required.</Text>
          </View>
        )}
      </View>

      {/* The completed status toggle. */}
      <View style={styles.formElement}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Mark as Completed</Text>
          <NeumorphicToggle
            value={isCompleted}
            onValueChange={setIsCompleted}
          />
        </View>
      </View>

      {/* The submit button. */}
      <NeumorphicButton 
        title="Add Goal" 
        onPress={handleSubmit} 
        style={{ backgroundColor: colors.primary }} 
        textStyle={{ color: colors.textOnPrimary }}
      />
    </View>
  );
}