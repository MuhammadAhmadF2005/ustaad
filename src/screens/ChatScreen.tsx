import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';

// TODO: Define types for Conversation and User data
interface Conversation {
  id: string;
  userName: string; // Name of the other user in conversation
  lastMessage: string;
  timestamp: string; // Or Date object
  unreadCount?: number;
  avatarUrl?: string; // Optional
}

// Placeholder function to fetch conversations
const fetchConversations = async (): Promise<Conversation[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  // TODO: Replace with actual data fetching (e.g., from Firebase Firestore)
  // This would depend on Firebase setup with user credentials.
  return [
    { id: 'conv1', userName: 'Jane Doe (Provider)', lastMessage: 'Okay, see you then!', timestamp: '10:30 AM', unreadCount: 0 },
    { id: 'conv2', userName: 'Mike Lee (Customer)', lastMessage: 'Can I reschedule my appointment?', timestamp: 'Yesterday', unreadCount: 2 },
    { id: 'conv3', userName: 'Service Bot', lastMessage: 'Your booking is confirmed.', timestamp: '2 days ago' },
  ];
};

const ChatScreen = ({ navigation }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchConversations()
      .then(data => {
        setConversations(data);
        setLoading(false);
      })
      .catch(err => {
        Alert.alert("Error", "Could not load conversations.");
        console.error("Failed to fetch conversations:", err);
        setLoading(false);
      });
  }, []);

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('IndividualChat', { conversationId: item.id, userName: item.userName })}
      // TODO: Ensure 'IndividualChat' route name is correct
    >
      {/* Basic avatar placeholder */}
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarText}>{item.userName.substring(0, 1)}</Text>
      </View>
      <View style={styles.conversationDetails}>
        <Text style={styles.userName}>{item.userName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.messageInfo}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.unreadCount && item.unreadCount > 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>{item.unreadCount}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.centered}><Text>Loading conversations...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      {conversations.length === 0 && !loading ? (
         <View style={styles.centered}><Text style={styles.noConversationsText}>No conversations yet.</Text></View>
      ) : (
        <FlatList
            data={conversations}
            renderItem={renderConversationItem}
            keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#f7f7f7', // Light header background
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConversationsText: {
    fontSize: 16,
    color: '#777',
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff', // Example color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  lastMessage: {
    fontSize: 14,
    color: '#555',
  },
  messageInfo: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
