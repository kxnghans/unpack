import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import {
  HubCard,
  UpcomingCard,
  useTheme,
  Divider,
  CardGrid,
} from '@ui';
import { formatCurrency } from '@utils';
import { HUBS, UPCOMING_ITEMS } from '../../../lib/mock-data';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

/**
 * A mapping from item types to their corresponding FontAwesome5 icon names.
 * This allows for dynamically displaying icons based on the type of item.
 */
const iconMap = {
  flight: 'plane',
  hotel: 'hotel',
  itinerary: 'map-signs',
  savings: 'piggy-bank',
  playlist: 'music',
  packing: 'suitcase',
};

/**
 * The main screen for the planning section of the app.
 * It displays a collection of "hubs" for different planning categories
 * and a list of upcoming items or events.
 */
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

  /**
   * Renders a single item for the "Upcoming" section.
   * It formats the item's body based on its type (e.g., for savings, it shows progress).
   * @param {object} props - The properties for the component.
   * @param {object} props.item - The upcoming item data to render.
   * @returns {JSX.Element} A card representing the upcoming item.
   */
  const renderUpcomingItem = ({ item }) => {
    let body = item.body;
    // For 'savings' items, format the body to show current vs. total amount.
    if (item.type === 'savings') {
      body = `${formatCurrency(item.currentAmount)} / ${formatCurrency(item.totalAmount)}`;
    }
    return (
      <UpcomingCard
        imageUrl={item.imageUrl}
        icon={<FontAwesome5 name={iconMap[item.type]} size={24} color={colors.textOnOverlay} />}
        title={item.title}
        body={body}
        onPress={() => item.url && Linking.openURL(item.url)}
      />
    );
  };

  /**
   * Renders the header for the main list. This includes the "Hubs" section,
   * which is a horizontally scrolling list of navigation cards.
   * @returns {JSX.Element} The header component.
   */
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
              onPress={() => {
                // Navigate to the corresponding screen when a hub is pressed.
                if (hub.title === 'Wallets') {
                  router.push('/planning/wallets');
                }
                if (hub.title === 'Documents') {
                  router.push('/planning/documents');
                }
                if (hub.title === 'Music') {
                  router.push('/planning/music');
                }
                if (hub.title === 'Packing') {
                  router.push('/planning/packing-lists');
                }
                if (hub.title === 'Savings') {
                  router.push('/planning/savings');
                }
              }}
            />
          ))}
        </ScrollView>
      </View>
      <Divider />
      <Text style={styles.sectionTitle}>Upcoming</Text>
    </View>
  );

  // The main render method for the PlanningScreen.
  return (
    <View style={styles.container}>
      {/* Screen Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Planning</Text>
        <Divider />
      </View>
      {/* Main content grid, displaying upcoming items with the hubs section as a header. */}
      <CardGrid
        data={UPCOMING_ITEMS}
        renderItem={renderUpcomingItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
}