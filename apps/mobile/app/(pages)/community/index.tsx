import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useTheme } from '@ui/ThemeProvider';
import { FontAwesome, Feather } from '@expo/vector-icons';
import FilterDrawer from '../../../components/FilterDrawer';
import { FilterDialog } from '@ui';

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
const budgets = ['Budget ($)', 'Mid-range ($$)', 'Luxury ($$$)'];
const travelStyles = ['Foodie', 'Hiking', 'Museums', 'Nightlife', 'Relaxing', 'Adventure'];
const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];

const CommunityScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [activeTab, setActiveTab] = useState('Trending');
  const { colors, typography } = useTheme();

  // --- State for each filter ---
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [selectedTripTypes, setSelectedTripTypes] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [selectedBudgets, setSelectedBudgets] = useState([]);
  const [selectedTravelStyles, setSelectedTravelStyles] = useState([]);
  const [selectedGroupTypes, setSelectedGroupTypes] = useState([]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [activeTab]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
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
      width: 44,
      height: 44,
      borderRadius: 22,
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
      flexDirection: 'row',
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16, // Increased padding
      borderRadius: 20,
    },
    activeTab: {
      flex: 1, // Active tab expands
      backgroundColor: colors.primary,
    },
    inactiveTab: {
      backgroundColor: colors.primary + '10',
    },
    tabText: {
      ...typography.fonts.title,
      marginLeft: 8,
    },
    activeTabText: {
      color: colors.background,
    },
    inactiveTabText: {
      color: colors.text,
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
      marginBottom: 20,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    },
    cardImage: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    cardInfo: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardTextContainer: { flex: 1, marginRight: 10 },
    cardTitle: {
      ...typography.fonts.title,
      color: '#1C2833',
      marginBottom: 4,
    },
    cardBody: {
      ...typography.fonts.description,
      color: '#566573',
    },
    authorContainer: { flexDirection: 'row', alignItems: 'center' },
    cardAuthorName: {
      ...typography.fonts.subtitle,
      color: '#566573',
      marginRight: 8,
    },
    authorImage: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: '#EAECEE',
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

  const guides = [
    {
      id: '1',
      title: 'A Weekend in the Alps',
      body: 'Discover the breathtaking beauty of the Swiss Alps in just 3 days.',
      author: 'AdventurerKate',
      image: 'https://picsum.photos/seed/picsum/400/300',
      authorImage: 'https://randomuser.me/api/portraits/thumb/women/47.jpg',
    },
    {
      id: '2',
      title: 'Tokyo on a Budget',
      body: 'Explore the vibrant streets of Tokyo without breaking the bank.',
      author: 'JapanExplorer',
      image: 'https://picsum.photos/seed/picsum2/400/300',
      authorImage: 'https://randomuser.me/api/portraits/thumb/men/32.jpg',
    },
  ];

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
      case 'tripType':
        return {
          title: 'Trip Type',
          options: tripTypes,
          selectedOptions: selectedTripTypes,
          onSelectionChange: (option) => {
            setSelectedTripTypes(prev => 
              prev.includes(option) 
                ? prev.filter(item => item !== option)
                : [...prev, option]
            );
          },
          onClearAll: () => setSelectedTripTypes([]),
          onSelectAll: () => setSelectedTripTypes(tripTypes),
        };
      case 'duration':
        return {
          title: 'Duration',
          options: durations,
          selectedOptions: selectedDurations,
          onSelectionChange: (option) => {
            setSelectedDurations(prev => 
              prev.includes(option) 
                ? prev.filter(item => item !== option)
                : [...prev, option]
            );
          },
          onClearAll: () => setSelectedDurations([]),
          onSelectAll: () => setSelectedDurations(durations),
        };
      case 'budget':
        return {
          title: 'Budget',
          options: budgets,
          selectedOptions: selectedBudgets,
          onSelectionChange: (option) => {
            setSelectedBudgets(prev => 
              prev.includes(option) 
                ? prev.filter(item => item !== option)
                : [...prev, option]
            );
          },
          onClearAll: () => setSelectedBudgets([]),
          onSelectAll: () => setSelectedBudgets(budgets),
        };
      case 'travelStyle':
        return {
          title: 'Travel Style',
          options: travelStyles,
          selectedOptions: selectedTravelStyles,
          onSelectionChange: (option) => {
            setSelectedTravelStyles(prev => 
              prev.includes(option) 
                ? prev.filter(item => item !== option)
                : [...prev, option]
            );
          },
          onClearAll: () => setSelectedTravelStyles([]),
          onSelectAll: () => setSelectedTravelStyles(travelStyles),
        };
      case 'groupType':
        return {
          title: 'Group Type',
          options: groupTypes,
          selectedOptions: selectedGroupTypes,
          onSelectionChange: (option) => {
            setSelectedGroupTypes(prev => 
              prev.includes(option) 
                ? prev.filter(item => item !== option)
                : [...prev, option]
            );
          },
          onClearAll: () => setSelectedGroupTypes([]),
          onSelectAll: () => setSelectedGroupTypes(groupTypes),
        };
      default:
        return null;
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

  const AnimatedTab = ({ title, iconName, isActive, onPress, style }) => {
    const tabStyle = isActive ? styles.activeTab : styles.inactiveTab;
    const textColor = isActive ? styles.activeTabText : styles.inactiveTabText;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.tab, tabStyle, style]}>
        <Feather name={iconName} size={16} color={textColor.color} />
        <Text style={[styles.tabText, textColor]}>{title}</Text>
      </TouchableOpacity>
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
            <AnimatedTab 
              title="Trending" 
              iconName="trending-up" 
              isActive={activeTab === 'Trending'} 
              onPress={() => setActiveTab('Trending')} 
              style={{ marginRight: 8 }}
            />
            <AnimatedTab 
              title="Search" 
              iconName="search" 
              isActive={activeTab === 'Search'} 
              onPress={() => setActiveTab('Search')} 
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
            <View key={guide.id} style={styles.card}>
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
            </View>
          ))}
        </ScrollView>
      </View>

      {renderFilterDialog()}
    </View>
  );
};

export default CommunityScreen;