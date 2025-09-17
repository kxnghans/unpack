/**
 * This file defines the CommunityScreen, which is the main screen for the
 * community tab. It displays a list of travel guides and allows users to
 * filter and search for guides.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  UIManager,
} from 'react-native';
import { useTheme, SegmentedControl, FilterDialog, HeartIcon } from '@ui';
import { FontAwesome } from '@expo/vector-icons';
import FilterDrawer from '../../../components/FilterDrawer';

// Enable layout animations on Android for a smoother user experience.
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Mock Data ---
// In a real application, this data would likely come from an API.

// Filter options for the community screen.
const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia'];
const tripTypes = ['Road Trip', 'Leisure / Vacation', 'Backpacking', 'Study Abroad', 'Business', 'Cruise', 'Adventure Travel'];
const durations = ['1-3 Days', '4-7 Days', '1-2 Weeks', '2+ Weeks'];
const budgets = ['Budget ($)', 'Mid-range ($)', 'Luxury ($)'];
const travelStyles = ['Foodie', 'Hiking', 'Museums', 'Nightlife', 'Relaxing', 'Adventure'];
const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];

// Tabs for the main segmented control on the community screen.
const COMMUNITY_TABS = [
  { key: 'Trending', title: 'Trending', iconName: 'trending-up' },
  { key: 'Search', title: 'Search', iconName: 'search' },
];

/**
 * The main community screen, displaying trending guides and allowing filtering.
 */
const CommunityScreen = () => {
  // State for the visibility of the filter drawer.
  const [drawerVisible, setDrawerVisible] = useState(true);
  // State for the currently active filter, which determines which filter dialog to show.
  const [activeFilterId, setActiveFilterId] = useState(null);
  // State for the currently active tab in the main segmented control.
  const [activeTab, setActiveTab] = useState('Trending');
  const { colors, typography } = useTheme();

  // State for the list of guides, including their liked status.
  const [guides, setGuides] = useState([
    {
      id: '1',
      title: 'A Weekend in the Alps',
      body: 'Discover the breathtaking beauty of the Swiss Alps in just 3 days.',
      author: 'AdventurerKate',
      image: 'https://picsum.photos/seed/picsum/400/300',
      authorImage: 'https://randomuser.me/api/portraits/thumb/women/47.jpg',
      liked: false,
    },
    {
      id: '2',
      title: 'Tokyo on a Budget',
      body: 'Explore the vibrant streets of Tokyo without breaking the bank.',
      author: 'JapanExplorer',
      image: 'https://picsum.photos/seed/picsum2/400/300',
      authorImage: 'https://randomuser.me/api/portraits/thumb/men/32.jpg',
      liked: false,
    },
  ]);

  // --- State for each filter category ---
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedTravelStyles, setSelectedTravelStyles] = useState([]);
  const [selectedGroupTypes, setSelectedGroupTypes] = useState([]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContent: {
      paddingHorizontal: 24,
      paddingTop: 24,
    },
    mainTitle: {
      color: colors.text,
      ...typography.fonts.pageHeader,
      marginBottom: 20,
    },
    filterAndTabsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    filterIconContainer: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: colors.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    filterIconActive: {
      backgroundColor: colors.primary,
    },
    tabContainer: {
      flex: 1,
    },
    mainContent: {
      flex: 1,
      flexDirection: 'row',
    },
    contentFeed: {
      flex: 1,
      paddingLeft: 40,
    },
    card: {
      aspectRatio: 3 / 2,
      marginVertical: 15,
      borderRadius: 12,
      backgroundColor: colors.card,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    cardImage: {
      flex: 0.8,
      width: '100%',
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    cardInfo: {
      flex: 0.2,
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTextContainer: { flex: 1, marginRight: 10 },
    cardTitle: {
      ...typography.fonts.subtitle,
      color: colors.text,
      marginBottom: 4,
    },
    cardBody: {
            ...typography.fonts.caption,
      color: colors.textSecondary,
    },
    authorContainer: { flexDirection: 'row', alignItems: 'center' },
    cardAuthorName: {
      ...typography.fonts.body,
      color: colors.textSecondary,
      marginRight: 8,
    },
    authorImage: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: colors.background,
    },
    heartIcon: {
      position: 'absolute',
      top: -10,
      right: -10,
    },
  });

  const filters = [
    { id: 'continent', title: 'Continent', icon: 'globe' },
    { id: 'tripType', title: 'Trip Type', icon: 'briefcase' },
    { id: 'duration', title: 'Duration', icon: 'calendar' },
    { id: 'budget', title: 'Budget', icon: 'tag' },
    { id: 'travelStyle', title: 'Travel Style', icon: 'star' },
    { id: 'groupType', title: 'Group Type', icon: 'users' },
  ];

  /**
   * Toggles the liked state of a guide.
   * @param {string} guideId - The ID of the guide to like/unlike.
   */
  const handleHeartPress = (guideId) => {
    setGuides((prevGuides) =>
      prevGuides.map((guide) =>
        guide.id === guideId ? { ...guide, liked: !guide.liked } : guide
      )
    );
  };

  /**
   * Sets the active filter ID to open the corresponding filter dialog.
   * @param {string} filterId - The ID of the filter to activate.
   */
  const handleFilterPress = (filterId) => {
    setActiveFilterId(filterId);
  };

  /**
   * Closes the currently open filter dialog by setting the active filter ID to null.
   */
  const handleCloseDialog = () => {
    setActiveFilterId(null);
  };

  /**
   * Returns the configuration for the active filter dialog based on the activeFilterId.
   * This includes the title, options, selected options, and selection handlers.
   * @returns {object | null} The filter configuration or null if no filter is active.
   */
  const getFilterConfig = () => {
    switch (activeFilterId) {
      case 'continent':
        return {
          title: 'Continent',
          options: continents,
          selectedOptions: selectedContinents,
          onSelectionChange: (option) => {
            setSelectedContinents(prev =>
              prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option]
            );
          },
          onClearAll: () => setSelectedContinents([]),
          onSelectAll: () => setSelectedContinents(continents),
        };
      // ... other cases for other filters would go here
    }
  };

  /**
   * Renders the appropriate filter dialog based on the active filter ID.
   * @returns {React.ReactElement | null} The filter dialog component or null if no filter is active.
   */
  const renderFilterDialog = () => {
    const config = getFilterConfig();
    if (!config) return null;

    return (
      <FilterDialog
        isVisible={!!activeFilterId}
        onClose={handleCloseDialog}
        {...config}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* The header of the screen, containing the title, filter button, and segmented control. */}
      <View style={styles.headerContent}>
        <Text style={styles.mainTitle}>Community</Text>
        <View style={styles.filterAndTabsContainer}>
          {/* The button to toggle the filter drawer. */}
          <TouchableOpacity
            style={[
              styles.filterIconContainer,
              drawerVisible && styles.filterIconActive,
            ]}
            onPress={() => setDrawerVisible(!drawerVisible)}
          >
            <FontAwesome
              name={drawerVisible ? 'chevron-left' : 'filter'}
              size={20}
              color={drawerVisible ? colors.background : colors.text}
            />
          </TouchableOpacity>

          {/* The main segmented control for switching between "Trending" and "Search". */}
          <View style={styles.tabContainer}>
            <SegmentedControl
              tabs={COMMUNITY_TABS}
              activeTabKey={activeTab}
              onTabPress={setActiveTab}
            />
          </View>
        </View>
      </View>

      {/* The main content of the screen, containing the filter drawer and the list of guides. */}
      <View style={styles.mainContent}>
        {/* The filter drawer, which is shown or hidden based on the drawerVisible state. */}
        {drawerVisible && (
          <FilterDrawer
            filters={filters}
            onFilterPress={handleFilterPress}
          />
        )}
        {/* The scrollable list of guides. */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.contentFeed}
        >
          {guides.map((guide) => (
            <View style={styles.card} key={guide.id}>
              <Image source={{ uri: guide.image }} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{guide.title}</Text>
                  <Text style={styles.cardBody} numberOfLines={1}>{guide.body}</Text>
                </View>
                <View style={styles.authorContainer}>
                  <Text style={styles.cardAuthorName}>{guide.author}</Text>
                  <Image source={{ uri: guide.authorImage }} style={styles.authorImage} />
                </View>
              </View>
              {/* The heart icon for liking a guide. */}
              <View style={styles.heartIcon}>
                <HeartIcon
                  isLiked={guide.liked}
                  onPress={() => handleHeartPress(guide.id)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* The filter dialog, which is rendered based on the active filter. */}
      {renderFilterDialog()}
    </View>
  );
};

export default CommunityScreen;