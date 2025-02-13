import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import MessageItem from './MessageItem';
import { getMessagesFromApi } from '../../services/postMessageApi';
import { View, Text } from 'react-native';

const Message = ({ onScroll, listRef }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesFromApi();
        setMessages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
      {messages.length > 0 ? (
        <FlashList
          ref={listRef}
          data={messages}
          renderItem={({ item }) => <MessageItem message={item} />}
          estimatedItemSize={150}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      ) : (
        !loading && !error && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No messages to display.</Text>
          </View>
        )
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Message;