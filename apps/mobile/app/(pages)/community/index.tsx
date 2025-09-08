import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '@ui/ThemeProvider';
import { FontAwesome } from '@expo/vector-icons';
import FilterDrawer from '../../../components/FilterDrawer';
import { FilterDialog } from '@ui';

// --- Data --- 
const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia'];
const tripTypes = ['Road Trip', 'Leisure / Vacation', 'Backpacking', 'Study Abroad', 'Business', 'Cruise', 'Adventure Travel'];
const durations = ['1-3 Days', '4-7 Days', '1-2 Weeks', '2+ Weeks'];
const budgets = ['Budget (, 'Mid-range ($)', 'Luxury ($$)'];
const travelStyles = ['Foodie', 'Hiking', 'Museums', 'Nightlife', 'Relaxing', 'Adventure'];
const groupTypes = ['Solo', 'Couple', 'Family', 'Friends'];

const CommunityScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeFilterId, setActiveFilterId] = useState(null);
  const { colors, typography } = useTheme();

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
      backgroundColor: '#FFFFFF',
      padding: 24, // Set global padding
    },
    mainTitle: {
      color: colors.text,
      ...typography.fonts.pageHeader,
      marginBottom: 20,
    },
    filterAndTabsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    filterIconContainer: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.primary + '10',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterIconActive: {
      backgroundColor: colors.primary,
    },
    tabContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    tabButton: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: colors.primary,
      marginRight: 10,
    },
    tabText: {
      color: colors.background,
      ...typography.fonts.title, // Standardized
    },
    mainContent: {
      flex: 1,
      position: 'relative', // Needed for overlay
    },
    contentFeed: {
      flex: 1,
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
      ...typography.fonts.title, // Standardized
      color: '#1C2833',
      marginBottom: 4,
    },
    cardBody: {
      ...typography.fonts.description, // Standardized
      color: '#566573',
    },
    authorContainer: { flexDirection: 'row', alignItems: 'center' },
    cardAuthorName: {
      ...typography.fonts.subtitle, // Standardized
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
    },
    {
      id: '2',
      title: 'Tokyo on a Budget',
      body: 'Explore the vibrant streets of Tokyo without breaking the bank.',
      author: 'JapanExplorer',
      image: 'https://picsum.photos/seed/picsum2/400/300',
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

  return (
    <View style={styles.container}>
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
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainContent}>
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
                  <Image source={{ uri: 'https://picsum.photos/seed/avatar/40/40' }} style={styles.authorImage} />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {drawerVisible && (
          <FilterDrawer
            filters={filters}
            onFilterPress={handleFilterPress}
          />
        )}
      </View>

      {renderFilterDialog()}
    </View>
  );
};

export default CommunityScreen;