import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AIAssistantWidget from '../../components/AIAssistantWidget'; // Adjust path as necessary

// TODO: Define types for Provider data that would be displayed
interface ProviderSummary {
  id: string;
  name: string;
  skills: string; // e.g., "Plumbing, Electrical"
  location?: string; // General location text
  rating?: number; // Average rating
}

// Placeholder data - replace with actual data fetching
const MOCK_PROVIDERS: ProviderSummary[] = [
  { id: '1', name: 'John Doe', skills: 'Plumbing, Heating', location: 'New York, NY', rating: 4.5 },
  { id: '2', name: 'Jane Smith', skills: 'Electrician, Home Repair', location: 'Brooklyn, NY', rating: 4.8 },
  { id: '3', name: 'Mike Lee', skills: 'Gardening, Landscaping', location: 'Queens, NY', rating: 4.2 },
  { id: '4', name: 'Sarah Brown', skills: 'Tutoring (Math, Science)', location: 'New York, NY', rating: 5.0 },
];

const CustomerHomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [filteredProviders, setFilteredProviders] = useState<ProviderSummary[]>(MOCK_PROVIDERS);

  // Effect for filtering providers when search or location query changes
  useEffect(() => {
    let results = MOCK_PROVIDERS;
    if (searchQuery) {
      results = results.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.skills.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (locationQuery) {
      // Basic location filtering (exact match for now, can be improved)
      results = results.filter(provider =>
        provider.location?.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }
    setFilteredProviders(results);
  }, [searchQuery, locationQuery]);

  const handleSearch = () => {
    // The useEffect hook already handles filtering,
    // this function can be used for explicit search actions if needed in future
    Alert.alert("Search Triggered", `Searching for "${searchQuery}" in location "${locationQuery}" (Currently using local mock data).`);
  };

  const handleLocationSearch = () => {
    // TODO: Integrate with Google Maps API or other location services here.
    // This would involve:
    // 1. Getting user's current location or allowing them to pick one.
    // 2. Using that location to filter providers based on their service areas.
    // 3. Requires a Google Maps API key and further setup.
    Alert.alert(
      "Location Search (Placeholder)",
      "Location-based search not fully implemented. Requires Google Maps API integration (API key needed)."
    );
  };

  const renderProviderItem = ({ item }: { item: ProviderSummary }) => (
    <TouchableOpacity
      style={styles.providerItem}
      onPress={() => navigation.navigate('ProviderDetail', { providerId: item.id })} // TODO: Ensure 'ProviderDetail' route name is correct
    >
      <Text style={styles.providerName}>{item.name}</Text>
      <Text style={styles.providerSkills}>{item.skills}</Text>
      {item.location && <Text style={styles.providerLocation}>Location: {item.location}</Text>}
      {item.rating && <Text style={styles.providerRating}>Rating: {item.rating} / 5</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[1]} // Make the AI widget sticky if desired, or remove ScrollView if not needed for stickiness
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Find Service Providers</Text>

        {/* AI Assistant Widget Integration */}
        <View style={styles.aiWidgetSection}>
          <AIAssistantWidget />
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>Search Services</Text>
          <TextInput
          style={styles.searchInput}
          placeholder="Search by name, skill (e.g., plumber)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.locationSearchRow}>
          <TextInput
            style={styles.locationInput}
            placeholder="Enter your location (e.g., city, zip)"
            value={locationQuery}
            onChangeText={setLocationQuery}
          />
          <TouchableOpacity style={styles.locationButton} onPress={handleLocationSearch}>
            <Text style={styles.locationButtonText}>Use GPS</Text>
          </TouchableOpacity>
        </View>
        <Button title="Search Providers" onPress={handleSearch} />
        </View>

        {filteredProviders.length > 0 ? (
          <FlatList
            data={filteredProviders}
            renderItem={renderProviderItem}
            keyExtractor={item => item.id}
            style={styles.list}
            nestedScrollEnabled // Important if FlatList is inside ScrollView
          />
        ) : (
          <Text style={styles.noResultsText}>No providers found matching your criteria.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10, // Padding moved to ScrollView content or sections
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15, // Adjusted margin
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 10, // Padding for title itself
  },
  aiWidgetSection: {
    paddingHorizontal: 10, // Horizontal padding for the widget section
    marginBottom: 10, // Space below AI widget
    // backgroundColor: 'white', // If sticky header needs a background
    // zIndex: 1, // Ensure sticky header is above other content if it overlaps
  },
  searchSection: {
    marginBottom: 15,
    paddingHorizontal: 10, // Horizontal padding for search section
  },
  searchTitle: { // Optional title for the search section
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  searchInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: 'white', // Ensure input is visible
  },
  locationSearchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationInput: {
    flex: 1,
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: 'white', // Ensure input is visible
  },
  locationButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    height: 45, // Match input height
  },
  locationButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    // flex: 1, // Not needed if inside ScrollView with other expanding content
    paddingHorizontal: 10, // Padding for the list items area
  },
  providerItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    // borderWidth: 1, // Using elevation or shadow instead
    // borderColor: '#eee',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1.5,
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  providerSkills: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  providerLocation: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  providerRating: {
    fontSize: 14,
    color: 'orange',
    marginTop: 4,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default CustomerHomeScreen;
