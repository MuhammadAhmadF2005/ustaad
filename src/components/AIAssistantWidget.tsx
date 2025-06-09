import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getAIRecommendation } from '../services/GeminiService'; // Adjust path as necessary

const AIAssistantWidget: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitQuery = async () => {
    if (query.trim() === '') {
      setError('Please enter a query for the AI assistant.');
      return;
    }
    setIsLoading(true);
    setResponse('');
    setError('');
    try {
      const aiResponse = await getAIRecommendation(query);
      setResponse(aiResponse);
    } catch (err) {
      // Assuming err has a message property, adjust if GeminiService throws custom errors
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(`AI service error: ${errorMessage}`);
      console.error("[AIAssistantWidget] Error fetching AI recommendation:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.widgetContainer}>
      <Text style={styles.widgetTitle}>AI Assistant</Text>
      <Text style={styles.widgetSubtitle}>Ask for recommendations, ideas, or how-to tips!</Text>

      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="e.g., 'Suggest a gift for a friend' or 'Best plumber near me'"
        multiline
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmitQuery}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Thinking...' : 'Ask AI'}</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {response && (
        <ScrollView style={styles.responseContainer}>
          <Text style={styles.responseTitle}>AI Response:</Text>
          <Text style={styles.responseText}>{response}</Text>
        </ScrollView>
      )}
    </View>
  );
};

// Importing TouchableOpacity for the button as Button component is harder to style consistently
import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10, // Margin for when it's embedded in a screen
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  widgetSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minHeight: 60, // For multiline input
    textAlignVertical: 'top', // For Android multiline placeholder
    marginBottom: 12,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0cfff', // Lighter blue when disabled
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 15,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  responseContainer: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    maxHeight: 200, // So it doesn't take too much space, becomes scrollable
    borderColor: '#eee',
    borderWidth: 1,
  },
  responseTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  responseText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20, // For better readability
  },
});

export default AIAssistantWidget;
