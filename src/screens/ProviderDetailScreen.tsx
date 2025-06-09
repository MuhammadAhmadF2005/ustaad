import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import ReviewForm from '../../components/ReviewForm'; // Assuming ReviewForm is in src/components

// TODO: Define proper types for full Provider Profile, Services, and Reviews
interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface FullProviderProfile {
  id: string;
  name: string;
  skills: string;
  experience: string;
  bio: string;
  contactEmail: string;
  phoneNumber?: string;
  location?: string; // From CustomerHomeScreen summary, or more detailed from provider's ServiceArea
  services: ServiceItem[];
  reviews: Review[];
  averageRating?: number;
}

// Mock data fetching function - replace with actual data fetching from Firebase/backend
const fetchProviderDetails = async (providerId: string): Promise<FullProviderProfile | null> => {
  console.log("Fetching details for provider ID:", providerId);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  // Example: Find provider in mock data used in CustomerHomeScreen and add more details
  const MOCK_PROVIDERS_SUMMARY = [
    { id: '1', name: 'John Doe', skills: 'Plumbing, Heating', location: 'New York, NY', rating: 4.5 },
    { id: '2', name: 'Jane Smith', skills: 'Electrician, Home Repair', location: 'Brooklyn, NY', rating: 4.8 },
    { id: '3', name: 'Mike Lee', skills: 'Gardening, Landscaping', location: 'Queens, NY', rating: 4.2 },
    { id: '4', name: 'Sarah Brown', skills: 'Tutoring (Math, Science)', location: 'New York, NY', rating: 5.0 },
  ];
  const summary = MOCK_PROVIDERS_SUMMARY.find(p => p.id === providerId);

  if (!summary) return null;

  // Simulate fetching more details
  // TODO: Implement actual fetching of reviews for a provider.
  const mockReviews: Review[] = [
    { id: 'r1', userName: 'Alice Wonderland', rating: 5, comment: 'Absolutely fantastic service! John was punctual, professional, and fixed my issue in no time. Highly recommend!', date: '2024-03-10' },
    { id: 'r2', userName: 'Bob The Builder', rating: 4, comment: 'Good work overall. Arrived a little late, but the quality of the repair was solid. Fair pricing.', date: '2024-03-08' },
    { id: 'r3', userName: 'Charlie Brown', rating: 3, comment: 'Average experience. The job got done, but communication could have been better.', date: '2024-03-05' },
  ];

  return {
    ...summary,
    experience: `${Math.floor(Math.random() * 10) + 1} years`,
    bio: `Dedicated ${summary.skills.split(',')[0]} professional with a passion for quality work. I have been serving the ${summary.location} area for many years.`,
    contactEmail: `${summary.name.toLowerCase().replace(' ', '.')}@example.com`,
    phoneNumber: `+1-555-${Math.floor(Math.random() * 9000) + 1000}`,
    services: [
      { id: 's1', name: `Basic ${summary.skills.split(',')[0]} Service`, description: 'Standard service package.', price: `$${Math.floor(Math.random() * 50) + 20}` },
      { id: 's2', name: `Advanced ${summary.skills.split(',')[0]} Consultation`, description: 'In-depth consultation and planning.', price: `$${Math.floor(Math.random() * 100) + 70}` },
    ],
    reviews: mockReviews, // Use more detailed mock reviews
    averageRating: summary.rating,
  };
};


const ProviderDetailScreen = ({ route, navigation }) => {
  const { providerId } = route.params; // Assuming providerId is passed via navigation
  const [provider, setProvider] = useState<FullProviderProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Placeholder function for submitting a review
  // TODO: Implement actual review submission logic (e.g., to Firebase Firestore)
  const handleReviewSubmit = ({ rating, comment }: { rating: number; comment: string }) => {
    console.log(`Review submitted for ${providerId}: ${rating} stars, "${comment}"`);
    // Here you would typically send the review to your backend.
    // For now, we can simulate adding it to the local state or re-fetching.
    const newReview: Review = {
        id: `rev_${Date.now()}`,
        userName: 'CurrentUser (You)', // Placeholder user
        rating,
        comment,
        date: new Date().toISOString().split('T')[0],
    };
    setProvider(prevProvider => prevProvider ? ({
        ...prevProvider,
        reviews: [newReview, ...prevProvider.reviews], // Add new review to the top
        // Optionally, recalculate average rating here
    }) : null);
    setShowReviewForm(false); // Hide form after submission
    Alert.alert("Review Submitted", "Thank you for your review!");
  };


  useEffect(() => {
    const loadProviderData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProviderDetails(providerId);
        if (data) {
          setProvider(data);
        } else {
          setError('Provider details not found.');
          Alert.alert('Error', 'Could not load provider details.');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
        setError(errorMessage);
        Alert.alert('Error', `Failed to load provider details: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    if (providerId) {
      loadProviderData();
    } else {
      setError("No provider ID specified.");
      setLoading(false);
    }
  }, [providerId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error || !provider) {
    return <Text style={[styles.centered, styles.errorText]}>{error || "Provider not found."}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{provider.name}</Text>
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.detailText}>Skills: {provider.skills}</Text>
      <Text style={styles.detailText}>Experience: {provider.experience}</Text>
      <Text style={styles.detailText}>Bio: {provider.bio}</Text>
      {provider.location && <Text style={styles.detailText}>Location: {provider.location}</Text>}
      {provider.averageRating && <Text style={styles.detailText}>Average Rating: {provider.averageRating.toFixed(1)} / 5</Text>}

      <Text style={styles.sectionTitle}>Services Offered</Text>
      {provider.services.length > 0 ? (
        provider.services.map(service => (
          <View key={service.id} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.serviceDescription}>{service.description}</Text>
            <Text style={styles.servicePrice}>Price: {service.price}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.detailText}>No specific services listed.</Text>
      )}

      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.detailText}>Email: {provider.contactEmail}</Text>
      {provider.phoneNumber && <Text style={styles.detailText}>Phone: {provider.phoneNumber}</Text>}
      {/* TODO: Add a "Book Service" or "Request Quote" button */}


      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        <TouchableOpacity style={styles.writeReviewButton} onPress={() => setShowReviewForm(!showReviewForm)}>
          <Text style={styles.writeReviewButtonText}>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</Text>
        </TouchableOpacity>

        {showReviewForm && (
          <ReviewForm
            providerId={providerId}
            onSubmit={handleReviewSubmit}
            onCancel={() => setShowReviewForm(false)}
          />
        )}

        {provider.reviews.length > 0 ? (
          provider.reviews.map(review => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.userName}</Text>
                <Text style={styles.reviewRating}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text>
              </View>
              <Text style={styles.reviewComment}>"{review.comment}"</Text>
              <Text style={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.detailText}>No reviews yet for this provider.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15, // Add horizontal padding to container
    paddingVertical: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15, // Increased margin
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12, // Increased margin
    color: '#444',
    // borderBottomWidth: 1, // Optional: for a subtle separator
    // borderBottomColor: '#ddd',
    // paddingBottom: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8, // Increased margin
    lineHeight: 23, // Increased line height
    color: '#555',
  },
  serviceItem: {
    backgroundColor: '#ffffff', // Brighter background
    padding: 12, // Increased padding
    borderRadius: 8, // More rounded corners
    marginBottom: 12,
    elevation: 1, // Subtle shadow for Android
    shadowColor: '#000', // Subtle shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  serviceName: {
    fontSize: 17, // Slightly larger
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  servicePrice: {
    fontSize: 15, // Slightly larger
    color: 'green',
    marginTop: 6, // Increased margin
    fontWeight: '600', // Bolder
  },
  reviewsSection: {
    marginTop: 15, // Add some top margin to the whole section
  },
  writeReviewButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start', // Align to left or 'center'
    marginBottom: 15,
  },
  writeReviewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewItem: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewUser: {
    fontSize: 16, // Slightly larger
    fontWeight: 'bold',
    color: '#444',
  },
  reviewRating: {
    fontSize: 16, // Stars
    color: '#FFD700', // Gold color for stars
  },
  reviewComment: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    lineHeight: 19, // Better readability
    marginBottom: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#888', // Lighter color for date
    textAlign: 'right',
  }
});

export default ProviderDetailScreen;
