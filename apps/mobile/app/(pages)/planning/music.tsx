/**
 * This file defines the MusicScreen, which displays a grid of music items,
 * such as playlists.
 */
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { UpcomingCard, useTheme, CardGrid } from '@ui';
import { FontAwesome5 } from '@expo/vector-icons';
import { MUSIC_DATA } from '../../../lib/mock-data';

/**
 * A map of music item types to their corresponding FontAwesome5 icon names.
 */
const iconMap = {
  playlist: 'music',
};

/**
 * The music screen, displaying a grid of music items.
 */
export default function MusicScreen() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });

  /**
   * Renders a single music item as a card.
   * @param {object} item - The music item to render.
   */
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
      {/* The CardGrid component is used to display the music items in a grid format. */}
      <CardGrid
        data={MUSIC_DATA}
        renderItem={renderMusicItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
