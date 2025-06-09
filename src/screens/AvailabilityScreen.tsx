import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';

// TODO: Define a more structured way to store availability, e.g., for time slots per day
interface AvailabilityData {
  // Example: Store selected days as an object with boolean values
  selectedDays: {
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
    Sunday: boolean;
  };
  timeNotes: string; // For general notes about availability times
}

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
type DayOfWeek = typeof DAYS_OF_WEEK[number];

const AvailabilityScreen = ({ navigation }) => {
  const [selectedDays, setSelectedDays] = useState<AvailabilityData['selectedDays']>(
    DAYS_OF_WEEK.reduce((acc, day) => ({ ...acc, [day]: false }), {} as AvailabilityData['selectedDays'])
  );
  const [timeNotes, setTimeNotes] = useState('');
  const [error, setError] = useState('');

  const toggleDaySelection = (day: DayOfWeek) => {
    setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSaveAvailability = async () => {
    const anyDaySelected = Object.values(selectedDays).some(isSelected => isSelected);
    if (!anyDaySelected && !timeNotes) {
      setError('Please select at least one available day or provide notes about your availability.');
      return;
    }
    setError('');

    const availabilityData: AvailabilityData = {
      selectedDays,
      timeNotes,
    };

    // TODO: Implement logic to save availability data (e.g., to Firebase Firestore or a backend API)
    try {
      Alert.alert("Availability Saved (Placeholder)", "Availability saving functionality not yet implemented. Data: " + JSON.stringify(availabilityData));
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
      <Text style={styles.title}>Set Your Availability</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.sectionTitle}>Select Available Days:</Text>
      {DAYS_OF_WEEK.map(day => (
        <TouchableOpacity
          key={day}
          style={[styles.dayButton, selectedDays[day] && styles.dayButtonSelected]}
          onPress={() => toggleDaySelection(day)}
        >
          <Text style={[styles.dayButtonText, selectedDays[day] && styles.dayButtonTextSelected]}>
            {day}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Availability Notes / Specific Times:</Text>
      <TextInput
        style={styles.inputMulti}
        placeholder="e.g., Mondays 9 AM - 5 PM, Flexible on weekends, Not available on public holidays"
        value={timeNotes}
        onChangeText={setTimeNotes}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAvailability}>
        <Text style={styles.saveButtonText}>Save Availability</Text>
      </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  dayButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  dayButtonSelected: {
    backgroundColor: '#007bff',
  },
  dayButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dayButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputMulti: {
    minHeight: 80,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default AvailabilityScreen;
