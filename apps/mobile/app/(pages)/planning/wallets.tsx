
import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { HUBS } from '../../../lib/mock-data';
import { useTheme } from '@ui';

export default function WalletsScreen() {
  const { colors, typography } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={HUBS.wallets}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.card }}>
            <Text style={{ fontSize: typography.sizes.m, color: colors.text }}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
