import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

// --- Components ---

const Checkbox = ({ label, isChecked, onToggle }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
      {isChecked && <Text style={styles.checkmark}>✓</Text>}
    </View>
    <Text style={styles.checkboxLabel}>{label}</Text>
  </TouchableOpacity>
);

const FilterMenu = ({ title, children, onClose }) => (
  <View style={styles.filterMenu}>
    <View style={styles.filterMenuHeader}>
      <Text style={styles.filterMenuTitle}>{title}</Text>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.filterMenuClose}>✕</Text>
      </TouchableOpacity>
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
  </View>
);

// --- Filter Implementations ---

const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia'];
const ContinentFilter = () => {
  const [selected, setSelected] = useState([]);

  const toggle = (continent) => {
    setSelected(prev => 
      prev.includes(continent) 
        ? prev.filter(c => c !== continent) 
        : [...prev, continent]
    );
  };

  return (
    <View>
      {continents.map(c => <Checkbox key={c} label={c} isChecked={selected.includes(c)} onToggle={() => toggle(c)} />)}
      <TouchableOpacity onPress={() => setSelected([])}>
        <Text style={styles.clearButton}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};

const tripTypes = ['Road Trip', 'Leisure / Vacation', 'Backpacking', 'Study Abroad', 'Business', 'Cruise', 'Adventure Travel'];
const TripTypeFilter = () => {
  const [selected, setSelected] = useState([]);

  const toggle = (type) => {
    setSelected(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  return (
    <View>
      {tripTypes.map(t => <Checkbox key={t} label={t} isChecked={selected.includes(t)} onToggle={() => toggle(t)} />)}
    </View>
  );
};

const DurationFilter = () => (
  <View>
    <Text style={styles.filterMenuItem}>Slider coming soon</Text>
  </View>
);

const BudgetFilter = () => (
  <View>
    <Text style={styles.filterMenuItem}>$ (Budget)</Text>
    <Text style={styles.filterMenuItem}>$ (Mid-range)</Text>
    <Text style={styles.filterMenuItem}>$ (Luxury)</Text>
  </View>
);

const TravelStyleFilter = () => (
  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
    <Text style={styles.tag}>Foodie 🍽️</Text>
    <Text style={styles.tag}>Hiking ⛰️</Text>
    <Text style={styles.tag}>Museums 🏛️</Text>
  </View>
);

const GroupTypeFilter = () => (
  <View>
    <Text style={styles.filterMenuItem}>Solo Traveler</Text>
    <Text style={styles.filterMenuItem}>Couple</Text>
    <Text style={styles.filterMenuItem}>Family with Kids</Text>
  </View>
);

// --- Main Screen ---

const CommunityScreen = () => {
  const [activeTab, setActiveTab] = useState('Search');
  const [visibleMenu, setVisibleMenu] = useState(null);

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

  const renderFilterMenu = () => {
    if (!visibleMenu) return null;

    const filters = {
      continent: { title: 'Continent', content: <ContinentFilter /> },
      tripType: { title: 'Trip Type', content: <TripTypeFilter /> },
      duration: { title: 'Duration', content: <DurationFilter /> },
      budget: { title: 'Budget', content: <BudgetFilter /> },
      travelStyle: { title: 'Travel Style', content: <TravelStyleFilter /> },
      groupType: { title: 'Group Type', content: <GroupTypeFilter /> },
    };

    const { title, content } = filters[visibleMenu];

    return (
      <Modal
        transparent={true}
        visible={!!visibleMenu}
        animationType="fade"
        onRequestClose={() => setVisibleMenu(null)}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPressOut={() => setVisibleMenu(null)}>
          <View style={styles.menuContainer}>
            <FilterMenu title={title} onClose={() => setVisibleMenu(null)}>
              {content}
            </FilterMenu>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://picsum.photos/seed/hero/800/400' }}
        style={styles.headerImage}
      >
        <View style={styles.overlay}>
          <View style={styles.tabs}>
            <TouchableOpacity onPress={() => setActiveTab('Trending')} style={[styles.tab, activeTab === 'Trending' && styles.activeTab]}>
              <Text style={[styles.tabText, activeTab === 'Trending' && styles.activeTabText]}>Trending</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('Search')} style={[styles.tab, activeTab === 'Search' && styles.activeTab]}>
              <Text style={[styles.tabText, activeTab === 'Search' && styles.activeTabText]}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.mainContent}>
        <View style={styles.filterSidebar}>
          <TouchableOpacity style={styles.filterIcon} onPress={() => setVisibleMenu('continent')}><Text style={styles.iconText}>🌍</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon} onPress={() => setVisibleMenu('tripType')}><Text style={styles.iconText}>💼</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon} onPress={() => setVisibleMenu('duration')}><Text style={styles.iconText}>📅</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon} onPress={() => setVisibleMenu('budget')}><Text style={styles.iconText}>🏷️</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon} onPress={() => setVisibleMenu('travelStyle')}><Text style={styles.iconText}>⭐</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterIcon} onPress={() => setVisibleMenu('groupType')}><Text style={styles.iconText}>👥</Text></TouchableOpacity>
        </View>

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
      </View>
      {renderFilterMenu()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F8' },
  headerImage: { height: 200, justifyContent: 'flex-end' },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.4)', flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  tabs: { flexDirection: 'row', marginBottom: 16 },
  tab: { paddingHorizontal: 20, paddingVertical: 10 },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#FFFFFF' },
  tabText: { color: '#FFFFFF', fontSize: 16, opacity: 0.8 },
  activeTabText: { fontWeight: 'bold', opacity: 1 },
  mainContent: { flex: 1, flexDirection: 'row' },
  filterSidebar: { width: 60, backgroundColor: '#FFFFFF', paddingTop: 20, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#EAECEE' },
  filterIcon: { marginBottom: 25 },
  iconText: { fontSize: 24 },
  contentFeed: { flex: 1, padding: 10 },
  card: { marginBottom: 20, borderRadius: 12, backgroundColor: '#FFFFFF', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
  cardImage: { width: '100%', height: 150, borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  cardInfo: { padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTextContainer: { flex: 1, marginRight: 10 },
  cardTitle: { fontSize: 17, fontWeight: '600', marginBottom: 4, color: '#1C2833' },
  cardBody: { fontSize: 14, color: '#566573' },
  authorContainer: { flexDirection: 'row', alignItems: 'center' },
  cardAuthorName: { fontSize: 12, color: '#566573', marginRight: 8 },
  authorImage: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#EAECEE' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  menuContainer: { position: 'absolute', left: 65, top: 210, bottom: 10, right: 100 },
  filterMenu: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 20, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  filterMenuHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  filterMenuTitle: { fontSize: 20, fontWeight: 'bold', color: '#1C2833' },
  filterMenuClose: { fontSize: 20, color: '#AAB7B8' },
  filterMenuItem: { paddingVertical: 12, fontSize: 16, color: '#566573' },
  clearButton: { color: '#E74C3C', marginTop: 15, fontWeight: '500', fontSize: 15 },
  tag: { backgroundColor: '#EAECEE', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16, margin: 4, color: '#566573' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#BDC3C7', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  checkboxChecked: { backgroundColor: '#3498DB', borderColor: '#3498DB' },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 16, color: '#2C3E50' },
});

export default CommunityScreen;