import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  HubCard,
  UpcomingCard,
  useTheme,
} from '@ui';
import { HUBS, UPCOMING_ITEMS } from '../../../lib/mock-data';
import { FontAwesome5 } from '@expo/vector-icons';

const iconMap = {
  flight: 'plane',
  hotel: 'hotel',
  itinerary: 'map-signs',
  savings: 'piggy-bank',
  playlist: 'music',
  packing: 'suitcase',
};

export default function PlanningScreen() {
  const { colors, typography } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      padding: 24,
    },
    mainTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: typography.sizes.l,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    hubsContainer: {
      marginBottom: 24,
    },
  });

  const renderUpcomingItem = ({ item }) => (
    <UpcomingCard
      color={item.color}
      icon={<FontAwesome5 name={iconMap[item.type]} size={24} color="white" />}
      title={item.title}
      body={item.body}
    />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.mainTitle}>Planning</Text>

      <View style={styles.hubsContainer}>
        <FlatList
          data={HUBS}
          renderItem={({ item }) => (
            <HubCard
              icon={<FontAwesome5 name={item.icon} size={48} color="#1A1A1A" />}
              title={item.title}
              items={item.items}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={styles.sectionTitle}>Upcoming</Text>
      <FlatList
        data={UPCOMING_ITEMS}
        renderItem={renderUpcomingItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </ScrollView>
  );
}
