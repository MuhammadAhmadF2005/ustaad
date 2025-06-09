import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, FlatList, Alert, TouchableOpacity } from 'react-native';

// TODO: Define a proper type/interface for Service data
interface ServiceItem {
  id: string; // For FlatList key and editing/deleting
  name: string;
  description: string;
  price: string; // Keep as string for input, convert to number on save if needed
}

const ServiceListingScreen = ({ navigation }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null); // To track if we are editing an existing service
  const [error, setError] = useState('');

  const clearForm = () => {
    setServiceName('');
    setServiceDescription('');
    setServicePrice('');
    setEditingId(null);
    setError('');
  };

  const handleAddOrUpdateService = async () => {
    if (!serviceName || !serviceDescription || !servicePrice) {
      setError('Please fill in all service details (Name, Description, Price).');
      return;
    }
    setError('');

    // TODO: Implement logic to save/update service data (e.g., to Firebase Firestore or a backend API)
    // This would involve either adding a new service or updating an existing one if editingId is set.

    if (editingId) {
      // Update existing service
      setServices(prevServices =>
        prevServices.map(s =>
          s.id === editingId ? { ...s, name: serviceName, description: serviceDescription, price: servicePrice } : s
        )
      );
      Alert.alert("Service Updated (Placeholder)", `Updated: ${serviceName}`);
    } else {
      // Add new service
      const newService: ServiceItem = {
        id: Date.now().toString(), // Simple unique ID for now
        name: serviceName,
        description: serviceDescription,
        price: servicePrice,
      };
      setServices(prevServices => [...prevServices, newService]);
      Alert.alert("Service Added (Placeholder)", `Added: ${serviceName}`);
    }
    clearForm();
  };

  const handleEditService = (service: ServiceItem) => {
    setEditingId(service.id);
    setServiceName(service.name);
    setServiceDescription(service.description);
    setServicePrice(service.price);
  };

  const handleDeleteService = (id: string) => {
    // TODO: Implement logic to delete service data from backend
    setServices(prevServices => prevServices.filter(s => s.id !== id));
    Alert.alert("Service Deleted (Placeholder)", `Deleted service with ID: ${id}`);
    if (id === editingId) { // Clear form if deleting the service being edited
        clearForm();
    }
  };

  const renderServiceItem = ({ item }: { item: ServiceItem }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text>{item.description}</Text>
        <Text style={styles.servicePrice}>Price: {item.price}</Text>
      </View>
      <View style={styles.serviceActions}>
        <TouchableOpacity onPress={() => handleEditService(item)} style={styles.editButton}>
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteService(item.id)} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{editingId ? 'Edit Service' : 'Add New Service'}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Service Name (e.g., Basic Haircut)"
        value={serviceName}
        onChangeText={setServiceName}
      />
      <TextInput
        style={styles.inputMulti}
        placeholder="Service Description (e.g., Includes wash and cut)"
        value={serviceDescription}
        onChangeText={setServiceDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., $50 or $25/hour)"
        value={servicePrice}
        onChangeText={setServicePrice}
        keyboardType="decimal-pad"
      />
      <Button title={editingId ? "Update Service" : "Add Service"} onPress={handleAddOrUpdateService} />
      {editingId && <Button title="Cancel Edit" onPress={clearForm} color="grey" />}

      <Text style={styles.listTitle}>Your Services</Text>
      {services.length === 0 ? (
        <Text style={styles.noServicesText}>You haven't added any services yet.</Text>
      ) : (
        <FlatList
          data={services}
          renderItem={renderServiceItem}
          keyExtractor={item => item.id}
          scrollEnabled={false} // If ScrollView is the parent, disable child FlatList scrolling
        />
      )}
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
    marginBottom: 15,
    textAlign: 'center',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  inputMulti: {
    minHeight: 70,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  serviceItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    marginTop: 5,
    color: 'green',
  },
  serviceActions: {
    flexDirection: 'column', // Changed to column for better button layout
    alignItems: 'flex-end', // Align buttons to the right
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 5, // Add margin between buttons
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  buttonText: {
      color: 'white',
      textAlign: 'center',
  },
  noServicesText: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  }
});

export default ServiceListingScreen;
