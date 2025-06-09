import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

// TODO: Define types for Provider data, SuccessStory, and Resource
interface WomanProvider {
  id: string;
  name: string;
  serviceCategory: string; // e.g., "Handcrafts", "Tutoring", "Catering"
  bioSummary: string;
  profileImageUrl?: string; // Optional
  isWoman: true; // Assumed for this section
}

interface SuccessStory {
  id: string;
  title: string;
  providerName: string;
  storySummary: string;
  imageUrl?: string;
}

interface EmpowermentResource {
  id: string;
  title: string;
  description: string;
  link?: string; // Optional link to external resource
}

// Mock data - replace with actual data fetching and filtering
const MOCK_WOMEN_PROVIDERS: WomanProvider[] = [
  { id: 'wp1', name: 'Aisha Khan', serviceCategory: 'Handmade Jewelry', bioSummary: 'Creating unique jewelry pieces inspired by nature.', profileImageUrl: 'https://via.placeholder.com/100/FFA07A/000000?Text=Aisha', isWoman: true },
  { id: 'wp2', name: 'Priya Sharma', serviceCategory: 'Home Tutoring (Maths & Science)', bioSummary: 'Experienced tutor helping students achieve their academic goals.', profileImageUrl: 'https://via.placeholder.com/100/90EE90/000000?Text=Priya', isWoman: true },
  { id: 'wp3', name: 'Fatima Al-Fihri', serviceCategory: 'Catering Services', bioSummary: 'Delicious homemade meals for your events.', profileImageUrl: 'https://via.placeholder.com/100/ADD8E6/000000?Text=Fatima', isWoman: true },
];

const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  { id: 'ss1', title: 'From Hobby to Business', providerName: 'Aisha Khan', storySummary: 'Aisha turned her passion for jewelry making into a thriving online business through our platform...', imageUrl: 'https://via.placeholder.com/300/FFA07A/FFFFFF?Text=Success+Story+1' },
  { id: 'ss2', title: 'Empowering Students', providerName: 'Priya Sharma', storySummary: 'Priya has helped over 50 students excel in their studies, gaining financial independence...', imageUrl: 'https://via.placeholder.com/300/90EE90/FFFFFF?Text=Success+Story+2' },
];

const MOCK_RESOURCES: EmpowermentResource[] = [
  { id: 'res1', title: 'Financial Literacy for Entrepreneurs', description: 'Learn the basics of managing your business finances.', link: '#' },
  { id: 'res2', title: 'Digital Marketing Workshop', description: 'Boost your online presence with these marketing tips.', link: '#' },
  { id: 'res3', title: 'Networking Groups for Women', description: 'Connect with other women entrepreneurs in your area.' },
];

// Placeholder function to fetch and filter female providers
// TODO: This function will need to fetch from a backend and filter based on a gender flag
// or a specific category once provider profiles are fully integrated.
const fetchFemaleProviders = async (): Promise<WomanProvider[]> => {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
  // In a real app, this would be an API call like:
  // const allProviders = await fetch('/api/providers');
  // return allProviders.filter(provider => provider.gender === 'female' || provider.isWoman === true);
  return MOCK_WOMEN_PROVIDERS;
};


const WomenEmpowermentScreen = ({ navigation }) => {
  const [femaleProviders, setFemaleProviders] = useState<WomanProvider[]>([]);
  const [successStories] = useState<SuccessStory[]>(MOCK_SUCCESS_STORIES);
  const [resources] = useState<EmpowermentResource[]>(MOCK_RESOURCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchFemaleProviders()
      .then(data => {
        setFemaleProviders(data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert("Error", "Could not load provider data.");
        console.error("Failed to fetch female providers:", err);
        setLoading(false);
      });
  }, []);

  const renderProviderItem = ({ item }: { item: WomanProvider }) => (
    <TouchableOpacity style={styles.itemCard} onPress={() => navigation.navigate('ProviderDetail', { providerId: item.id })}>
      {item.profileImageUrl && <Image source={{ uri: item.profileImageUrl }} style={styles.itemImage} />}
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.serviceCategory}</Text>
        <Text style={styles.itemBio}>{item.bioSummary}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderStoryItem = ({ item }: { item: SuccessStory }) => (
    <View style={styles.storyCard}>
      {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />}
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storyProviderName}>By: {item.providerName}</Text>
      <Text style={styles.storySummary}>{item.storySummary}</Text>
    </View>
  );

  const renderResourceItem = ({ item }: { item: EmpowermentResource }) => (
    <TouchableOpacity style={styles.resourceItem} onPress={() => item.link && Alert.alert("Navigate", `Would navigate to: ${item.link}`)}>
      <Text style={styles.resourceTitle}>{item.title}</Text>
      <Text style={styles.resourceDescription}>{item.description}</Text>
      {item.link && <Text style={styles.resourceLink}>Learn more</Text>}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Women in Business</Text>
        <Text style={styles.headerSubtitle}>Discover services, inspiring stories, and resources.</Text>
      </View>

      <Section title="Featured Women Service Providers">
        {loading ? (
          <Text style={styles.loadingText}>Loading providers...</Text>
        ) : femaleProviders.length > 0 ? (
          <FlatList
            data={femaleProviders}
            renderItem={renderProviderItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        ) : (
          <Text style={styles.emptyText}>No women providers featured currently.</Text>
        )}
      </Section>

      <Section title="Success Stories">
        {successStories.length > 0 ? (
             <FlatList
                data={successStories}
                renderItem={renderStoryItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
            />
        ) : (
            <Text style={styles.emptyText}>No success stories to display yet.</Text>
        )}
      </Section>

      <Section title="Empowerment Resources">
         {resources.length > 0 ? (
            <FlatList
                data={resources}
                renderItem={renderResourceItem}
                keyExtractor={item => item.id}
                // Can be horizontal or vertical
            />
         ) : (
            <Text style={styles.emptyText}>No resources available at the moment.</Text>
         )}
      </Section>
    </ScrollView>
  );
};

// Helper component for section layout
const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#4A148C', // Purple theme color
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e0e0e0', // Lighter text for subtitle
    textAlign: 'center',
  },
  section: {
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#333',
  },
  horizontalList: {
    paddingHorizontal: 15,
  },
  itemCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    width: 220, // Fixed width for horizontal items
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
  },
  itemContent: {
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  itemCategory: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
  },
  itemBio: {
    fontSize: 12,
    color: '#777',
    lineHeight: 16,
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 15,
    width: 300, // Wider for stories
    overflow: 'hidden',
    elevation: 3,
  },
  storyImage: {
    width: '100%',
    height: 150,
  },
  storyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
  },
  storyProviderName: {
      fontSize: 13,
      fontStyle: 'italic',
      color: '#555',
      marginHorizontal: 10,
      marginBottom: 5,
  },
  storySummary: {
    fontSize: 14,
    color: '#444',
    paddingHorizontal: 10,
    paddingBottom: 10,
    lineHeight: 18,
  },
  resourceItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 2,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A148C', // Theme color
  },
  resourceDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  resourceLink: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  }
});

export default WomenEmpowermentScreen;
