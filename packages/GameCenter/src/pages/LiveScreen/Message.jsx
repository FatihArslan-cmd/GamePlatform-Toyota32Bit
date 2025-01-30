// components/Message.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Message = ({ message }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.sender}>{message.fromUserId}: </Text>
      <Text>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
  },
  sender: {
    fontWeight: 'bold',
    marginRight: 5,
  }
});

export default Message;