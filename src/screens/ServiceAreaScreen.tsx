import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

// TODO: Consider a more structured way to store service areas,
// especially if integration with map services or geolocation is planned.
// For now, a simple text field for general description and a list of zip codes.
interface ServiceAreaData {
  areaDescription: string; // e.g., "Downtown and surrounding suburbs"
  zipCodes: string; // Comma-separated list of zip codes
}

const ServiceAreaScreen = ({ navigation }) => {
  const [areaDescription, setAreaDescription] = useState('');
  const [zipCodes, setZipCodes] = useState('');
  const [error, setError] = useState('');

  const handleSaveServiceArea = async () => {
    if (!areaDescription && !zipCodes) {
      setError('Please describe your service area or provide a list of zip codes.');
      return;
    }
    setError('');

    const serviceAreaData: ServiceAreaData = {
      areaDescription,
      zipCodes,
    };

    // TODO: Implement logic to save service area data (e.g., to Firebase Firestore or a backend API)
    try {
      Alert.alert("Service Area Saved (Placeholder)", "Service area saving functionality not yet implemented. Data: " + JSON.stringify(serviceAreaData));
      // navigation.goBack();
    } catch (err) {
      // Assuming err has a message property
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(errorMessage);
      Alert.alert("Save Error", errorMessage);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Define Your Service Area</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>General Area Description:</Text>
      <TextInput
        style={styles.inputMulti}
        placeholder="e.g., Central City, North Suburbs, or within a 10-mile radius of downtown"
        value={areaDescription}
        onChangeText={setAreaDescription}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Service Zip Codes (comma-separated):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 90210, 10001, 60606"
        value={zipCodes}
        onChangeText={setZipCodes}
        keyboardType="numeric" // Or default, as it's comma-separated
      />

      <Text style={styles.infoText}>
        Providing zip codes can help clients find you more easily.
        A map-based selection might be added in future updates.
      </Text>

      <Button title="Save Service Area" onPress={handleSaveServiceArea} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
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
  infoText: {
    fontSize: 12,
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default ServiceAreaScreen;
