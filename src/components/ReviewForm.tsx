import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

interface ReviewFormProps {
  providerId: string; // To associate the review with a provider
  onSubmit: (reviewData: { rating: number; comment: string }) => void; // Callback after submission
  onCancel?: () => void; // Optional: If the form can be cancelled/dismissed
}

const MAX_RATING = 5;

const ReviewForm: React.FC<ReviewFormProps> = ({ providerId, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }
    if (comment.trim() === '') {
      setError('Please enter your review comment.');
      return;
    }
    setError('');

    // Placeholder for submitting review
    console.log(`Review for Provider ${providerId}: ${rating} stars, Comment: "${comment}"`);
    Alert.alert(
      "Review Submitted (Placeholder)",
      `Your review for provider ${providerId} (${rating} stars, comment: "${comment}") has been recorded locally.`
    );
    onSubmit({ rating, comment }); // Pass data to parent/handler

    // Optionally clear form or navigate away, handled by parent via onSubmit
    setRating(0);
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Review</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Text style={styles.label}>Your Rating *</Text>
      <View style={styles.starsContainer}>
        {[...Array(MAX_RATING)].map((_, index) => {
          const starNumber = index + 1;
          return (
            <TouchableOpacity key={starNumber} onPress={() => handleRating(starNumber)}>
              <Text style={[styles.star, rating >= starNumber ? styles.starSelected : styles.starUnselected]}>
                ★
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Your Review Comment *</Text>
      <TextInput
        style={styles.textArea}
        value={comment}
        onChangeText={setComment}
        placeholder="Tell us about your experience..."
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center', // Center stars
  },
  star: {
    fontSize: 30, // Larger stars
    marginHorizontal: 5,
  },
  starSelected: {
    color: '#FFD700', // Gold for selected
  },
  starUnselected: {
    color: '#ccc', // Gray for unselected
  },
  textArea: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top', // For Android
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100,
  },
  submitButton: {
    backgroundColor: '#007bff',
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ReviewForm;
