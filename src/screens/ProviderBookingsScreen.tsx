import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';

// TODO: Define proper types for Booking data, consistent with BookingScreen
interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  notes?: string;
  customerName: string; // Or customerId, then fetch details
  status: 'pending' | 'confirmed' | 'declined' | 'completed';
}

// Mock data for bookings - replace with actual data fetching for the logged-in provider
const MOCK_BOOKINGS: Booking[] = [
  { id: 'b1', serviceName: 'Basic Plumbing Service', date: '2024-03-15', time: '10:00 AM', customerName: 'Alice Johnson', status: 'pending', notes: 'Leaky faucet in the kitchen.' },
  { id: 'b2', serviceName: 'Advanced Plumbing Consultation', date: '2024-03-16', time: '02:00 PM', customerName: 'Bob Williams', status: 'pending', notes: 'Planning new bathroom installation.' },
  { id: 'b3', serviceName: 'Leak Repair', date: '2024-03-18', time: '09:00 AM', customerName: 'Carol Davis', status: 'confirmed' },
  { id: 'b4', serviceName: 'Basic Plumbing Service', date: '2024-03-20', time: '11:00 AM', customerName: 'David Wilson', status: 'declined' },
  { id: 'b5', serviceName: 'Basic Plumbing Service', date: '2024-03-10', time: '01:00 PM', customerName: 'Eve Brown', status: 'completed' },
];

const ProviderBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [filter, setFilter] = useState<'pending' | 'confirmed' | 'all'>('pending'); // Initial filter

  const handleAcceptBooking = (bookingId: string) => {
    // Placeholder for accepting booking
    setBookings(prevBookings =>
      prevBookings.map(b => (b.id === bookingId ? { ...b, status: 'confirmed' } : b))
    );
    const booking = bookings.find(b => b.id === bookingId);
    console.log(`Booking ID ${bookingId} accepted.`);
    Alert.alert("Booking Accepted", `Booking for ${booking?.serviceName} with ${booking?.customerName} has been confirmed.`);
    // Placeholder for sending notification to customer
    console.log(`Notification: Your booking request for ${booking?.serviceName} on ${booking?.date} has been accepted by the provider.`);
    Alert.alert("Customer Notified (Placeholder)", `Customer ${booking?.customerName} has been notified of acceptance.`);
  };

  const handleDeclineBooking = (bookingId: string) => {
    // Placeholder for declining booking
    setBookings(prevBookings =>
      prevBookings.map(b => (b.id === bookingId ? { ...b, status: 'declined' } : b))
    );
    const booking = bookings.find(b => b.id === bookingId);
    console.log(`Booking ID ${bookingId} declined.`);
    Alert.alert("Booking Declined", `Booking for ${booking?.serviceName} with ${booking?.customerName} has been declined.`);
    // Placeholder for sending notification to customer
    console.log(`Notification: Your booking request for ${booking?.serviceName} on ${booking?.date} has been declined by the provider.`);
     Alert.alert("Customer Notified (Placeholder)", `Customer ${booking?.customerName} has been notified of decline.`);
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <View style={[styles.bookingItem, styles[`status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`]]}>
      <Text style={styles.serviceName}>{item.serviceName}</Text>
      <Text>Customer: {item.customerName}</Text>
      <Text>Date: {item.date} at {item.time}</Text>
      {item.notes && <Text>Notes: {item.notes}</Text>}
      <Text style={styles.statusText}>Status: {item.status.toUpperCase()}</Text>
      {item.status === 'pending' && (
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => handleAcceptBooking(item.id)}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => handleDeclineBooking(item.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Your Bookings</Text>
      <View style={styles.filterButtons}>
        <TouchableOpacity
            style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
            onPress={() => setFilter('pending')}>
            <Text style={styles.filterButtonText}>Pending ({bookings.filter(b => b.status === 'pending').length})</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.filterButton, filter === 'confirmed' && styles.filterButtonActive]}
            onPress={() => setFilter('confirmed')}>
            <Text style={styles.filterButtonText}>Confirmed ({bookings.filter(b => b.status === 'confirmed').length})</Text>
        </TouchableOpacity>
         <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}>
            <Text style={styles.filterButtonText}>All ({bookings.length})</Text>
        </TouchableOpacity>
      </View>

      {filteredBookings.length > 0 ? (
        <FlatList
          data={filteredBookings}
          renderItem={renderBookingItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noBookingsText}>No bookings found for the selected filter.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: 'black',
    fontWeight: '500',
  },
  bookingItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  statusPending: { borderLeftColor: 'orange' },
  statusConfirmed: { borderLeftColor: 'green' },
  statusDeclined: { borderLeftColor: 'red' },
  statusCompleted: { borderLeftColor: 'grey' },
  serviceName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  acceptButton: {
    backgroundColor: '#28a745',
  },
  declineButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noBookingsText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    fontStyle: 'italic',
  }
});

export default ProviderBookingsScreen;
