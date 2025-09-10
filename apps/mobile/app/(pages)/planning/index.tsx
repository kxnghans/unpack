import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import {
  HubCard,
  UpcomingCard,
  useTheme,
  Divider,
} from '@ui';
import { HUBS, UPCOMING_ITEMS } from '../../../lib/mock-data';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    listContentContainer: {
      paddingHorizontal: 24,
    },
    mainTitle: {
      color: colors.text,
      marginBottom: 16,
      ...typography.fonts.pageHeader,
    },
    sectionTitle: {
      color: colors.text,
      marginBottom: 16,
      ...typography.fonts.sectionHeader,
    },
    hubsContainer: {
      marginBottom: 0,
      paddingVertical: 16,
    },
  });

  const renderUpcomingItem = ({ item }) => (
    <UpcomingCard
      imageUrl={item.imageUrl}
      icon={<FontAwesome5 name={iconMap[item.type]} size={24} color={colors.textOnOverlay} />}
      title={item.title}
      body={item.body}
      onPress={() => item.url && Linking.openURL(item.url)}
    />
  );

  const ListHeader = () => (
    <View>
      <Text style={styles.sectionTitle}>Hubs</Text>
      <View style={styles.hubsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {HUBS.map((hub) => (
            <HubCard
              key={hub.id}
              icon={<FontAwesome5 name={hub.icon} size={48} color={colors.text} />}
              title={hub.title}
              items={hub.items}
              onPress={() =>
                hub.title === 'Wallets' && router.push('/planning/wallets')
              }
            />
          ))}
        </ScrollView>
      </View>
      <Divider />
      <Text style={styles.sectionTitle}>Upcoming</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Planning</Text>
        <Divider />
      </View>
      <FlatList
        data={UPCOMING_ITEMS}
        renderItem={renderUpcomingItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
}
