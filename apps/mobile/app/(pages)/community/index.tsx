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

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- Data --- 
const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia'];
const tripTypes = ['Road Trip', 'Leisure / Vacation', 'Backpacking', 'Study Abroad', 'Business', 'Cruise', 'Adventure Travel'];
const durations = ['1-3 Days', '4-7 Days', '1-2 Weeks', '2+ Weeks'];
const budgets = ['Budget ($)', 'Mid-range ($)', 'Luxury ($)'];
const travelStyles = ['Foodie', 'Hiking', 'Museums', 'Nightlife', 'Relaxing', 'Adventure'];
const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];

const COMMUNITY_TABS = [
  { key: 'Trending', title: 'Trending', iconName: 'trending-up' },
  { key: 'Search', title: 'Search', iconName: 'search' },
];

const CommunityScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeTab, setActiveTab] = useState('Trending');
  const { colors, typography } = useTheme();

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

  // --- State for each filter ---
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
      paddingHorizontal: 24,
    },
    card: {
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
      width: '100%',
      aspectRatio: 10 / 4,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    cardInfo: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTextContainer: { flex: 1, marginRight: 10 },
    cardTitle: {
      ...typography.fonts.title,
      color: colors.text,
      marginBottom: 4,
    },
    cardBody: {
            ...typography.fonts.body,
      color: colors.textSecondary,
    },
    authorContainer: { flexDirection: 'row', alignItems: 'center' },
    cardAuthorName: {
      ...typography.fonts.subtitle,
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

  const handleHeartPress = (guideId) => {
    setGuides((prevGuides) =>
      prevGuides.map((guide) =>
        guide.id === guideId ? { ...guide, liked: !guide.liked } : guide
      )
    );
  };

  const handleFilterPress = (filterId) => {
    setActiveFilterId(filterId);
  };

  const handleCloseDialog = () => {
    setActiveFilterId(null);
  };

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
      // ... other cases
    }
  };

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
      <View style={styles.headerContent}>
        <Text style={styles.mainTitle}>Community</Text>
        <View style={styles.filterAndTabsContainer}>
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

          <View style={styles.tabContainer}>
            <SegmentedControl
              tabs={COMMUNITY_TABS}
              activeTabKey={activeTab}
              onTabPress={setActiveTab}
            />
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {drawerVisible && (
          <FilterDrawer
            filters={filters}
            onFilterPress={handleFilterPress}
          />
        )}
        <ScrollView style={styles.contentFeed}>
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

      {renderFilterDialog()}
    </View>
  );
};

export default CommunityScreen;