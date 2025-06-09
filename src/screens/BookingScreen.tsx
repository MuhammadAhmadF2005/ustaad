import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';

// TODO: Import actual service types and provider data
interface ServiceItem {
  id: string;
  name: string;
  price?: string; // Optional price display
}

interface ProviderInfo { // Minimal info needed for booking screen context
  id: string;
  name: string;
  services: ServiceItem[];
}

// Mock data - in a real app, this would come from navigation params or a state store
const MOCK_PROVIDER_INFO: ProviderInfo = {
  id: '1',
  name: 'John Doe',
  services: [
    { id: 's1', name: 'Basic Plumbing Service', price: '$50' },
    { id: 's2', name: 'Advanced Plumbing Consultation', price: '$120' },
    { id: 's3', name: 'Leak Repair', price: '$75/hr' },
  ],
};

const BookingScreen = ({ route, navigation }) => {
  // const { providerId, serviceId } = route.params; // Expected params
  // For now, using mock data directly. In a real app, fetch provider services based on providerId.
  const providerInfo = MOCK_PROVIDER_INFO;

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState(''); // Simple text input for now
  const [bookingTime, setBookingTime] = useState(''); // Simple text input for now
  const [bookingNotes, setBookingNotes] = useState('');
  const [error, setError] = useState('');

  // If a serviceId is passed, pre-select it
  // useEffect(() => {
  //   if (serviceId) setSelectedServiceId(serviceId);
  // }, [serviceId]);

  const handleBookingRequest = async () => {
    if (!selectedServiceId) {
      setError('Please select a service.');
      return;
    }
    if (!bookingDate || !bookingTime) {
      setError('Please select a date and time for the booking.');
      return;
    }
    setError('');

    const selectedService = providerInfo.services.find(s => s.id === selectedServiceId);

    const bookingDetails = {
      providerId: providerInfo.id,
      providerName: providerInfo.name,
      serviceId: selectedServiceId,
      serviceName: selectedService?.name,
      date: bookingDate,
      time: bookingTime,
      notes: bookingNotes,
      status: 'pending', // Initial status
      customerId: 'customer123', // TODO: Get actual customer ID
    };

    // Placeholder for submitting booking request
    console.log("Booking Request Submitted:", bookingDetails);
    Alert.alert(
      "Booking Requested (Placeholder)",
      `Your request for "${selectedService?.name}" on ${bookingDate} at ${bookingTime} has been sent to ${providerInfo.name}. Notes: "${bookingNotes}".`
    );

    // Placeholder for sending notification
    console.log(`Notification: New booking request for ${providerInfo.name} from customer123.`);
    Alert.alert("Notification Sent (Placeholder)", `Provider ${providerInfo.name} has been notified of your request.`);

    // navigation.goBack(); // Or navigate to a confirmation/my bookings screen
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Service from {providerInfo.name}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Select Service *</Text>
      {providerInfo.services.map(service => (
        <TouchableOpacity
          key={service.id}
          style={[
            styles.serviceButton,
            selectedServiceId === service.id && styles.serviceButtonSelected
          ]}
          onPress={() => setSelectedServiceId(service.id)}
        >
          <Text style={[
            styles.serviceButtonText,
            selectedServiceId === service.id && styles.serviceButtonTextSelected
          ]}>
            {service.name} {service.price ? `(${service.price})` : ''}
          </Text>
        </TouchableOpacity>
      ))}
      {!selectedServiceId && providerInfo.services.length === 0 && (
        <Text style={styles.detailText}>This provider has not listed any services yet.</Text>
      )}

      <Text style={styles.label}>Preferred Date *</Text>
      {/* TODO: Replace with a proper Calendar/DatePicker component */}
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={bookingDate}
        onChangeText={setBookingDate}
      />

      <Text style={styles.label}>Preferred Time *</Text>
      {/* TODO: Replace with a proper TimePicker component */}
      <TextInput
        style={styles.input}
        placeholder="HH:MM AM/PM"
        value={bookingTime}
        onChangeText={setBookingTime}
      />

      <Text style={styles.label}>Notes for Provider (Optional)</Text>
      <TextInput
        style={styles.inputMulti}
        placeholder="e.g., specific instructions, entry details, flexibility"
        value={bookingNotes}
        onChangeText={setBookingNotes}
        multiline
        numberOfLines={3}
      />

      <Button
        title="Request Booking"
        onPress={handleBookingRequest}
        disabled={!selectedServiceId || providerInfo.services.length === 0}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  inputMulti: {
    minHeight: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  serviceButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  serviceButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  serviceButtonText: {
    fontSize: 16,
    color: '#333',
  },
  serviceButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
    marginBottom: 10,
  }
});

export default BookingScreen;
