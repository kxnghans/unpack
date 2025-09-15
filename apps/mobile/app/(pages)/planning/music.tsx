import React from 'react';
import { View, Text, StyleSheet, FlatList, Linking } from 'react-native';
import { UpcomingCard, useTheme, Divider } from '@ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { MUSIC_DATA } from '../../../lib/mock-data';

const iconMap = {
  playlist: 'music',
};

export default function MusicScreen() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContentContainer: {
      paddingHorizontal: 24,
      paddingTop: 24, // Add padding to the top of the list
    },
  });

  const renderMusicItem = ({ item }) => (
    <UpcomingCard
      imageUrl={item.imageUrl}
      icon={<FontAwesome5 name={iconMap[item.type]} size={24} color={colors.textOnOverlay} />}
      title={item.title}
      body={item.body}
      onPress={() => item.url && Linking.openURL(item.url)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MUSIC_DATA}
        renderItem={renderMusicItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}
