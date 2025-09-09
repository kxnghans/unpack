import { View, Text, StyleSheet, TextInput, FlatList, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@ui';
import { WALLET_CARDS } from '../../../lib/mock-data';
import { FontAwesome5 } from '@expo/vector-icons';

const InsetNeumorphicInput = ({ children }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    topShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: -2,
        height: -2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    bottomShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 8,
      backgroundColor: colors.surface,
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topShadow}>
        <View style={styles.bottomShadow}>
          <View style={styles.inputContainer}>{children}</View>
        </View>
      </View>
    </View>
  );
};

const NeumorphicButton = ({ title, onPress }) => {
  const { colors, typography } = useTheme();
  const styles = StyleSheet.create({
    button: {
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    text: {
      ...typography.fonts.title,
      color: colors.textOnPrimary,
    },
    lightShadow: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 4,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      borderRadius: 8,
    },
    darkShadow: {
      shadowColor: colors.highlight,
      shadowOffset: {
        width: -4,
        height: -4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      borderRadius: 8,
    },
  });

  return (
    <Pressable onPress={onPress}>
      <View style={styles.darkShadow}>
        <View style={styles.lightShadow}>
          <View style={styles.button}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default function AddCardScreen() {
  const { colors, typography } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [annualValue, setAnnualValue] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const filteredCards = WALLET_CARDS.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    textInput: {
      flex: 1,
      color: colors.text,
      ...typography.fonts.body,
      marginLeft: 8,
    },
    dropdown: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      marginTop: 4,
      maxHeight: 200,
    },
    listItem: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dropdownItemText: {
      ...typography.fonts.body,
      color: colors.text,
    },
    formElement: {
      marginBottom: 24,
    },
  });

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    setSearchTerm(card.name);
    setDropdownVisible(false);
  };

  const handleSubmit = () => {
    console.log('Selected Card:', selectedCard);
    console.log('Annual Value:', annualValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formElement}>
        <Text style={styles.label}>Select a Card</Text>
        <InsetNeumorphicInput>
          <TextInput
            style={styles.textInput}
            placeholder="Search for a card..."
            placeholderTextColor={colors.textSecondary}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
              setSelectedCard(null);
              setDropdownVisible(true);
            }}
            onFocus={() => setDropdownVisible(true)}
          />
          <Pressable onPress={() => setDropdownVisible(!isDropdownVisible)}>
            <FontAwesome5 name="chevron-down" size={16} color={colors.textSecondary} />
          </Pressable>
        </InsetNeumorphicInput>
        {isDropdownVisible && filteredCards.length > 0 && !selectedCard && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredCards}
              renderItem={({ item }) => (
                <Pressable style={styles.listItem} onPress={() => handleSelectCard(item)}>
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>

      <View style={styles.formElement}>
        <Text style={styles.label}>Past Annual Redemption Value</Text>
        <InsetNeumorphicInput>
          <Text style={{ color: colors.textSecondary, ...typography.fonts.body }}>$</Text>
          <TextInput
            style={styles.textInput}
            placeholder="0.00"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={annualValue}
            onChangeText={setAnnualValue}
          />
        </InsetNeumorphicInput>
      </View>

      <NeumorphicButton title="Submit" onPress={handleSubmit} />
    </View>
  );
}
