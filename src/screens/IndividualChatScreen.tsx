import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming expo is used for icons, otherwise use react-native-vector-icons

// TODO: Define types for Message data
interface Message {
  id: string;
  text: string;
  timestamp: string; // Or Date object
  senderId: string; // 'currentUser' or other user's ID
  userName?: string; // Display name for sender
}

// Placeholder function to fetch initial messages for a conversation
const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 200));
  console.log(`Fetching messages for conversation: ${conversationId}`);
  // TODO: Replace with actual data fetching (e.g., from Firebase Firestore)
  // This would depend on Firebase setup with user credentials.
  return [
    { id: 'msg1', text: 'Hello! I have a question about my booking.', timestamp: '10:00 AM', senderId: 'otherUser', userName: 'Mike Lee' },
    { id: 'msg2', text: 'Hi Mike, sure, what is it?', timestamp: '10:01 AM', senderId: 'currentUser', userName: 'Me' },
    { id: 'msg3', text: 'Can I reschedule my appointment for tomorrow?', timestamp: '10:02 AM', senderId: 'otherUser', userName: 'Mike Lee' },
    { id: 'msg4', text: 'Let me check my availability.', timestamp: '10:03 AM', senderId: 'currentUser', userName: 'Me' },
  ];
};

// Placeholder function to simulate receiving a new message
const subscribeToNewMessages = (conversationId: string, onNewMessage: (message: Message) => void) => {
  console.log(`Subscribing to new messages for ${conversationId}`);
  // Simulate receiving a message after a delay
  const intervalId = setInterval(() => {
    const newMessage: Message = {
      id: `msg${Date.now()}`,
      text: 'This is a new message from the other user!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: 'otherUser',
      userName: 'Other User (Simulated)',
    };
    // onNewMessage(newMessage); // Uncomment to simulate receiving messages
  }, 15000); // Every 15 seconds

  // Return an unsubscribe function
  return () => {
    console.log(`Unsubscribing from new messages for ${conversationId}`);
    clearInterval(intervalId);
  };
};


const IndividualChatScreen = ({ route, navigation }) => {
  const { conversationId, userName } = route.params; // Get params from navigation
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);

  // Set the header title
  useEffect(() => {
    navigation.setOptions({ title: userName || 'Chat' });
  }, [navigation, userName]);

  // Fetch initial messages
  useEffect(() => {
    setLoading(true);
    fetchMessages(conversationId)
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert("Error", "Could not load messages.");
        console.error("Failed to fetch messages:", err);
        setLoading(false);
      });
  }, [conversationId]);

  // Simulate receiving new messages
  useEffect(() => {
    const unsubscribe = subscribeToNewMessages(conversationId, (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });
    return unsubscribe; // Cleanup on unmount
  }, [conversationId]);


  const handleSendMessage = () => {
    if (inputText.trim().length === 0) {
      return;
    }
    const newMessage: Message = {
      id: `msg${Date.now()}`, // Simple unique ID
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      senderId: 'currentUser', // Assume 'currentUser' for messages sent by the user
      userName: 'Me',
    };

    // TODO: Implement actual message sending logic (e.g., to Firebase Firestore)
    // This requires Firebase setup. For now, just add to local state.
    console.log("Sending message:", newMessage);
    Alert.alert("Message Sent (Placeholder)", `Your message "${newMessage.text}" is sent (locally).`);

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    const isCurrentUser = item.senderId === 'currentUser';
    return (
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
        ]}
      >
        {!isCurrentUser && <Text style={styles.messageUserName}>{item.userName || 'User'}</Text>}
        <Text style={[styles.messageText, isCurrentUser ? styles.currentUserBubbleText : {}]}>{item.text}</Text>
        <Text style={[styles.messageTimestamp, isCurrentUser ? {color: '#f0f0f0'} : {}]}>{item.timestamp}</Text>
      </View>
    );
  };

  if (loading) {
    return <View style={styles.centered}><Text>Loading messages...</Text></View>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust as needed
    >
      {messages.length === 0 && !loading ? (
        <View style={styles.centered}><Text style={styles.noMessagesText}>No messages yet. Start the conversation!</Text></View>
      ) : (
        <FlatList
            data={messages}
            renderItem={renderMessageItem}
            keyExtractor={item => item.id}
            style={styles.messageList}
            inverted // Shows latest messages at the bottom
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          {/* Using a simple text for button, replace with Icon if available */}
          <Text style={styles.sendButtonText}>Send</Text>
          {/* <Ionicons name="send" size={24} color="white" /> */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8', // Light background for chat area
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesText: {
    fontSize: 16,
    color: '#777',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  currentUserBubble: {
    backgroundColor: '#007bff', // Blue for current user
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  otherUserBubble: {
    backgroundColor: '#e9e9eb', // Light gray for other users
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageUserName: {
    fontSize: 12,
    color: '#777', // Slightly dimmer for username
    marginBottom: 2,
    fontWeight: '500',
  },
  messageText: {
    fontSize: 16,
    color: 'black', // Default for otherUserBubble
  },
  currentUserBubbleText: { // If specific text color needed for current user
    color: 'white',
  },
  messageTimestamp: {
    fontSize: 10,
    color: '#666', // Dimmer for timestamp
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120, // Allow multiline up to a certain height
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40, // Match minHeight of input
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default IndividualChatScreen;
