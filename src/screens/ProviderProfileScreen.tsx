import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';

// TODO: Define a proper type/interface for Profile data
interface ProfileData {
  name: string;
  skills: string; // Could be comma-separated or an array handled differently
  experience: string; // e.g., "2 years", "5+ years"
  bio: string;
  contactEmail: string;
  phoneNumber?: string; // Optional
}

const ProviderProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    skills: '',
    experience: '',
    bio: '',
    contactEmail: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profileData.name || !profileData.skills || !profileData.contactEmail || !profileData.bio) {
      setError('Please fill in all required fields (Name, Skills, Bio, Contact Email).');
      return;
    }
    setError('');
    // TODO: Implement logic to save profile data (e.g., to Firebase Firestore or a backend API)
    try {
      Alert.alert("Profile Saved (Placeholder)", "Profile saving functionality not yet implemented. Data: " + JSON.stringify(profileData));
      // navigation.goBack(); // Or navigate to a different screen
    } catch (err) {
      setError(err.message);
      Alert.alert("Save Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Provider Profile</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.label}>Full Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., John Doe"
        value={profileData.name}
        onChangeText={text => handleInputChange('name', text)}
      />

      <Text style={styles.label}>Skills *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Plumbing, Electrical Repair, Tutoring"
        value={profileData.skills}
        onChangeText={text => handleInputChange('skills', text)}
        multiline
      />

      <Text style={styles.label}>Years of Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 5 years"
        value={profileData.experience}
        onChangeText={text => handleInputChange('experience', text)}
      />

      <Text style={styles.label}>Short Bio / Description *</Text>
      <TextInput
        style={styles.inputMulti}
        placeholder="Tell clients about yourself and your services"
        value={profileData.bio}
        onChangeText={text => handleInputChange('bio', text)}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Contact Email *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., john.doe@example.com"
        value={profileData.contactEmail}
        onChangeText={text => handleInputChange('contactEmail', text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone Number (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., +1234567890"
        value={profileData.phoneNumber}
        onChangeText={text => handleInputChange('phoneNumber', text)}
        keyboardType="phone-pad"
      />

      <Button title="Save Profile" onPress={handleSaveProfile} />
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
    minHeight: 80,
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
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default ProviderProfileScreen;
